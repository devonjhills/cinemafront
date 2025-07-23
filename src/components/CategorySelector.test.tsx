import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/utils";
import userEvent from "@testing-library/user-event";
import { CategorySelector } from "./CategorySelector";

const mockCategories = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "now_playing", label: "Now Playing" },
];

describe("CategorySelector", () => {
  it("renders heading and current selection", () => {
    render(
      <CategorySelector
        categories={mockCategories}
        value="popular"
        onChange={() => {}}
      />
    );

    expect(screen.getByText(/browse curated lists/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Popular");
  });

  it("shows all categories when opened", async () => {
    const user = userEvent.setup();

    render(
      <CategorySelector
        categories={mockCategories}
        value="popular"
        onChange={() => {}}
      />
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(mockCategories.length);
  });

  it("updates selection when a category is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CategorySelector
        categories={mockCategories}
        value="popular"
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Top Rated"));

    expect(onChange).toHaveBeenCalledWith("top_rated");
  });

  it("updates selection using keyboard (ArrowDown + Enter)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CategorySelector
        categories={mockCategories}
        value="popular"
        onChange={onChange}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith("top_rated");
  });
});
