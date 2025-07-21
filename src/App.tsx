import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MovieListPage } from "./pages/MovieListPage";
import { MovieDetailPage } from "./pages/MovieDetailPage";

export const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />

      <main className="flex-1 py-8">
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
          <Route
            path="*"
            element={
              <div className="text-center p-10">404: Page Not Found</div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
