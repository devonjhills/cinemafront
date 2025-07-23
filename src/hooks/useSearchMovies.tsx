import { searchMovies } from "../api/tmdbApi";
import { useMovieQuery } from "./useMovieQuery";

/**
 * Searches for movies using TMDB API based on user query.
 *
 * @param query - Search term to find movies. Must be non-empty to trigger search
 * @param page - Page number for paginated results (defaults to 1)
 * @returns React Query result with search results, isLoading, isError, etc.
 */
export const useSearchMovies = (query: string, page: number = 1) => {
  return useMovieQuery(
    ["movies", "search", query, page],
    () => searchMovies(query, page),
    { enabled: query.length > 0 }
  );
};
