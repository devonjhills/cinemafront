// interfaces as defined by https://developer.themoviedb.org/reference/
export interface Genre {
  id: number;
  name: string;
}

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

export interface MovieDetails extends MovieBase {
  budget: number;
  genres: Genre[];
  revenue: number;
  runtime: number | null;
  tagline: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  credit_id: string;
  order: number;
}

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

export interface MovieListResponse {
  page: number;
  results: MovieListEntry[];
  total_pages: number;
  total_results: number;
}

export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}
