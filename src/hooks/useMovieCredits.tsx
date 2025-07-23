import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdbApi";

/**
 * Fetches cast and crew information for a specific movie from TMDB API.
 *
 * @param movieId - TMDB movie ID to fetch credits for
 * @returns React Query result with cast/crew data, isLoading, isError, etc.
 */
export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    retry: false, // Don't retry 404s
    staleTime: 1000 * 60 * 5,
  });
};
