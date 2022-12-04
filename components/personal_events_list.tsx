import { Accordion, Table, Button } from "flowbite-react";
import { makeAmount, makeAmountBG, makeAmountClass } from "../components/util";

function getMultiplierFromNumOptions(numOptions: number) {
  return numOptions - 1;
}

async function setWinner(eventId: number, optionId: number) {
  let res = await fetch("/api/personal_events", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId: eventId,
      winningOptionId: optionId,
    }),
  });
  if (!res.ok) {
    console.log("Failed to update");
  } else {
    window.location.reload();
  }
}

function makeOptionListRow(
  option: any,
  winningOptionId: string | undefined,
  numOptions: number,
  eventId: number
) {
  // Assume the same type as lib/personal_event.ts
  let lastRow;
  if (winningOptionId == undefined) {
    lastRow = (
      <Button onClick={() => setWinner(eventId, option.id)}>Pick Winner</Button>
    );
  } else if (winningOptionId !== option.id) {
    let amount = option.betAmount * -1;
    lastRow = (
      <span className={makeAmountClass(amount)}>{makeAmount(amount)}</span>
    );
  } else {
    let amount = option.betAmount * getMultiplierFromNumOptions(numOptions);
    lastRow = (
      <span className={makeAmountClass(amount)}>{makeAmount(amount)}</span>
    );
  }
  return (
    <Table.Row key={option.id}>
      <Table.Cell>{option.description}</Table.Cell>
      <Table.Cell>${option.betAmount.toLocaleString()}</Table.Cell>
      <Table.Cell>{lastRow}</Table.Cell>
    </Table.Row>
  );
}

function makeAccordionRow(personalEvent: any) {
  // Assume the same type as lib/personal_event.ts
  let finished = false;
  let n = personalEvent.options.length;

  let tagClassNames = "text-xs rounded rounded-full px-2 py-1";
  let tag;
  if (personalEvent.netResult == undefined) {
    tag = <span className={tagClassNames + " bg-sky-200"}>Pending</span>;
  } else {
    tag = (
      <span
        className={tagClassNames + " " + makeAmountBG(personalEvent.netResult)}
      >
        {makeAmount(personalEvent.netResult)}
      </span>
    );
  }

  let eventId = personalEvent.id;

  return (
    <Accordion.Panel key={eventId}>
      <Accordion.Title>
        {personalEvent.description} &nbsp; {tag}
      </Accordion.Title>
      <Accordion.Content>
        <Table>
          <Table.Head>
            <Table.HeadCell>Option</Table.HeadCell>
            <Table.HeadCell>Bet</Table.HeadCell>
            <Table.HeadCell>{finished ? "Result" : ""}</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {personalEvent.options.map((option: any) =>
              makeOptionListRow(
                option,
                personalEvent.winningOption?.id,
                n,
                eventId
              )
            )}
          </Table.Body>
        </Table>
      </Accordion.Content>
    </Accordion.Panel>
  );
}

export default function PersonalEventsList(props: any) {
  return <Accordion>{props.items.map(makeAccordionRow)}</Accordion>;
}
