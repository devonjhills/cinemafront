import { describe, it, expect } from "vitest";
import { server } from "../test/mocks/server";
import { http, HttpResponse } from "msw";
import { getMovieDetails, searchMovies, getImageUrl } from "./tmdbApi";

describe("TMDB API", () => {
  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      // override handler to return error
      server.use(
        http.get("https://api.themoviedb.org/3/movie/:movieId", () => {
          return HttpResponse.json(
            { status_message: "Internal Server Error" },
            { status: 500 }
          );
        })
      );

      await expect(getMovieDetails(1)).rejects.toThrow();
    });
  });

  describe("Input Validation", () => {
    it("should throw error for invalid movie ID (zero)", async () => {
      await expect(getMovieDetails(0)).rejects.toThrow(
        "Movie ID must be a positive number"
      );
    });

    it("should throw error for invalid movie ID (negative)", async () => {
      await expect(getMovieDetails(-1)).rejects.toThrow(
        "Movie ID must be a positive number"
      );
    });

    it("should throw error for empty search query", async () => {
      await expect(searchMovies("")).rejects.toThrow(
        "Search query cannot be empty"
      );
    });

    it("should throw error for whitespace-only search query", async () => {
      await expect(searchMovies("   ")).rejects.toThrow(
        "Search query cannot be empty"
      );
    });

    it("should trim whitespace from search queries", async () => {
      const result = await searchMovies("  Superman  ");

      expect(result.results).toHaveLength(1);
      expect(
        result.results.some((movie) => movie.title === "Superman")
      ).toBe(true);
    });
  });

  describe("Utility Functions", () => {
    it("should generate image URLs with default size", () => {
      const url = getImageUrl("/test-poster.jpg");

      expect(url).toBe("https://image.tmdb.org/t/p/w500/test-poster.jpg");
    });

    it("should handle empty path", () => {
      const url = getImageUrl("");

      expect(url).toBe("");
    });
  });
});
