import { StarIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { MovieDetails, Genre } from "../types/movie";
import { formatDate } from "../utils/formatDate";

type MovieHeaderProps = {
  details: MovieDetails;
  posterUrl: string;
  director?: { name: string };
  writers: { name: string }[];
  officialTrailer?: { key: string };
};

export const MovieHeader = ({
  details,
  posterUrl,
  director,
  writers,
  officialTrailer,
}: MovieHeaderProps) => {
  return (
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
          {details.release_date
            ? details.release_date.substring(0, 4)
            : "Unknown"}
        </p>

        {details.tagline && (
          <p className="text-gray-600 italic mb-6">{details.tagline}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {details.genres?.map((genre: Genre) => (
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
            <p>
              {details.release_date
                ? formatDate(details.release_date)
                : "Unknown"}
            </p>
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
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">
              {details.vote_average ? details.vote_average.toFixed(1) : "N/A"}
              /10
            </span>
            <span className="text-gray-500">
              (of {details.vote_count ? details.vote_count.toLocaleString() : 0}{" "}
              user reviews)
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
  );
};
