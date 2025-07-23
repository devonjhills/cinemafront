import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "../test/utils";
import { useMovieCredits } from "./useMovieCredits";
import { mockMovieCredits } from "../test/mocks/data";

describe("useMovieCredits", () => {
  it("should fetch movie credits successfully", async () => {
    const { result } = renderHook(() => useMovieCredits(1));

    expect(result.current.isPending).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovieCredits);

    // correctly parse between cast and crew
    expect(result.current.data?.cast).toHaveLength(6);
    expect(result.current.data?.crew).toHaveLength(6);
  });
});
