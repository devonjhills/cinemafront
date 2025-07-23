import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";
import {
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import type { MovieDetails, Genre } from "../types/movie";
import { formatDate } from "../utils/formatDate";
import { formatRuntime } from "../utils/formatRuntime";
import { formatCurrency } from "../utils/formatCurrency";

type MovieHeaderProps = {
  details: MovieDetails;
  posterUrl: string;
  officialTrailer?: { key: string };
};

export const MovieHeader = ({
  details,
  posterUrl,
  officialTrailer,
}: MovieHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-48 mx-auto md:w-64 lg:w-80 md:mx-0 flex-shrink-0">
          <img
            src={posterUrl}
            alt={`Poster for ${details.title}`}
            className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {details.title}
              <span className="text-gray-500 font-normal ml-2">
                (
                {details.release_date
                  ? details.release_date.substring(0, 4)
                  : "Unknown"}
                )
              </span>
            </h1>
            {details.tagline && (
              <p className="text-gray-600 italic text-lg">{details.tagline}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {details.genres?.map((genre: Genre) => (
              <span
                key={genre.id}
                className="bg-blue-100 text-blue-800 rounded-full text-sm px-3 py-1">
                {genre.name}
              </span>
            ))}
          </div>

          <div>
            <p className="text-gray-700 leading-relaxed">{details.overview}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                <h2 className="text-gray-500 font-semibold">Release Date</h2>
              </div>
              <p className="font-medium ml-6">
                {details.release_date
                  ? formatDate(details.release_date)
                  : "No release date available"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <h2 className="text-gray-500 font-semibold">Runtime</h2>
              </div>
              <p className="font-medium ml-6">
                {details.runtime && details.runtime > 0
                  ? formatRuntime(details.runtime)
                  : "No runtime available"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                <h2 className="text-gray-500 font-semibold">Budget</h2>
              </div>
              <p className="font-medium ml-6">
                {details.budget && details.budget > 0
                  ? formatCurrency(details.budget)
                  : "Not disclosed"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BanknotesIcon className="w-4 h-4 text-gray-400" />
                <h2 className="text-gray-500 font-semibold">Revenue</h2>
              </div>
              <p className="font-medium ml-6">
                {details.revenue && details.revenue > 0
                  ? formatCurrency(details.revenue)
                  : "Not disclosed"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-lg">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">
                {details.vote_average !== null &&
                details.vote_average !== undefined &&
                details.vote_average > 0
                  ? details.vote_average.toFixed(1)
                  : "N/A"}
              </span>
              <span className="text-gray-500 text-sm">
                {details.vote_count && details.vote_count > 0
                  ? `(${details.vote_count.toLocaleString()} reviews)`
                  : "(No reviews)"}
              </span>
            </div>
            {officialTrailer && (
              <div className="flex sm:justify-start">
                <a
                  href={`https://www.youtube.com/watch?v=${officialTrailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors"
                  aria-label={`Watch ${details.title} trailer on YouTube (opens in new tab)`}>
                  <PlayIcon className="w-4 h-4" />
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
