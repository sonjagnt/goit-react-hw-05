import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ trendingMovies }) {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <ul className={s.movielist}>
        {trendingMovies.map((movie) => {
          return (
            <div key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location.pathname }}
              >
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
