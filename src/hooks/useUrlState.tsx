import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useUrlState = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [browseCategory, setBrowseCategory] = useState(
    searchParams.get("category") || "popular"
  );

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

  return {
    searchQuery,
    setSearchQuery,
    browseCategory,
    setBrowseCategory,
  };
};