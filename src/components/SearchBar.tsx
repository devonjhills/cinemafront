import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  value: string;
  placeholder?: string;
}

export const SearchBar = ({
  onSearch,
  onClear,
  value,
  placeholder = "Search for movies...",
}: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const trimmedQuery = searchInput.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleClear = () => {
    setSearchInput("");
    onClear();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      role="search"
      aria-label="Search movies">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm leading-5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={placeholder}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            aria-label="Search for movies"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <button
          onClick={handleSearch}
          disabled={!searchInput.trim()}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg border border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          aria-label="Search for movies">
          Search
        </button>
        {value && (
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-white text-gray-700 text-sm border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none transition-colors cursor-pointer"
            aria-label="Clear search">
            Clear
          </button>
        )}
      </div>
    </form>
  );
};
