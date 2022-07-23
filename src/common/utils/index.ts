function getPhpCurrency(amount: number) {
  if (isNaN(amount)) {
    return 0;
  }

  return `₱${amount.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

export { getPhpCurrency };
