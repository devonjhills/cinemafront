import { describe, it, expect } from "vitest";
import { formatRuntime } from "./formatRuntime";

describe("formatRuntime", () => {
  it("formats runtime correctly", () => {
    expect(formatRuntime(135)).toBe("2h 15m");
    expect(formatRuntime(120)).toBe("2h");
    expect(formatRuntime(90)).toBe("1h 30m");
  });

  it("handles less than one hour", () => {
    expect(formatRuntime(45)).toBe("45m");
    expect(formatRuntime(30)).toBe("30m");
  });

  it("handles exact hours", () => {
    expect(formatRuntime(60)).toBe("1h");
    expect(formatRuntime(180)).toBe("3h");
  });

  it("handles zero runtime", () => {
    expect(formatRuntime(0)).toBe("Unknown");
  });
});
