// interfaces as defined by https://developer.themoviedb.org/reference/

/**
 * Movie genre as returned by TMDB API.
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * Base movie properties shared between list entries and detailed movie objects.
 * Contains core movie information available in all TMDB movie responses.
 */
export interface MovieBase {
  id: number;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieListEntry extends MovieBase {
  genre_ids: number[];
}

/**
 * Complete movie information from TMDB movie details endpoint.
 */
export interface MovieDetails extends MovieBase {
  budget: number;
  genres: Genre[];
  revenue: number;
  runtime: number | null;
  tagline: string | null;
}

/**
 * Cast member information from TMDB movie credits endpoint.
 * Ordered by billing prominence (order field).
 */
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  credit_id: string;
  order: number;
}

/**
 * Crew member information from TMDB movie credits endpoint.
 */
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

/**
 * TMDB API response structure for paginated movie lists.
 * Used by popular, top-rated, now-playing, and search endpoints.
 */
export interface MovieListResponse {
  page: number;
  results: MovieListEntry[];
  total_pages: number;
  total_results: number;
}

/**
 * TMDB API response structure for movie cast and crew information.
 */
export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}
