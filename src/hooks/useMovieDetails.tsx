import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/tmdbApi";

/**
 * Fetches detailed information for a specific movie from TMDB API.
 *
 * @param movieId - TMDB movie ID to fetch detailed information for
 * @returns React Query result with detailed movie data, isLoading, isError, etc.
 */
export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId, "details"],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
    retry: false, // Don't retry 404s
    staleTime: 1000 * 60 * 5,
  });
};
