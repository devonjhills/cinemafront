import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/utils";
import { MovieDetailPage } from "./MovieDetailPage";
import { server } from "../test/mocks/server";
import { http, HttpResponse } from "msw";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: () => mockNavigate,
  };
});

const { useParams } = await import("react-router-dom");

const renderWithMovieId = (movieId: string) => {
  vi.mocked(useParams).mockReturnValue({ movieId });
  return render(<MovieDetailPage />);
};

describe("MovieDetailPage Integration", () => {
  beforeEach(() => {
    vi.mocked(useParams).mockClear();
    mockNavigate.mockClear();
  });

  it("shows loading state initially", () => {
    renderWithMovieId("1");
    expect(screen.getByText("Loading movie details...")).toBeInTheDocument();
  });

  it("displays error message when API fails", async () => {
    server.use(
      http.get("*/movie/:movieId", () => {
        return new HttpResponse("Not Found", { status: 404 });
      }),
      http.get("*/movie/:movieId/credits", () => {
        return new HttpResponse("Not Found", { status: 404 });
      })
    );

    renderWithMovieId("invalid-id");

    expect(await screen.findByText(/movie not found/i)).toBeInTheDocument();
  });

  it("loads and displays complete movie details, cast, and crew", async () => {
    renderWithMovieId("1");

    const heading = await screen.findByRole("heading", { name: /superman/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText("Mysterious Superman Tagline")).toBeInTheDocument();
    expect(
      screen.getByText(/superman epic detailed overview/i)
    ).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();

    expect(screen.getByText("Christian Bale")).toBeInTheDocument();
    expect(screen.getByText("Heath Ledger")).toBeInTheDocument();
    expect(screen.getAllByText("Christopher Nolan")).toHaveLength(2);

    expect(screen.getByText(/release date/i)).toBeInTheDocument();
    expect(screen.getByText(/july.*2025/i)).toBeInTheDocument();

    // with longer cast data this button should be present
    const showFullButton = screen.getByRole("button", {
      name: /toggle cast and crew visibility/i,
    });
    expect(showFullButton).toBeInTheDocument();

    expect(screen.queryByText("Extra Crew Five")).not.toBeInTheDocument();
  });
});
