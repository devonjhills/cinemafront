import { searchMovies } from "../api/tmdbApi";
import { useMovieQuery } from "./useMovieQuery";

export const useSearchMovies = (query: string, page: number = 1) => {
  return useMovieQuery(
    ["movies", "search", query, page],
    () => searchMovies(query, page),
    { enabled: query.length > 0 }
  );
};
