import { Card } from "flowbite-react";

function makeAmount(amount: number): string {
  let prefix = amount > 0 ? "+" : "-";
  return `${prefix} \$${Math.abs(amount).toLocaleString()}`;
}

function makeAmountClass(amount: number): string {
  let color = amount > 0 ? "text-green-600" : "text-red-600";
  return color;
}

function makeLineItem(description: string, amount: number) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex-1">{description}</div>
      <div className={"flex-grow text-right " + makeAmountClass(amount)}>
        {makeAmount(amount)}
      </div>
    </div>
  );
}

export default function UserCard(props: any) {
  let totalValue = props.marketValue + props.personalValue;

  let totalValueStyle = `text-5xl font-bold text-center ${makeAmountClass(
    totalValue
  )}`;
  return (
    <Card className="max-w-lg mx-auto">
      <h1 className={totalValueStyle}>{makeAmount(totalValue)}</h1>
      {makeLineItem("Personal Events", props.personalValue)}
      {makeLineItem("Market Events", props.marketValue)}
    </Card>
  );
}
