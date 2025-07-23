import type { MovieListEntry } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies?: MovieListEntry[];
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  emptyMessage?: string;
}

/**
 * Responsive grid layout for displaying movie cards with loading, error, and empty states.
 *
 * @param movies - Array of movies to display in grid format
 * @param isLoading - Boolean for if data is currently being fetched
 * @param isError - Boolean for if fetch operation failed
 * @param error - Error object from failed fetch operation
 * @param emptyMessage - Message when no movies are found
 * @returns Grid layout with MovieCard components or appropriate state message
 */
export const MovieGrid = ({
  movies,
  isLoading,
  isError,
  error,
  emptyMessage = "No movies found",
}: MovieGridProps) => {
  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center h-64"
        role="status"
        aria-live="polite">
        <p className="text-sm">Loading movies...</p>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className="flex justify-center items-center h-64" role="alert">
        <p className="text-sm text-red-600">
          An error occurred while fetching movies. Please try again later.
        </p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm" aria-live="polite">
        {emptyMessage}
      </p>
    );
  }

  return (
    <section
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
      role="region"
      aria-label="Movie results">
      {movies.map((movie: MovieListEntry) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
};
