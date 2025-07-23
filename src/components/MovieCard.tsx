import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import type { MovieListEntry } from "../types/movie";
import { getImageUrl } from "../api/tmdbApi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const FALLBACK_POSTER_URL = "https://placehold.co/300x500?text=No+Poster+Found";

interface MovieCardProps {
  movie: MovieListEntry;
}

/**
 * Displays a movie in a card format ready for grid layouts.
 *
 * @param movie - Movie data from TMDB API containing id, title, poster_path, release_date, and vote_average
 * @returns JSX element representing a movie card
 */
const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? getImageUrl(movie.poster_path, "w500")
    : FALLBACK_POSTER_URL;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block h-full group"
      aria-label={`View details for ${movie.title}`}>
      <div className="bg-white border border-gray-200 rounded-xl h-full flex flex-col transition-all hover:shadow-xl hover:scale-105 shadow-md hover:border-gray-300">
        <img
          src={posterUrl}
          alt={`Poster for ${movie.title}`}
          className="w-full aspect-[2/3] object-cover rounded-t-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_POSTER_URL;
          }}
        />

        <div className="p-4 flex flex-col flex-grow">
          <h3
            className="text-base font-semibold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors"
            title={movie.title}>
            {movie.title}
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            {formatDate(movie.release_date)}
          </p>

          <div className="mt-auto pt-4">
            <div className="flex items-center text-sm font-medium text-gray-800">
              <SolidStar className="w-4 h-4 text-yellow-500" />
              <span className="ml-1">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
