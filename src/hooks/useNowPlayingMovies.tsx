import { getNowPlayingMovies } from "../api/tmdbApi";
import { useMovieQuery } from "./useMovieQuery";

export const useNowPlayingMovies = (page: number = 1) => {
  return useMovieQuery(
    ["movies", "now_playing", page],
    () => getNowPlayingMovies(page)
  );
};