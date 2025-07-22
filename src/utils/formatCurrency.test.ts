import { describe, it, expect } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats positive numbers correctly", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000");
    expect(formatCurrency(50000000)).toBe("$50,000,000");
    expect(formatCurrency(150000000)).toBe("$150,000,000");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("Not disclosed");
  });

  it("handles invalid amounts", () => {
    expect(formatCurrency(-100)).toBe("Not disclosed");
  });

  it("handles decimals", () => {
    expect(formatCurrency(1000.5)).toBe("$1,001");
    expect(formatCurrency(999.99)).toBe("$1,000");
  });
});
