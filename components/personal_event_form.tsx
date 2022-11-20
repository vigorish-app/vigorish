import { Card, TextInput, Textarea, Button, Label } from "flowbite-react";
import { useState, useEffect } from "react";

interface OptionData {
  description: string | undefined;
  betAmount: number | undefined;
}
interface Options {
  [key: number]: OptionData;
}

function makeDefaultBet(numOptions: number) {
  return Math.floor(100 / numOptions);
}

function makeDefaultOptionsData(numOptions: number) {
  let options: Options = {};
  for (let i = 0; i < numOptions; ++i) {
    options[i] = {
      description: undefined,
      betAmount: undefined,
    };
  }
  return options;
}

function Options(props: any) {
  const [invalidBets, setInvalidBets] = useState<{ [key: number]: boolean }>(
    {}
  );
  let defaultBet = `${makeDefaultBet(props.numOptions)}`;

  const [options, setOptions] = useState<Options>(
    makeDefaultOptionsData(props.numOptions)
  );
  let rows = [];

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let indexProp = ev.target.dataset.index as string;
    let index = parseInt(indexProp);
    let field = ev.target.dataset.type as "description" | "betAmount";
    let option = options[index] || {};
    if (field == "description") option[field] = ev.target.value;
    else {
      let value = Number(ev.target.value);
      if (isNaN(value) || value < 0 || value > 100) {
        setInvalidBets({
          ...invalidBets,
          [index]: true,
        });
        option[field] = 0;
      } else {
        option[field] = value;
        setInvalidBets({
          ...invalidBets,
          [index]: false,
        });
      }
    }

    setOptions({
      ...options,
      [index]: option,
    });
    props.onChange(options);
  };
  for (let i = 0; i < props.numOptions; ++i) {
    rows.push(
      <TextInput
        placeholder="Option"
        name="description"
        id={"option" + i}
        key={"option" + i}
        data-index={i}
        data-type="description"
        className="col-start-2 col-span-4"
        onChange={handleChange}
        required
      />
    );
    rows.push(
      <TextInput
        placeholder={defaultBet}
        id={"optionBet" + i}
        key={"optionBet" + i}
        className="col-span-1"
        data-index={i}
        data-type="betAmount"
        name="betAmount"
        onChange={handleChange}
        color={invalidBets[i] ? "failure" : undefined}
        required
      />
    );
  }
  return <>{rows}</>;
}

export default function PersonalEventForm(props: any) {
  const [numOptions, setNumOptions] = useState(props.numOptions || 2);
  const [totalBet, setTotalBet] = useState<number>(100);
  const [isValid, setIsValid] = useState<boolean>(false);

  function optionsChanged(options: Options) {
    let localN = Object.keys(options).length;
    let defaultBet = makeDefaultBet(localN);

    let summedBets = 0;
    let foundEmptyOption = false;
    for (let i = 0; i < localN; ++i) {
      let betAmount = options[i].betAmount;
      if (betAmount != undefined && !isNaN(betAmount)) {
        summedBets += betAmount;
      } else {
        summedBets += defaultBet;
      }
      foundEmptyOption ||= options[i].description === undefined;
    }

    setTotalBet(summedBets);
    if (summedBets == 100 && !foundEmptyOption) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  let maxOptions = props.maxOptions || 4;
  return (
    <Card className="max-w-xl mx-auto">
      <div className="grid grid-cols-5">
        <h2 className="text-2xl col-span-3">Create Event</h2>
        <p className="text-xs col-span-2 text-gray-600">
          Each option is given equal odds and you distribute $100 amongst them
        </p>
      </div>
      <form action="/api/personal_events" method="post">
        <div className="grid grid-cols-6 gap-4">
          <TextInput
            id="question"
            name="question"
            placeholder="Event Question"
            className="col-span-6"
            required
          />
          <Options numOptions={numOptions} onChange={optionsChanged} />
          <Button
            className="col-start-3 col-span-2"
            color="light"
            disabled={numOptions >= maxOptions}
            onClick={() => setNumOptions(numOptions + 1)}
          >
            Add Option
          </Button>
          <TextInput
            value={totalBet}
            readOnly
            disabled
            color={totalBet == 100 ? undefined : "failure"}
            className="col-start-6 col-span-1"
          />
          <Button className="col-span-6" disabled={!isValid} type="submit">
            Create Bet
          </Button>
        </div>
      </form>
    </Card>
  );
}
