import { lazy, useEffect, useState } from "react";
import { getMovieByQuery } from "../../movies-api";
import { useSearchParams } from "react-router-dom";
// import MovieList from "../../components/MovieList/MovieList";
import { Suspense } from "react";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import s from "./MoviesPage.module.css";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userQuery = e.target.elements.query.value.trim();
    if (userQuery === "") {
      toast.error("Please try to search for a movie!");
      return;
    }
    setSearchParams({ query: userQuery });
    form.reset();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMovieByQuery(query);
        setMovies(data.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit} className={s.form}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      {loading && <Loader />}
      <Suspense fallback={<Loader />}>
        {movies.length > 0 ? (
          <MovieList trendingMovies={movies} />
        ) : (
          query && !loading && <p>No movies found for your query.</p>
        )}
      </Suspense>
    </div>
  );
}

export default MoviesPage;
