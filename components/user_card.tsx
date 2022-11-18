import { Card } from "flowbite-react";

function makeAmount(amount: number): string {
  let prefix = amount > 0 ? "+" : "-";
  return `${prefix} \$${Math.abs(amount).toLocaleString()}`;
}

function makeAmountClass(amount: number): string {
  let color = amount > 0 ? "text-green-600" : "text-red-600";
  return color;
}

export default function UserCard(props: any) {
  let totalValue = props.marketValue + props.personalValue;

  let totalValueStyle = `text-2xl font-bold text-center ${makeAmountClass(
    totalValue
  )}`;
  return (
    <Card className="max-w-lg mx-auto">
      <h1 className={totalValueStyle}>{makeAmount(totalValue)}</h1>

      <div className="flex">
        <div className="flex-1">Personal Events</div>
        <div className={"flex-grow " + makeAmountClass(props.personalValue)}>
          {makeAmount(props.personalValue)}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">Market Events</div>
        <div className={"flex-grow " + makeAmountClass(props.marketValue)}>
          {makeAmount(props.marketValue)}
        </div>
      </div>
    </Card>
  );
}
