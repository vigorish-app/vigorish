import { query } from "./db";

const USER_FIELDS = "user_id, personal_amount, market_amount";
function mapRowToUser(row: any) {
  return new User(row["user_id"], row["personal_amount"], row["market_amount"]);
}

export class User {
  id: string;
  personalAmount: number;
  marketAmount: number;

  static async load(id: string) {
    let sql = `SELECT ${USER_FIELDS}
            FROM users
            WHERE user_id=$1`;
    let result = await query(sql, [id]);
    if (result.rowCount < 1) {
      return undefined;
    }
    let row = result.rows[0];
    return mapRowToUser(row);
  }

  static async create(id: string) {
    // in the future will accept some args like auth/email?
    let sql = `INSERT INTO users (user_id) VALUES ($1)
            RETURNING ${USER_FIELDS}`;
    let result = await query(sql, [id]);
    if (result.rowCount < 1) {
      return undefined;
    }
    let row = result.rows[0];
    return mapRowToUser(row);
  }

  constructor(id: string, personalAmount: number, marketAmount: number) {
    this.id = id;
    this.personalAmount = personalAmount;
    this.marketAmount = marketAmount;
  }

  async commit() {
    let sql = `UPDATE users SET
                personal_amount = $1,
                market_amount = $2
            WHERE user_id = $3`;
    await query(sql, [this.id, this.personalAmount, this.marketAmount]);
  }
}
