export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-6 py-3 text-center">
        <p className="text-s text-gray-500">
          Powered by{" "}
          <a
            href="https://developer.themoviedb.org/reference/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline font-medium">
            TMDB
          </a>
        </p>
      </div>
    </footer>
  );
};
