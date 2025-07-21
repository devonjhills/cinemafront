import { Link } from "react-router-dom";
import { FilmIcon, HomeIcon } from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilmIcon className="w-6 h-6" />
            <h1 className="text-xl font-medium">CinemaFront</h1>
          </div>
          <nav>
            <Link
              to="/"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors">
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
