import { useQuery } from "@tanstack/react-query";
import type { MovieListResponse } from "../types/movie";

export const MOVIE_QUERY_STALE_TIME = 1000 * 60 * 5; // 5 minutes

type MovieQueryFn = () => Promise<MovieListResponse>;

/**
 * Generic React Query hook for TMDB movie list endpoints.
 *
 * @param queryKey - React Query cache key array (e.g., ['movies', 'popular'])
 * @param queryFn - Function that returns a Promise with MovieListResponse
 * @param options - Additional React Query options like enabled flag
 * @returns React Query result with movie list data, loading states, etc.
 */
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
