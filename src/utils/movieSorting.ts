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

export const sortMovies = (
  movies: MovieListEntry[],
  sortBy: string
): MovieListEntry[] => {
  if (!movies) return [];

  const sorted = [...movies];
  switch (sortBy) {
    case "popularity.asc":
      return sorted.sort((a, b) => (a.popularity || 0) - (b.popularity || 0));
    case "vote_average.desc":
      return sorted.sort(
        (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
      );
    case "vote_average.asc":
      return sorted.sort(
        (a, b) => (a.vote_average || 0) - (b.vote_average || 0)
      );
    case "release_date.desc":
      return sorted.sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateB - dateA;
      });
    case "release_date.asc":
      return sorted.sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateA - dateB;
      });
    case "popularity.desc":
    default:
      return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
};
