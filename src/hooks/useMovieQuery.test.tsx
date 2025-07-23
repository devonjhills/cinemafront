import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "../test/utils";
import { useMovieQuery } from "./useMovieQuery";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../api/tmdbApi";
import { popularMovies } from "../test/mocks/data";

describe("useMovieQuery", () => {
  it("should fetch data successfully", async () => {
    const { result } = renderHook(() =>
      useMovieQuery(["movies", "popular", 1], () => getPopularMovies(1))
    );

    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(popularMovies);
    expect(result.current.data?.results).toHaveLength(2);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should use different query keys for different requests", async () => {
    const { result: nowPlayingResult } = renderHook(() =>
      useMovieQuery(["movies", "now_playing", 1], () => getNowPlayingMovies(1))
    );

    const { result: topRatedResult } = renderHook(() =>
      useMovieQuery(["movies", "top_rated", 1], () => getTopRatedMovies(1))
    );

    await waitFor(() => {
      expect(nowPlayingResult.current.isSuccess).toBe(true);
      expect(topRatedResult.current.isSuccess).toBe(true);
    });

    // each should succeed in returning their respective category data
    expect(nowPlayingResult.current.data?.results).toHaveLength(2);
    expect(topRatedResult.current.data?.results).toHaveLength(2);
  });
});
