import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// mock ResizeObserver for HeadlessUI components
Object.defineProperty(globalThis, "ResizeObserver", {
  value: class ResizeObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  },
  configurable: true,
});

// clean up after each test
afterEach(() => {
  cleanup();
});
