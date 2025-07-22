import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "../test/utils";
import { useMovieDetails } from "./useMovieDetails";
import { mockMovieDetails } from "../test/mocks/handlers";

describe("useMovieDetails", () => {
  it("should fetch movie details successfully", async () => {
    const { result } = renderHook(() => useMovieDetails(1));

    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      ...mockMovieDetails,
      id: 1,
    });
    expect(result.current.data?.title).toBe("The Batman");
    expect(result.current.data?.runtime).toBe(120);
    expect(result.current.data?.budget).toBe(50000000);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
