import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdbApi";

export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    retry: false, // Don't retry 404s
    staleTime: 1000 * 60 * 5,
  });
};
