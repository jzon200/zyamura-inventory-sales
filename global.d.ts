declare function getCurrency(value: number) {
  return value.toLocaleString("en-PH", { currency: "PHP", style: "currency" });
};
