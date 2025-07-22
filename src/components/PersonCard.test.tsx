import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/utils";
import { PersonCard } from "./PersonCard";
import { getImageUrl } from "../api/tmdbApi";
import { mockMovieCredits } from "../test/mocks/handlers";

// mock getImageUrl for unit test
vi.mock("../api/tmdbApi", () => ({
  getImageUrl: vi.fn(
    (path: string, size: string) => `mocked_url/${size}${path}`
  ),
}));

// Use mock data from handlers for consistency
const mockCast = mockMovieCredits.cast[0];
const mockCrew = mockMovieCredits.crew[0];

describe("PersonCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders cast member with image and character", () => {
    render(<PersonCard person={mockCast} type="cast" />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `mocked_url/w200${mockCast.profile_path}`
    );
    expect(screen.getByText(mockCast.name)).toBeInTheDocument();
    expect(screen.getByText(mockCast.character)).toBeInTheDocument();
  });

  it("renders crew member with image and job", () => {
    render(<PersonCard person={mockCrew} type="crew" />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `mocked_url/w200${mockCrew.profile_path}`
    );
    expect(screen.getByText(mockCrew.name)).toBeInTheDocument();
    expect(screen.getByText(mockCrew.job)).toBeInTheDocument();
  });

  it("renders fallback icon when profile_path is missing", () => {
    const personWithoutImage = { ...mockCast, profile_path: null };
    render(<PersonCard person={personWithoutImage} type="cast" />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText(personWithoutImage.name)).toBeInTheDocument();
    expect(screen.getByText(personWithoutImage.character)).toBeInTheDocument();
  });

  it("calls getImageUrl when profile_path is present", () => {
    render(<PersonCard person={mockCast} type="cast" />);
    expect(getImageUrl).toHaveBeenCalledWith(mockCast.profile_path, "w200");
  });
});
