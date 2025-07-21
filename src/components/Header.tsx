import { FilmIcon, HomeIcon } from "@heroicons/react/24/outline";

export const Header = () => {
  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FilmIcon className="w-7 h-7 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CinemaFront</h1>
          </div>
          <nav>
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <HomeIcon className="w-4 h-4" />
              Home
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
