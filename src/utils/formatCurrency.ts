/**
 * Formats a numeric amount as USD currency with proper error handling.
 *
 * @param amount - Numeric amount to format
 * @returns Formatted currency string (e.g., "$150,000,000") or "Not disclosed" for invalid/zero amounts
 */
export const formatCurrency = (amount: number): string => {
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
