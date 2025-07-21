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
  },
});

const fetchMovieData = async <T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> => {
  const response = await apiClient.get<T>(endpoint, { params });
  return response.data;
};

export const getPopularMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMovieData<MovieListResponse>("/movie/popular", { page });
};

export const getNowPlayingMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMovieData<MovieListResponse>("/movie/now_playing", { page });
};

export const getTopRatedMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMovieData<MovieListResponse>("/movie/top_rated", { page });
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  return fetchMovieData<MovieDetails>(`/movie/${movieId}`);
};

export const getMovieCredits = async (
  movieId: number
): Promise<MovieCreditsResponse> => {
  return fetchMovieData<MovieCreditsResponse>(`/movie/${movieId}/credits`);
};

export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideosResponse> => {
  return fetchMovieData<MovieVideosResponse>(`/movie/${movieId}/videos`);
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMovieData<MovieListResponse>("/search/movie", {
    query,
    page,
    include_adult: false,
  });
};

export const getImageUrl = (path: string, size: string = "w500"): string => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default apiClient;
