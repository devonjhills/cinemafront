import axios from "axios";
import type {
  MovieCreditsResponse,
  MovieDetails,
  MovieListResponse,
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

export const getPopularMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  const response = await apiClient.get<MovieListResponse>("/movie/popular", {
    params: {
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const response = await apiClient.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (
  movieId: number
): Promise<MovieCreditsResponse> => {
  const response = await apiClient.get<MovieCreditsResponse>(
    `/movie/${movieId}/credits`
  );
  return response.data;
};

export const getImageUrl = (path: string, size: string = "w500"): string => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default apiClient;
