export const formatCurrency = (amount: number): string => {
  // Because api parsing returns 0 if null
  if (amount === 0) return "Not disclosed";

  // Handle invalid amounts (negative, NaN, Infinity)
  if (amount <= 0 || !Number.isFinite(amount)) {
    return "Not disclosed";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
