export function makeAmount(amount: number): string {
  let prefix = amount >= 0 ? "+" : "-";
  return `${prefix} \$${Math.abs(amount).toLocaleString()}`;
}

export function makeAmountClass(amount: number): string {
  let color = amount >= 0 ? "text-green-600" : "text-red-600";
  return color;
}

export function makeAmountBG(amount: number): string {
  // Only use makeAmountClass OR makeAmoutnBG
  let color = amount >= 0 ? "bg-green-200" : "bg-red-200";
  return color;
}
