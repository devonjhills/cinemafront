import type { MovieListEntry } from "../types/movie";

export interface SortOption {
  value: string;
  name: string;
}

export const sortOptions: SortOption[] = [
  { value: "popularity.desc", name: "Most Popular" },
  { value: "popularity.asc", name: "Least Popular" },
  { value: "vote_average.desc", name: "Highest Rated" },
  { value: "vote_average.asc", name: "Lowest Rated" },
  { value: "release_date.desc", name: "Newest First" },
  { value: "release_date.asc", name: "Oldest First" },
];

const getDateValue = (dateString: string | null | undefined): number => {
  return dateString ? new Date(dateString).getTime() : 0;
};

export const sortMovies = (
  movies: MovieListEntry[],
  sortBy: string
): MovieListEntry[] => {
  if (!movies) return [];
  
  return [...movies].sort((a, b) => {
    switch (sortBy) {
      case "popularity.desc":
        return (b.popularity || 0) - (a.popularity || 0);
      case "popularity.asc":
        return (a.popularity || 0) - (b.popularity || 0);
      case "vote_average.desc":
        return (b.vote_average || 0) - (a.vote_average || 0);
      case "vote_average.asc":
        return (a.vote_average || 0) - (b.vote_average || 0);
      case "release_date.desc":
        return getDateValue(b.release_date) - getDateValue(a.release_date);
      case "release_date.asc":
        return getDateValue(a.release_date) - getDateValue(b.release_date);
      default:
        return (b.popularity || 0) - (a.popularity || 0);
    }
  });
};
