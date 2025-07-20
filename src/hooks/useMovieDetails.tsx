import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/tmdbApi";

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId, "details"],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });
};
