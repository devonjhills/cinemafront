import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { MovieGrid } from "../components/MovieGrid";
import { MovieSorter } from "../components/MovieSorter";
import { SearchBar } from "../components/SearchBar";
import { CategorySelector } from "../components/CategorySelector";
import { sortMovies, type SortOption } from "../utils/movieSorting";
import { useUrlState } from "../hooks/useUrlState";

export const MovieListPage = () => {
  const { searchQuery, setSearchQuery, browseCategory, setBrowseCategory } =
    useUrlState();
  const [sortBy, setSortBy] = useState<SortOption>({
    value: "popularity.desc",
    name: "Most Popular",
  });

  const popularQuery = useMovies(1);
  const nowPlayingQuery = useNowPlayingMovies(1);
  const topRatedQuery = useTopRatedMovies(1);
  const searchResults = useSearchMovies(searchQuery, 1);

  const categoryConfig = {
    popular: {
      value: "popular",
      label: "Popular",
      displayName: "Popular movies",
      query: popularQuery,
    },
    now_playing: {
      value: "now_playing",
      label: "Now Playing",
      displayName: "Now Playing movies",
      query: nowPlayingQuery,
    },
    top_rated: {
      value: "top_rated",
      label: "Top Rated",
      displayName: "Top Rated movies",
      query: topRatedQuery,
    },
  };

  const categories = Object.values(categoryConfig);

  const getCurrentQuery = () => {
    if (searchQuery) {
      return searchResults;
    }
    return getCategory(browseCategory).query;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  const handleCategoryChange = (category: string) => {
    setBrowseCategory(category);
    setSearchQuery("");
  };

  const getCategory = (categoryKey: string) => {
    if (categoryKey === "popular") return categoryConfig.popular;
    if (categoryKey === "now_playing") return categoryConfig.now_playing;
    if (categoryKey === "top_rated") return categoryConfig.top_rated;
    return categoryConfig.popular;
  };

  const getCategoryDisplayName = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    return getCategory(browseCategory).displayName;
  };

  const currentQuery = getCurrentQuery();
  const movies = currentQuery.data?.results
    ? sortMovies(currentQuery.data.results, sortBy.value)
    : undefined;

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <CategorySelector
                categories={categories}
                value={browseCategory}
                onChange={handleCategoryChange}
              />
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                OR search by movie title
              </h3>
              <SearchBar
                onSearch={handleSearch}
                onClear={handleSearchClear}
                value={searchQuery}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          </div>

          <MovieGrid
            movies={movies}
            isLoading={currentQuery.isLoading}
            isError={currentQuery.isError}
            error={currentQuery.error}
            emptyMessage={
              searchQuery
                ? "No movies found for your search"
                : "No movies found"
            }
          />
        </div>
      </div>
    </div>
  );
};
