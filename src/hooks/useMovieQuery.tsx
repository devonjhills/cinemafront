import { useQuery } from "@tanstack/react-query";
import type { MovieListResponse } from "../types/movie";

export const MOVIE_QUERY_STALE_TIME = 1000 * 60 * 5; // 5 minutes

type MovieQueryFn = () => Promise<MovieListResponse>;

export const useMovieQuery = (
  queryKey: (string | number)[],
  queryFn: MovieQueryFn,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: MOVIE_QUERY_STALE_TIME,
    ...options,
  });
};