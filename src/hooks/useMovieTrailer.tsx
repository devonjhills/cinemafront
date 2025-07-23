import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../api/tmdbApi";

/**
 * A custom hook to fetch video data for a movie and identify its official trailer.
 *
 * @param movieId The TMDB ID of the movie to fetch videos from.
 * @returns An object containing the standard `useQuery` return values, with:
 * - `officialTrailer`: The first official YouTube trailer video object found, or `undefined` if none.
 */
export const useMovieTrailer = (movieId: number) => {
  const videosQuery = useQuery({
    queryKey: ["movie", movieId, "videos"],
    queryFn: () => getMovieVideos(movieId),
    enabled: !!movieId,
    retry: false, // Don't retry 404s
    staleTime: 1000 * 60 * 5,
  });

  const officialTrailer = videosQuery.data?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  return {
    ...videosQuery,
    officialTrailer,
  };
};
