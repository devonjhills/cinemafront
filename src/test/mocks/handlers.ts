import { http, HttpResponse } from "msw";
import type {
  MovieListResponse,
  MovieDetails,
  MovieCreditsResponse,
  MovieVideosResponse,
} from "../../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

// Mock data
export const mockMovieListResponse: MovieListResponse = {
  page: 1,
  total_pages: 100,
  total_results: 2000,
  results: [
    {
      id: 1,
      title: "The Batman",
      overview: "The Batman epic overview",
      release_date: "2024-01-01",
      poster_path: "/test-poster-1.jpg",
      vote_average: 8.5,
      vote_count: 1000,
      genre_ids: [28, 12],
      popularity: 100.0,
    },
    {
      id: 2,
      title: "Superman",
      overview: "Superman epic overview",
      release_date: "2024-02-01",
      poster_path: "/test-poster-2.jpg",
      vote_average: 7.2,
      vote_count: 500,
      genre_ids: [35, 18],
      popularity: 80.0,
    },
  ],
};

export const mockMovieDetails: MovieDetails = {
  id: 1,
  title: "The Batman",
  overview: "The Batman epic detailed overview ",
  release_date: "2024-01-01",
  poster_path: "/test-poster-1.jpg",
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100.0,
  runtime: 120,
  budget: 50000000,
  revenue: 150000000,
  tagline: "Mysterious Batman Tagline",
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
  ],
};

export const mockMovieCredits: MovieCreditsResponse = {
  id: 1,
  cast: [
    {
      id: 1,
      name: "Christian Bale",
      character: "Main Character",
      profile_path: "/test-actor-1.jpg",
      order: 0,
      credit_id: "test-credit-1",
    },
    {
      id: 2,
      name: "Heath Ledger",
      character: "Supporting Character",
      profile_path: "/test-actor-2.jpg",
      order: 1,
      credit_id: "test-credit-2",
    },
  ],
  crew: [
    {
      id: 3,
      name: "Christopher Nolan",
      job: "Director",
      department: "Directing",
      profile_path: "/test-director.jpg",
      credit_id: "test-credit-3",
    },
  ],
};

export const mockMovieVideos: MovieVideosResponse = {
  id: 1,
  results: [
    {
      id: "video-1",
      name: "Behind the Scenes",
      key: "behind-scenes-123",
      site: "YouTube",
      size: 1080,
      type: "Behind the Scenes",
      iso_639_1: "en",
      iso_3166_1: "US",
    },
    {
      id: "video-2",
      name: "Official Trailer",
      key: "qwerty",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
      iso_639_1: "en",
      iso_3166_1: "US",
    },
    {
      id: "video-3",
      name: "Vimeo Trailer",
      key: "vimeo-123",
      site: "Vimeo",
      size: 1080,
      type: "Trailer",
      iso_639_1: "en",
      iso_3166_1: "US",
    },
  ],
};

export const handlers = [
  // Popular movies
  http.get(`${BASE_URL}/movie/popular`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    return HttpResponse.json({
      ...mockMovieListResponse,
      page: parseInt(page),
    });
  }),

  // Now playing movies
  http.get(`${BASE_URL}/movie/now_playing`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    return HttpResponse.json({
      ...mockMovieListResponse,
      page: parseInt(page),
    });
  }),

  // Top rated movies
  http.get(`${BASE_URL}/movie/top_rated`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    return HttpResponse.json({
      ...mockMovieListResponse,
      page: parseInt(page),
    });
  }),

  // Movie details
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

  // Movie credits
  http.get(`${BASE_URL}/movie/:movieId/credits`, ({ params }) => {
    const movieId = parseInt(params.movieId as string);

    return HttpResponse.json({
      ...mockMovieCredits,
      id: movieId,
    });
  }),

  // Movie videos
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

    // Filter mock results based on search query
    const filteredResults = mockMovieListResponse.results.filter(
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

// Error handlers for testing error states
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
