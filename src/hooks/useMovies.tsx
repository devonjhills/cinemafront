import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/tmdbApi";

export const useMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => getPopularMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
