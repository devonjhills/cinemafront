export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-4 text-center">
        <p className="text-sm text-gray-600">
          Powered by{" "}
          <a
            href="https://developer.themoviedb.org/reference/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            The Movie Database
          </a>
        </p>
      </div>
    </footer>
  );
};
