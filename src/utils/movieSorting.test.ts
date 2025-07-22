import { describe, it, expect } from "vitest";
import { sortMovies, sortOptions } from "./movieSorting";
import type { MovieListEntry } from "../types/movie";

const mockMovies: MovieListEntry[] = [
  {
    id: 1,
    title: "Popular Movie",
    overview: "Very popular",
    popularity: 95.5,
    poster_path: "/poster1.jpg",
    release_date: "2024-01-15",
    vote_average: 7.8,
    vote_count: 1500,
    genre_ids: [28, 12],
  },
  {
    id: 2,
    title: "Highly Rated Movie",
    overview: "Great ratings",
    popularity: 45.2,
    poster_path: "/poster2.jpg",
    release_date: "2023-06-20",
    vote_average: 9.1,
    vote_count: 800,
    genre_ids: [18, 36],
  },
  {
    id: 3,
    title: "Old Movie",
    overview: "Classic film",
    popularity: 25.0,
    poster_path: "/poster3.jpg",
    release_date: "1920-03-10",
    vote_average: 6.5,
    vote_count: 300,
    genre_ids: [35, 18],
  },
];

describe("movieSorting", () => {
  describe("sortOptions", () => {
    it("exports correct sort options", () => {
      expect(sortOptions).toHaveLength(6);
      expect(sortOptions[0]).toEqual({
        value: "popularity.desc",
        name: "Most Popular",
      });
      expect(sortOptions[1]).toEqual({
        value: "popularity.asc",
        name: "Least Popular",
      });
      expect(sortOptions[2]).toEqual({
        value: "vote_average.desc",
        name: "Highest Rated",
      });
    });
  });

  describe("sortMovies", () => {
    it("sorts by popularity descending", () => {
      const result = sortMovies(mockMovies, "popularity.desc");

      expect(result[0].title).toBe("Popular Movie");
      expect(result[1].title).toBe("Highly Rated Movie");
      expect(result[2].title).toBe("Old Movie");
    });

    it("sorts by popularity ascending", () => {
      const result = sortMovies(mockMovies, "popularity.asc");

      expect(result[0].title).toBe("Old Movie");
      expect(result[1].title).toBe("Highly Rated Movie");
      expect(result[2].title).toBe("Popular Movie");
    });

    it("sorts by vote average descending", () => {
      const result = sortMovies(mockMovies, "vote_average.desc");

      expect(result[0].title).toBe("Highly Rated Movie");
      expect(result[1].title).toBe("Popular Movie");
      expect(result[2].title).toBe("Old Movie");
    });

    it("sorts by vote average ascending", () => {
      const result = sortMovies(mockMovies, "vote_average.asc");

      expect(result[0].title).toBe("Old Movie");
      expect(result[1].title).toBe("Popular Movie");
      expect(result[2].title).toBe("Highly Rated Movie");
    });

    it("sorts by release date descending", () => {
      const result = sortMovies(mockMovies, "release_date.desc");

      expect(result[0].title).toBe("Popular Movie"); // 2024
      expect(result[1].title).toBe("Highly Rated Movie"); // 2023
      expect(result[2].title).toBe("Old Movie"); // 1920
    });

    it("sorts by release date ascending", () => {
      const result = sortMovies(mockMovies, "release_date.asc");

      expect(result[0].title).toBe("Old Movie"); // 1920
      expect(result[1].title).toBe("Highly Rated Movie"); // 2023
      expect(result[2].title).toBe("Popular Movie"); // 2024
    });

    it("defaults to popularity descending for unknown sort option", () => {
      const result = sortMovies(mockMovies, "unknown.sort");

      expect(result[0].title).toBe("Popular Movie");
      expect(result[1].title).toBe("Highly Rated Movie");
      expect(result[2].title).toBe("Old Movie");
    });

    it("handles empty array", () => {
      const result = sortMovies([], "popularity.desc");
      expect(result).toEqual([]);
    });

    it("handles movies with missing values", () => {
      const moviesWithMissing: MovieListEntry[] = [
        {
          id: 1,
          title: "No Popularity",
          overview: "Missing popularity",
          popularity: 0,
          poster_path: "/poster1.jpg",
          release_date: "2024-01-15",
          vote_average: 0,
          vote_count: 100,
          genre_ids: [28],
        },
        {
          id: 2,
          title: "Has Popularity",
          overview: "Has all values",
          popularity: 85.5,
          poster_path: "/poster2.jpg",
          release_date: "2023-06-20",
          vote_average: 8.0,
          vote_count: 500,
          genre_ids: [18],
        },
      ];

      const result = sortMovies(moviesWithMissing, "popularity.desc");
      expect(result[0].title).toBe("Has Popularity");
      expect(result[1].title).toBe("No Popularity");
    });

    it("does not mutate original array", () => {
      const original = [...mockMovies];
      sortMovies(mockMovies, "popularity.desc");

      expect(mockMovies).toEqual(original);
    });
  });
});
