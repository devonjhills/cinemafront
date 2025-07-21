import { getPopularMovies } from "../api/tmdbApi";
import { useMovieQuery } from "./useMovieQuery";

export const useMovies = (page: number = 1) => {
  return useMovieQuery(
    ["movies", "popular", page],
    () => getPopularMovies(page)
  );
};
