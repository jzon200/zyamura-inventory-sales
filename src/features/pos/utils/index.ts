function getTotalPrice(purchasedItems: Product[]) {
  return purchasedItems
    .map((item) => item.price)
    .reduce((previousValue, currentValue) => {
      if (isNaN(currentValue)) {
        return previousValue;
      }
      return previousValue + currentValue;
    }, 0);
}

export { getTotalPrice };
