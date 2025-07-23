import { http, HttpResponse } from "msw";
import {
  popularMovies,
  nowPlayingMovies,
  topRatedMovies,
  mockMovieDetails,
  mockMovieCredits,
  mockMovieVideos,
} from "./data";

const BASE_URL = "https://api.themoviedb.org/3";

export const handlers = [
  http.get(`${BASE_URL}/movie/popular`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    return HttpResponse.json({
      ...popularMovies,
      page: parseInt(page),
    });
  }),

  http.get(`${BASE_URL}/movie/now_playing`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    return HttpResponse.json({
      ...nowPlayingMovies,
      page: parseInt(page),
    });
  }),

  http.get(`${BASE_URL}/movie/top_rated`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    return HttpResponse.json({
      ...topRatedMovies,
      page: parseInt(page),
    });
  }),

  http.get(`${BASE_URL}/movie/:movieId`, ({ params }) => {
    const movieId = parseInt(params.movieId as string);

    if (movieId === 999) {
      return HttpResponse.json(
        { status_message: "The resource you requested could not be found." },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      ...mockMovieDetails,
      id: movieId,
    });
  }),

  http.get(`${BASE_URL}/movie/:movieId/credits`, ({ params }) => {
    const movieId = parseInt(params.movieId as string);

    return HttpResponse.json({
      ...mockMovieCredits,
      id: movieId,
    });
  }),

  http.get(`${BASE_URL}/movie/:movieId/videos`, ({ params }) => {
    const movieId = parseInt(params.movieId as string);

    return HttpResponse.json({
      ...mockMovieVideos,
      id: movieId,
    });
  }),

  // Search movies
  http.get(`${BASE_URL}/search/movie`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const page = url.searchParams.get("page") || "1";

    if (!query) {
      return HttpResponse.json({
        page: 1,
        total_pages: 0,
        total_results: 0,
        results: [],
      });
    }

    // filter mock results based on search query from all categories
    const allMovies = [
      ...popularMovies.results,
      ...nowPlayingMovies.results,
      ...topRatedMovies.results,
    ];
    const filteredResults = allMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.overview.toLowerCase().includes(query.toLowerCase())
    );

    return HttpResponse.json({
      page: parseInt(page),
      total_pages: Math.ceil(filteredResults.length / 20),
      total_results: filteredResults.length,
      results: filteredResults,
    });
  }),
];

export const errorHandlers = [
  http.get(`${BASE_URL}/movie/popular`, () => {
    return HttpResponse.json(
      { status_message: "Internal Server Error" },
      { status: 500 }
    );
  }),

  http.get(`${BASE_URL}/movie/:movieId`, () => {
    return HttpResponse.json(
      { status_message: "The resource you requested could not be found." },
      { status: 404 }
    );
  }),
];
