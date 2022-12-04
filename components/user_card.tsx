import { Card } from "flowbite-react";
import { useState, useEffect } from "react";

import { makeAmount, makeAmountClass } from "../components/util";

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

interface MeResponse {
  id: string;
  personalAmount: number;
  marketAmount: number;
}

export default function UserCard(props: any) {
  const [data, setData] = useState<MeResponse>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Failed to get /api/me, ", err);
        setLoading(false);
      });
  }, []);

  if (isLoading) return null;

  if (!data) return null;

  const personalValue = data.personalAmount as number;
  const marketValue = data.marketAmount as number;
  const totalValue = personalValue + marketValue;
  let totalValueStyle = `text-5xl font-bold text-center ${makeAmountClass(
    totalValue
  )}`;
  return (
    <Card className="max-w-lg mx-auto">
      <h1 className={totalValueStyle}>{makeAmount(totalValue)}</h1>
      {makeLineItem("Personal Events", personalValue)}
      {makeLineItem("Market Events", marketValue)}
    </Card>
  );
}
