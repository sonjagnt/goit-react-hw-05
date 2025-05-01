import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieById } from "../../movies-api";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Suspense } from "react";
import s from "./MovieDetailsPage.module.css";
import { IoChevronBack } from "react-icons/io5";

function MovieDetailsPage() {
  const location = useLocation();
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
      <Link to={location.state.from || "/"}>
        <button type="button" className={s["goback-btn"]}>
          <IoChevronBack size={18} />
          Go Back
        </button>
      </Link>
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
        <h4 className={s.infoTitle}>Additional Information</h4>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
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
