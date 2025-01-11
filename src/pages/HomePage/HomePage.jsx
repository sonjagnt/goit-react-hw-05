import MovieList from "../../components/MovieList/MovieList";
import "./HomePage.module.css";

function HomePage({ trendingMovies }) {
  return (
    <div>
      <h1>Trending Today</h1>
      <MovieList trendingMovies={trendingMovies} />
    </div>
  );
}

export default HomePage;
