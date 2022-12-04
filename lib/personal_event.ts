import { query, getAdvancedClient } from "./db";

function makeOptionFromRow(row: any) {
  return new PersonalEventOption(
    row["option_id"],
    row["event_id"],
    row["option_description"],
    row["bet_amount"]
  );
}

export interface UncreatedPersonalEvent {
  userId: string;
  description: string;
  notes?: string;
}
export interface UncreatedPersonalEventOption {
  description: string;
  betAmount: number;
}

export class PersonalEvent {
  id: number;
  userId: string;
  description: string;
  options: PersonalEventOption[];
  createdTimestamp: Date;

  notes?: string;

  finishedTimestamp?: Date;
  winningOption?: PersonalEventOption;
  netResult?: number;

  constructor(
    id: number,
    userId: string,
    description: string,
    options: PersonalEventOption[],
    createdTimestamp: Date,
    notes?: string,
    finishedTimestamp?: Date,
    winningOption?: PersonalEventOption,
    netResult?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.description = description;
    this.options = options;
    this.createdTimestamp = createdTimestamp;

    this.notes = notes;
    this.finishedTimestamp = finishedTimestamp;
    this.winningOption = winningOption;
    this.netResult = netResult;
  }

  async setWinner(winningOptionId: number) {
    if (this.winningOption != null) {
      return false;
    }
    let amount = 0;
    let found = false;
    let multiplier = this.options.length - 1;
    for (let option of this.options) {
      if (option.id == winningOptionId) {
        found = true;
        amount += option.betAmount * multiplier;
      } else {
        amount -= option.betAmount;
      }
    }
    if (!found) {
      console.log(
        `Couldn't find option ${winningOptionId} in personal event ${this.id}`
      );
      return false;
    }
    // Things to update: winningOption, finishedTimestamp, netResult
    let sql = `UPDATE personal_events
                SET finished_timestamp = NOW(),
                net_result = $1,
                winning_option = $2
              WHERE event_id = $3`;

    await query(sql, [amount, winningOptionId, this.id]);

    // Update user's personal amount
    let sqlUser = `UPDATE users SET personal_amount = personal_amount + $1
                  WHERE user_id = $2`;
    await query(sqlUser, [amount, this.userId]);
    return true;
  }

  static async create(
    event: UncreatedPersonalEvent,
    options: UncreatedPersonalEventOption[]
  ) {
    let client = await getAdvancedClient();
    try {
      await client.query("BEGIN");

      // Step 1: Insert into personal_events
      let eventResult = await client.query(
        `INSERT INTO personal_events (user_id, event_description, notes)
        VALUES ($1, $2, $3) RETURNING event_id`,
        [event.userId, event.description, event.notes]
      );
      let eventId = eventResult.rows[0]["event_id"];

      // Step 2: Insert into personal_event_options

      // Build the sql bound arguments
      let paramStrings = [];
      let paramArgs: any[] = [eventId];
      let count = 2;
      for (let option of options) {
        paramStrings.push(`($1, $${count}, $${count + 1})`);
        count += 2;
        paramArgs.push(option.description);
        paramArgs.push(option.betAmount);
      }

      await client.query(
        `INSERT INTO personal_event_options
        (event_id, option_description, bet_amount)
        VALUES ${paramStrings.join(", ")}`,
        paramArgs
      );

      await client.query("COMMIT");
      return eventId;
    } catch (err) {
      console.error(err);
      return;
    } finally {
      client.release();
    }
  }

  static async load(id: number) {
    let sql = `SELECT event_id, user_id, event_description, finished_timestamp,
            winning_option, net_result, notes, created_timestamp
            FROM personal_events 
            WHERE event_id = $1`;
    let result = await query(sql, [id]);
    if (result.rowCount < 1) {
      return;
    }
    let event = result.rows[0];
    let options = await PersonalEventOption.loadAll(event["event_id"]);

    let winningOption;
    if (event["winning_option"] != undefined) {
      winningOption = options.find(
        (option) => option.id === event["winning_option"]
      );
    }

    return new PersonalEvent(
      id,
      event.user_id,
      event.event_description,
      options,
      event.created_timestamp,
      event.notes,
      event.finished_timestamp,
      winningOption,
      event.netResult
    );
  }

  static async loadAllForUser(userId: string) {
    let sql = `SELECT e.event_id, e.user_id, e.event_description, e.finished_timestamp,
            e.winning_option, e.net_result, e.notes, e.created_timestamp,
            o.option_id, o.option_description, o.bet_amount
            FROM personal_events as e JOIN personal_event_options as o 
            ON e.event_id = o.event_id
            WHERE e.user_id = $1 ORDER BY e.event_id`;
    let results = await query(sql, [userId]);

    let events = [];
    let curEvent;
    for (let row of results.rows) {
      if (curEvent == undefined || row["event_id"] !== curEvent.id) {
        // this is a new event, construct it
        curEvent = new PersonalEvent(
          row["event_id"],
          row["user_id"],
          row["event_description"],
          [],
          row["created_timestamp"],
          row["notes"],
          row["finished_timestamp"],
          undefined,
          row["net_result"]
        );
        events.push(curEvent);
      }
      let option = makeOptionFromRow(row);
      curEvent.options.push(option);
      if (row["winning_option"] === row["option_id"]) {
        curEvent.winningOption = option;
      }
    }
    return events;
  }
}

export class PersonalEventOption {
  id: number;
  event_id: number;
  description: string;
  betAmount: number;

  constructor(
    id: number,
    event_id: number,
    description: string,
    betAmount: number
  ) {
    this.id = id;
    this.event_id = event_id;
    this.description = description;
    this.betAmount = betAmount;
  }

  static async loadAll(event_id: number) {
    let sql = `SELECT option_id, event_id, option_description, bet_amount
            FROM personal_event_options
            WHERE event_id = $1`;
    let result = await query(sql, [event_id]);
    let options = result.rows.map(makeOptionFromRow);
    return options;
  }
}
