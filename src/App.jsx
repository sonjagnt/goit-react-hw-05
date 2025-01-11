import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { getMovies } from "./movies-api";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const data = await getMovies();
        setTrendingMovies(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadTrendingMovies();
  }, []);

  return (
    <div>
      <header>
        <Navigation />
      </header>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<HomePage trendingMovies={trendingMovies} />}
          />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
