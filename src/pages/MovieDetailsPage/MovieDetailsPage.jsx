import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import { getMovieById } from "../../movies-api";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Suspense } from "react";
import s from "./MovieDetailsPage.module.css";
// import MovieCast from "../../components/MovieCast/MovieCast";

function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovieDetails(data.data);
      } catch (err) {
        console.log("something went wrong", err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);
  if (!movieDetails) {
    return <Loader />;
  }
  return (
    <div className={s.main}>
      <NavLink to="/">
        <button type="button" className={s["goback-btn"]}>
          Go Back
        </button>
      </NavLink>
      <div className={s.wrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        />
        <div className={s["info-wrapper"]}>
          <h1>{movieDetails.original_title}</h1>
          <p>User score: {movieDetails.vote_average}</p>
          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movieDetails.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s["more-info"]}>
        <h4>Additional Information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
