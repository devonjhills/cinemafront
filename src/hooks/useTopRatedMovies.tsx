import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/tmdbApi";

export const useTopRatedMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "top_rated", page],
    queryFn: () => getTopRatedMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};