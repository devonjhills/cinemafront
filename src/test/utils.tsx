import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { AllTheProviders } from "./AllTheProviders";

// custom render syntax provided by RTL docs
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
