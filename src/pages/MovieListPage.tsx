import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMovies } from "../hooks/useMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { MovieGrid } from "../components/MovieGrid";
import { MovieSorter } from "../components/MovieSorter";
import { SearchBar } from "../components/SearchBar";
import { sortMovies, type SortOption } from "../utils/movieSorting";

export const MovieListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [browseCategory, setBrowseCategory] = useState(
    searchParams.get("category") || "popular"
  );
  const [sortBy, setSortBy] = useState<SortOption>({
    value: "popularity.desc",
    name: "Most Popular",
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    if (browseCategory !== "popular") {
      params.set("category", browseCategory);
    }

    const newSearch = params.toString();
    const currentSearch = location.search.slice(1);

    if (newSearch !== currentSearch) {
      navigate({ search: newSearch }, { replace: true });
    }
  }, [searchQuery, browseCategory, navigate, location.search]);

  const popularQuery = useMovies(1);
  const nowPlayingQuery = useNowPlayingMovies(1);
  const topRatedQuery = useTopRatedMovies(1);
  const searchResults = useSearchMovies(searchQuery, 1);

  const getCurrentQuery = () => {
    if (searchQuery) {
      return searchResults;
    }

    switch (browseCategory) {
      case "now_playing":
        return nowPlayingQuery;
      case "top_rated":
        return topRatedQuery;
      default:
        return popularQuery;
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  const getCategoryDisplayName = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }

    switch (browseCategory) {
      case "now_playing":
        return "Now Playing movies";
      case "top_rated":
        return "Top Rated movies";
      default:
        return "Popular movies";
    }
  };

  const categories = [
    { value: "popular", label: "Popular" },
    { value: "now_playing", label: "Now Playing" },
    { value: "top_rated", label: "Top Rated" },
  ];

  const currentQuery = getCurrentQuery();
  const movies = currentQuery.data?.results
    ? sortMovies(currentQuery.data.results, sortBy.value)
    : undefined;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="space-y-6">
        <div className="border border-gray-300 rounded-lg bg-white p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Browse curated lists
              </h3>
              <div className="min-w-[200px]">
                <Listbox value={browseCategory} onChange={setBrowseCategory}>
                  <div className="relative">
                    <ListboxButton className="relative w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <span className="block truncate">
                        {categories.find((cat) => cat.value === browseCategory)
                          ?.label || "Popular"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                      </span>
                    </ListboxButton>
                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {categories.map((category) => (
                        <ListboxOption
                          key={category.value}
                          value={category.value}
                          className={({ focus }) =>
                            `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                              focus ? "bg-blue-600 text-white" : "text-gray-900"
                            }`
                          }>
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}>
                              {category.label}
                            </span>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                OR search by movie title
              </h3>
              <SearchBar
                onSearch={handleSearch}
                showClearButton={!!searchQuery}
                onClear={handleSearchClear}
                value={searchQuery}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">
                {getCategoryDisplayName()}
              </h2>
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                  Clear
                </button>
              )}
            </div>
            <MovieSorter sortBy={sortBy} onChange={setSortBy} />
          </div>

          <MovieGrid
            movies={movies}
            isLoading={currentQuery.isLoading}
            isError={currentQuery.isError}
            error={currentQuery.error}
            emptyMessage={
              searchQuery ? "No movies found for your search" : "No movies found"
            }
          />
        </div>
      </div>
    </div>
  );
};
