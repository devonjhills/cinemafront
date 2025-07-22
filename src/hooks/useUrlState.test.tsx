import { describe, it, expect } from "vitest";
import { renderHook, act } from "../test/utils";
import { useUrlState } from "./useUrlState";

describe("useUrlState", () => {
  it("should initialize with default values when no URL params exist", () => {
    const { result } = renderHook(() => useUrlState());

    expect(result.current.searchQuery).toBe("");
    expect(result.current.browseCategory).toBe("popular");
  });

  it("should update state when search query changes", () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.setSearchQuery("batman");
    });

    expect(result.current.searchQuery).toBe("batman");
  });

  it("should update state when category changes", () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.setBrowseCategory("top_rated");
    });

    expect(result.current.browseCategory).toBe("top_rated");
  });

  it("should clear search query", () => {
    const { result } = renderHook(() => useUrlState());

    act(() => {
      result.current.setSearchQuery("batman");
    });
    expect(result.current.searchQuery).toBe("batman");

    act(() => {
      result.current.setSearchQuery("");
    });
    expect(result.current.searchQuery).toBe("");
  });
});
