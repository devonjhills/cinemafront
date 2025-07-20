import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../api/tmdbApi";

export const useMovieTrailer = (movieId: number) => {
  const videosQuery = useQuery({
    queryKey: ["movie", movieId, "videos"],
    queryFn: () => getMovieVideos(movieId),
    enabled: !!movieId,
  });

  const officialTrailer = videosQuery.data?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  return {
    ...videosQuery,
    officialTrailer,
  };
};
