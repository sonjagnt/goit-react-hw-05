import css from "./HomePage.module.css";
import { useState, useEffect, Suspense, lazy } from "react";
import { getMovies } from "../../movies-api";
import Loader from "../../ui/Loader/Loader";
import Container from "../../ui/Container/Container";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

function HomePage() {
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
    <Container>
      <h1 className={css.title}>Trending Today</h1>
      <MovieList trendingMovies={trendingMovies} />
      <Suspense fallback={<Loader />} />
    </Container>
  );
}

export default HomePage;
