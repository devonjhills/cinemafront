import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { getImageUrl } from "../api/tmdbApi";
import { BackButton } from "../components/BackButton";
import { MovieHeader } from "../components/MovieHeader";
import { MovieCast } from "../components/MovieCast";

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const id = Number(movieId);

  const { data: details, isLoading, isError, error } = useMovieDetails(id);
  const { data: credits } = useMovieCredits(id);
  const { officialTrailer } = useMovieTrailer(id);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading)
    return <div className="text-center p-10">Loading movie details...</div>;
  if (isError)
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <BackButton onClick={handleBack} />
        <div className="text-center p-10">
          <h1 className="text-2xl font-medium mb-4">Movie Not Found</h1>
          <p className="text-gray-600 mb-4">
            This movie may no longer be available or the link may be incorrect.
          </p>
          <p className="text-sm text-gray-500">
            Error: {(error as Error).message}
          </p>
        </div>
      </div>
    );
  if (!details) return <div className="text-center p-10">Movie not found.</div>;

  const posterUrl = details.poster_path
    ? getImageUrl(details.poster_path, "w500")
    : "https://placehold.co/500x750?text=No+Poster";

  const getCrewByJob = (job: string) => 
    credits?.crew.find((member) => member.job === job);
  
  const getCrewByJobs = (jobs: string[]) =>
    credits?.crew.filter((member) => jobs.includes(member.job)) || [];

  const director = getCrewByJob("Director");
  const writers = getCrewByJobs(["Screenplay", "Writer", "Story"]);
  const cast = credits?.cast || [];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <BackButton onClick={handleBack} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <MovieHeader
          details={details}
          posterUrl={posterUrl}
          director={director}
          writers={writers}
          officialTrailer={officialTrailer}
        />

        <MovieCast cast={cast} />
      </div>
    </div>
  );
};
