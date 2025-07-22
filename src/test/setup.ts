import "@testing-library/jest-dom";
import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./mocks/server";

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

// MSW setup
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
