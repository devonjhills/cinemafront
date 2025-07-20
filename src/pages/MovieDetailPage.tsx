import { useParams, Link } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { getImageUrl } from "../api/tmdbApi";
import { formatDate } from "../utils/formatDate";
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { ActorCard } from "../components/ActorCard";

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const id = Number(movieId);

  const { data: details, isLoading, isError, error } = useMovieDetails(id);
  const { data: credits } = useMovieCredits(id);
  const { officialTrailer } = useMovieTrailer(id);

  if (isLoading)
    return <div className="text-center p-10">Loading movie details...</div>;
  if (isError)
    return (
      <div className="text-red-600 text-center p-10">
        Error loading movie: {(error as Error).message}
      </div>
    );
  if (!details) return <div className="text-center p-10">Movie not found.</div>;

  const posterUrl = details.poster_path
    ? getImageUrl(details.poster_path, "w500")
    : "https://placehold.co/500x750?text=No+Poster";

  const director = credits?.crew.find((member) => member.job === "Director");
  const writers =
    credits?.crew.filter((member) =>
      new Set(["Screenplay", "Writer", "Story"]).has(member.job)
    ) || [];
  const topBilledCast = credits?.cast.slice(0, 8) || [];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm border rounded-md px-3 py-1 hover:bg-gray-50 transition-colors mb-6">
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <img
              src={posterUrl}
              alt={`Poster for ${details.title}`}
              className="w-48 mx-auto lg:w-full border rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-medium mb-1">{details.title}</h1>
            <p className="text-gray-500 mb-4">
              {details.release_date.substring(0, 4)}
            </p>

            {details.tagline && (
              <p className="text-gray-600 italic mb-6">{details.tagline}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {details.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="border rounded-full text-xs px-2 py-1">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <h3 className="text-gray-500 font-medium mb-1">Release Date</h3>
                <p>{formatDate(details.release_date)}</p>
              </div>
              {details.runtime && (
                <div>
                  <h3 className="text-gray-500 font-medium mb-1">Runtime</h3>
                  <p>{details.runtime} minutes</p>
                </div>
              )}
              {director && (
                <div>
                  <h3 className="text-gray-500 font-medium mb-1">Director</h3>
                  <p>{director.name}</p>
                </div>
              )}
              {writers.length > 0 && (
                <div>
                  <h3 className="text-gray-500 font-medium mb-1">Writers</h3>
                  <p>{[...new Set(writers.map((w) => w.name))].join(", ")}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-sm">
                <StarIcon className="w-4 h-4" />
                <span className="font-medium">
                  {details.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-500">
                  ({details.vote_count.toLocaleString()})
                </span>
              </div>
              {officialTrailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${officialTrailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 border rounded-md px-3 py-1 text-sm hover:bg-gray-50 transition-colors">
                  Watch Trailer
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </a>
              )}
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {details.overview}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-lg font-medium mb-4">Cast</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {topBilledCast.map((actor) => (
              <ActorCard key={actor.credit_id} actor={actor} />
            ))}
          </div>
          {credits && credits.cast.length > topBilledCast.length && (
            <Disclosure>
              <div className="text-center mt-6">
                <DisclosureButton className="border rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  Show Full Cast
                </DisclosureButton>
              </div>
              <DisclosurePanel className="mt-8">
                <h3 className="text-base font-medium mb-3">Full Cast</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                  {credits.cast.map((actor) => (
                    <ActorCard key={actor.credit_id} actor={actor} />
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
          )}
        </div>
      </div>
    </div>
  );
};
