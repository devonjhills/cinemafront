import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../api/tmdbApi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const FALLBACK_POSTER_URL = "https://placehold.co/300x500?text=No+Poster+Found";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? getImageUrl(movie.poster_path, "w500")
    : FALLBACK_POSTER_URL;

  return (
    <Link to={`/movie/${movie.id}`} className="block h-full group">
      <div className="bg-gray-50 border border-gray-200 rounded-lg h-full flex flex-col transition-all hover:bg-gray-100 hover:shadow-md">
        <img
          src={posterUrl}
          alt={`Poster for ${movie.title}`}
          className="w-full aspect-[2/3] object-cover rounded-t-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_POSTER_URL;
          }}
        />

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-base font-medium leading-tight text-gray-900" title={movie.title}>
            {movie.title}
          </h3>

          <p className="text-sm text-gray-700 mt-1">
            {formatDate(movie.release_date)}
          </p>

          <div className="mt-auto pt-3">
            <div className="flex items-center text-sm text-gray-800">
              <SolidStar className="w-4 h-4 text-yellow-500" />
              <span className="ml-1">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="ml-1 text-gray-600">
                ({movie.vote_count.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
