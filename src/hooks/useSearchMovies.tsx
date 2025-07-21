import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdbApi";

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "search", query, page],
    queryFn: () => searchMovies(query, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: query.length > 0,
  });
};
