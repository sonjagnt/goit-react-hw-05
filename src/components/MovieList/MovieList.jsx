import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ trendingMovies }) {
  return (
    <div>
      <ul className={s.movielist}>
        {trendingMovies.map((movie) => {
          return (
            <div key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <li>{movie.original_title}</li>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default MovieList;
