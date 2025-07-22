import axios from "axios";
import type {
  MovieCreditsResponse,
  MovieDetails,
  MovieListResponse,
  MovieVideosResponse,
} from "../types/movie";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

if (!apiKey) {
  throw new Error(
    "VITE_TMDB_API_KEY is not defined in your environment variables."
  );
}

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "en-US",
    include_adult: false,
  },
});

/**
 * Generic function to fetch data from TMDB API endpoints
 * @param endpoint - The API endpoint to call
 * @param params - Optional query parameters
 * @returns Promise resolving to typed API response data
 */
const fetchMovieData = async <T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> => {
  const response = await apiClient.get<T>(endpoint, { params });
  return response.data;
};

/**
 * Fetches popular movies from TMDB endpoint
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to movie list response
 */
export const getPopularMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMovieData<MovieListResponse>("/movie/popular", { page });
};

/**
 * Fetches now playing movies from TMDB endpoint
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to movie list response
 */
export const getNowPlayingMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMovieData<MovieListResponse>("/movie/now_playing", { page });
};

/**
 * Fetches top rated movies from TMDB endpoint
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to movie list response
 */
export const getTopRatedMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMovieData<MovieListResponse>("/movie/top_rated", { page });
};

/**
 * Fetches detailed information for a specific movie
 * @param movieId - The TMDB movie ID
 * @returns Promise resolving to movie details
 * @throws Error if movieId is invalid
 */
export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  if (!movieId || movieId <= 0) {
    throw new Error("Movie ID must be a positive number");
  }
  return fetchMovieData<MovieDetails>(`/movie/${movieId}`);
};

/**
 * Fetches cast and crew information for a specific movie
 * @param movieId - The TMDB movie ID
 * @returns Promise resolving to movie credits response
 * @throws Error if movieId is invalid
 */
export const getMovieCredits = async (
  movieId: number
): Promise<MovieCreditsResponse> => {
  if (!movieId || movieId <= 0) {
    throw new Error("Movie ID must be a positive number");
  }
  return fetchMovieData<MovieCreditsResponse>(`/movie/${movieId}/credits`);
};

/**
 * Fetches trailers and videos for a specific movie
 * @param movieId - The TMDB movie ID
 * @returns Promise resolving to movie videos response
 * @throws Error if movieId is invalid
 */
export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideosResponse> => {
  if (!movieId || movieId <= 0) {
    throw new Error("Movie ID must be a positive number");
  }
  return fetchMovieData<MovieVideosResponse>(`/movie/${movieId}/videos`);
};

/**
 * Searches for movies by title
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @returns Promise resolving to movie list response
 * @throws Error if query is empty
 */
export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieListResponse> => {
  if (!query || query.trim().length === 0) {
    throw new Error("Search query cannot be empty");
  }
  return fetchMovieData<MovieListResponse>("/search/movie", {
    query: query.trim(),
    page,
  });
};

/**
 * Constructs full URL for TMDB images
 * @param path - Image path from TMDB API response
 * @param size - Image size (default: "w500")
 * @returns Full image URL
 */
export const getImageUrl = (path: string, size: string = "w500"): string => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default apiClient;
