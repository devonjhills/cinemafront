import { useLocation } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import MovieCard from "../components/MovieCard";

export const MovieListPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || 'popular';

  const popularQuery = useMovies(1);
  const nowPlayingQuery = useNowPlayingMovies(1);
  const topRatedQuery = useTopRatedMovies(1);

  const getActiveQuery = () => {
    switch (category) {
      case 'now_playing':
        return nowPlayingQuery;
      case 'top_rated':
        return topRatedQuery;
      default:
        return popularQuery;
    }
  };

  const getTitle = () => {
    switch (category) {
      case 'now_playing':
        return 'Now Playing';
      case 'top_rated':
        return 'Top Rated Movies';
      default:
        return 'Popular Movies';
    }
  };

  const { data, error, isLoading, isError } = getActiveQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-sm">Loading movies...</p>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-sm text-red-600">
          An error occurred while fetching movies. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-medium mb-6">{getTitle()}</h1>
      {data && data.results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">No movies found</p>
      )}
    </div>
  );
};
