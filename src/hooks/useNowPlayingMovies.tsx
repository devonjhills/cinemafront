import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/tmdbApi";

export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "now_playing", page],
    queryFn: () => getNowPlayingMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};