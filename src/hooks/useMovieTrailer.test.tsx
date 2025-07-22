import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "../test/utils";
import { useMovieTrailer } from "./useMovieTrailer";
import { mockMovieVideos } from "../test/mocks/handlers";

describe("useMovieTrailer", () => {
  it("should fetch movie videos and find official trailer", async () => {
    const { result } = renderHook(() => useMovieTrailer(1));

    expect(result.current.isPending).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      ...mockMovieVideos,
      id: 1,
    });

    // Should find the official YouTube trailer
    expect(result.current.officialTrailer).toBeDefined();
    expect(result.current.officialTrailer?.site).toBe("YouTube");
    expect(result.current.officialTrailer?.type).toBe("Trailer");
    expect(result.current.officialTrailer?.key).toBe("qwerty");
  });

  it("should filter to only return YouTube trailers, not other video types", async () => {
    const { result } = renderHook(() => useMovieTrailer(1));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // all 3 videos in the raw data
    expect(result.current.data?.results).toHaveLength(3);

    // officialTrailer should only be the YouTube trailer
    expect(result.current.officialTrailer).toBeDefined();
    expect(result.current.officialTrailer?.site).toBe("YouTube");
    expect(result.current.officialTrailer?.type).toBe("Trailer");
    expect(result.current.officialTrailer?.key).toBe("qwerty");

    // and not the other video types
    expect(result.current.officialTrailer?.key).not.toBe("behind-scenes-123");
    expect(result.current.officialTrailer?.key).not.toBe("vimeo-123");
  });
});
