import { getTopRatedMovies } from "../api/tmdbApi";
import { useMovieQuery } from "./useMovieQuery";

export const useTopRatedMovies = (page: number = 1) => {
  return useMovieQuery(
    ["movies", "top_rated", page],
    () => getTopRatedMovies(page)
  );
};