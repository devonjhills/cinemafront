import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../test/utils";
import MovieCard from "./MovieCard";
import { getImageUrl } from "../api/tmdbApi";
import { formatDate } from "../utils/formatDate";
import { mockMovieListResponse } from "../test/mocks/handlers";

// mock utils for unit tests
vi.mock("../api/tmdbApi", () => ({
  getImageUrl: vi.fn(
    (path: string, size: string) => `mocked_url/${size}${path}`
  ),
}));
vi.mock("../utils/formatDate", () => ({
  formatDate: vi.fn((date: string) => `formatted-${date}`),
}));

// Use mock data from handlers for consistency
const baseMovie = mockMovieListResponse.results[0];

describe("MovieCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie card with poster, title, date, and vote score", () => {
    render(<MovieCard movie={baseMovie} />);

    const poster = screen.getByRole("img", {
      name: /Poster for The Batman/i,
    });
    expect(poster).toHaveAttribute(
      "src",
      `mocked_url/w500${baseMovie.poster_path}`
    );
    expect(getImageUrl).toHaveBeenCalledWith(baseMovie.poster_path, "w500");

    expect(screen.getByText(baseMovie.title)).toBeInTheDocument();

    expect(formatDate).toHaveBeenCalledWith(baseMovie.release_date);
    expect(
      screen.getByText(`formatted-${baseMovie.release_date}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(baseMovie.vote_average.toFixed(1))
    ).toBeInTheDocument();
  });

  it("uses fallback image when poster_path is missing", () => {
    const noPosterMovie = { ...baseMovie, poster_path: null };
    render(<MovieCard movie={noPosterMovie} />);

    const poster = screen.getByRole("img", {
      name: /Poster for The Batman/i,
    });
    expect(poster).toHaveAttribute(
      "src",
      "https://placehold.co/300x500?text=No+Poster+Found"
    );
  });

  it("replaces image with fallback on error", () => {
    render(<MovieCard movie={baseMovie} />);

    const poster = screen.getByRole("img", {
      name: /Poster for The Batman/i,
    });
    fireEvent.error(poster);

    expect(poster).toHaveAttribute(
      "src",
      "https://placehold.co/300x500?text=No+Poster+Found"
    );
  });

  it("links to the movie detail page", () => {
    render(<MovieCard movie={baseMovie} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/movie/${baseMovie.id}`);
  });

  it("displays N/A when vote_average is undefined or null", () => {
    const noVoteMovie = {
      ...baseMovie,
      vote_average: null as unknown as number,
    };
    render(<MovieCard movie={noVoteMovie} />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
