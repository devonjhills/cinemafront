import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../test/utils";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders input with placeholder text", () => {
    render(<SearchBar onSearch={() => {}} onClear={() => {}} value="" />);
    expect(
      screen.getByPlaceholderText(/Search for movies.../i)
    ).toBeInTheDocument();
  });

  it("enables Search button only when input has text", () => {
    render(<SearchBar onSearch={() => {}} onClear={() => {}} value="" />);
    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Batman" },
    });
    expect(searchButton).not.toBeDisabled();
  });

  it("calls onSearch when Search button is clicked", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} onClear={() => {}} value="" />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "Batman" } });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith("Batman");
  });

  it("calls onSearch when Enter key is pressed", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} onClear={() => {}} value="" />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "Superman" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("Superman");
  });

  it("renders Clear button and calls onClear when clicked", () => {
    const onClear = vi.fn();
    render(
      <SearchBar onSearch={() => {}} onClear={onClear} value="something" />
    );
    const clearButton = screen.getByRole("button", { name: /clear/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalled();
  });
});
