import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats ISO date strings correctly", () => {
    expect(formatDate("2024-01-15")).toBe("January 15, 2024");
    expect(formatDate("2023-12-01")).toBe("December 1, 2023");
    expect(formatDate("2020-06-12")).toBe("June 12, 2020");
  });

  it("handles invalid date formats", () => {
    expect(formatDate("invalid-date")).toBe("Invalid Date");
    expect(formatDate("2024-13-33")).toBe("Invalid Date");
  });

  it("handles null or undefined input", () => {
    expect(formatDate(null)).toBe("TBA");
    expect(formatDate(undefined)).toBe("TBA");
  });
});
