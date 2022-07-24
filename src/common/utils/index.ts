import type { KeyboardEvent } from "react";

function getPhpCurrency(amount: number) {
  if (isNaN(amount)) {
    return 0;
  }

  return `₱${amount.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

function handleNumberKeys(event: KeyboardEvent) {
  const invalidKeys = ["e", "E", "+", "-", "."];
  invalidKeys.includes(event.key) && event.preventDefault();
}

export { getPhpCurrency, handleNumberKeys };
