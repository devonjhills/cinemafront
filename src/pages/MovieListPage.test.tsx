import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/utils";
import userEvent from "@testing-library/user-event";
import { MovieListPage } from "./MovieListPage";

const mockNavigate = vi.fn();
const mockLocation = { search: "" };

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

describe("MovieListPage Integration", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLocation.search = "";
    vi.clearAllMocks();
  });

  it("loads and displays popular movies from API", async () => {
    render(<MovieListPage />);

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
    expect(await screen.findByText("Superman")).toBeInTheDocument();

    const heading = screen.getByRole("heading", { name: /popular movies/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText("Spider-Man: No Way Home")).toBeInTheDocument();
    expect(screen.getByText(/browse curated lists/i)).toBeInTheDocument();
  });

  it("searches for movies, updates URL, and displays filtered results", async () => {
    const user = userEvent.setup();
    render(<MovieListPage />);

    expect(await screen.findByText("Superman")).toBeInTheDocument();
    const initialHeading = screen.getByRole("heading", {
      name: /popular movies/i,
    });
    expect(initialHeading).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", {
      name: /search for movies/i,
    });
    await user.type(searchInput, "Superman");
    await user.click(
      screen.getByRole("button", { name: /search for movies/i })
    );

    const searchHeading = await screen.findByRole("heading", {
      name: /search results for "superman"/i,
    });
    expect(searchHeading).toBeInTheDocument();

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: "search=Superman" },
      { replace: true }
    );

    expect(
      screen.queryByText("Spider-Man: No Way Home")
    ).not.toBeInTheDocument();
  });

  it("changes category, updates URL, and displays different movie list", async () => {
    const user = userEvent.setup();
    render(<MovieListPage />);

    expect(await screen.findByText("Superman")).toBeInTheDocument();
    const categoryButton = screen.getByRole("button", {
      name: /select movie category/i,
    });

    await user.click(categoryButton);
    await user.click(screen.getByText(/top rated/i));

    const topRatedHeading = await screen.findByRole("heading", {
      name: /top rated movies/i,
    });
    expect(topRatedHeading).toBeInTheDocument();

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: "category=top_rated" },
      { replace: true }
    );

    expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
    expect(screen.getByText("Avengers: Endgame")).toBeInTheDocument();
    expect(screen.queryByText("Superman")).not.toBeInTheDocument();
  });

  it("performs search then clears it, updates URL, and returns to category view", async () => {
    const user = userEvent.setup();
    render(<MovieListPage />);

    expect(await screen.findByText("Superman")).toBeInTheDocument();
    const initialHeading = screen.getByRole("heading", {
      name: /popular movies/i,
    });
    expect(initialHeading).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", {
      name: /search for movies/i,
    });
    await user.type(searchInput, "Superman");
    await user.click(
      screen.getByRole("button", { name: /search for movies/i })
    );

    const searchHeading = await screen.findByRole("heading", {
      name: /search results for "superman"/i,
    });
    expect(searchHeading).toBeInTheDocument();

    const clearButton = screen.getByRole("button", {
      name: /clear search results/i,
    });
    await user.click(clearButton);

    const restoredHeading = await screen.findByRole("heading", {
      name: /popular movies/i,
    });
    expect(restoredHeading).toBeInTheDocument();

    expect(mockNavigate).toHaveBeenCalled();

    expect(screen.getByText("Superman")).toBeInTheDocument();
    expect(screen.getByText("Spider-Man: No Way Home")).toBeInTheDocument();
  });

  it("initializes state from URL parameters on page load", async () => {
    mockLocation.search = "?search=Superman";
    render(<MovieListPage />);

    const searchHeading = await screen.findByRole("heading", {
      name: /search results for "superman"/i,
    });
    expect(searchHeading).toBeInTheDocument();

    expect(
      screen.queryByText("Spider-Man: No Way Home")
    ).not.toBeInTheDocument();
  });

  it("initializes with specific category from URL parameters", async () => {
    mockLocation.search = "?category=top_rated";
    render(<MovieListPage />);

    expect(await screen.findByText("The Dark Knight")).toBeInTheDocument();
    const topRatedHeading = screen.getByRole("heading", {
      name: /top rated movies/i,
    });
    expect(topRatedHeading).toBeInTheDocument();

    expect(screen.queryByText("Superman")).not.toBeInTheDocument();
  });

  it("changes movie sort order when user selects different sort option", async () => {
    const user = userEvent.setup();
    render(<MovieListPage />);

    expect(await screen.findByText("Superman")).toBeInTheDocument();

    let movieCards = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/movie/"));
    let movieTitles = movieCards.map(
      (card) => card.querySelector("h3")?.textContent || ""
    );

    expect(movieTitles).toEqual(["Superman", "Spider-Man: No Way Home"]);

    const sortButton = screen.getByRole("button", { name: /sort movies by/i });
    await user.click(sortButton);
    await user.click(screen.getByText(/highest rated/i));

    expect(screen.getByText(/highest rated/i)).toBeInTheDocument();

    movieCards = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/movie/"));
    movieTitles = movieCards.map(
      (card) => card.querySelector("h3")?.textContent || ""
    );

    expect(movieTitles).toEqual(["Spider-Man: No Way Home", "Superman"]);
  });
});
