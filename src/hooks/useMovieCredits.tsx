import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdbApi";

export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
  });
};
