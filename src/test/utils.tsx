import { type ReactElement } from "react";
import { render, type RenderOptions, renderHook, type RenderHookOptions } from "@testing-library/react";
import { AllTheProviders } from "./AllTheProviders";

// custom render syntax provided by RTL docs
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// custom renderHook syntax for hooks that need providers
const customRenderHook = <Result, Props>(
  render: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, "wrapper">
) => renderHook(render, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
