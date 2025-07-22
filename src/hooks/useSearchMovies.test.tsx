import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "../test/utils";
import { useSearchMovies } from "./useSearchMovies";

describe("useSearchMovies", () => {
  it("should search movies successfully", async () => {
    const { result } = renderHook(() => useSearchMovies("Batman"));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results).toHaveLength(1);
    expect(result.current.data?.results[0].title).toBe("The Batman");
  });

  it("should search with partial query", async () => {
    const { result } = renderHook(() => useSearchMovies("super"));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results).toHaveLength(1);
    expect(result.current.data?.results[0].title).toBe("Superman");
  });

  it("should return empty results for no matches", async () => {
    const { result } = renderHook(() => useSearchMovies("NoMovieHasThisTitle"));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results).toHaveLength(0);
    expect(result.current.data?.total_results).toBe(0);
  });

  it("should be disabled when query is empty", async () => {
    const { result } = renderHook(() => useSearchMovies(""));

    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.fetchStatus).toBe("idle");

    // should not make a request
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should work with single character search", async () => {
    const { result } = renderHook(() => useSearchMovies("x"));

    // hook attempts to search
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // no match for "x" in mock data
    expect(result.current.data?.results).toHaveLength(0);
  });

  it("should enable/disable query based on search query", async () => {
    const { result, rerender } = renderHook(
      ({ query }) => useSearchMovies(query),
      {
        initialProps: { query: "" },
      }
    );

    // should be disabled with empty query
    expect(result.current.fetchStatus).toBe("idle");

    // enable with valid query
    rerender({ query: "Batman" });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results).toHaveLength(1);

    // disable again
    rerender({ query: "" });

    expect(result.current.fetchStatus).toBe("idle");
  });

  it("should return different results when query changes", async () => {
    const { result, rerender } = renderHook(
      ({ query }) => useSearchMovies(query),
      {
        initialProps: { query: "Batman" },
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results[0].title).toBe("The Batman");

    // change query
    rerender({ query: "Superman" });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.results[0].title).toBe("Superman");
  });
});
