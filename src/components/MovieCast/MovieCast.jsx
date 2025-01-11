import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../movies-api";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoader(true);
        const data = await getMovieCredits(movieId);
        setCast(data.data.cast);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    fetchCast();
  }, [movieId]);
  return (
    <div className={s.wrapper}>
      {loader && <Loader />}
      <ul className={s["cast-list"]}>
        {cast.map((memb) => {
          return (
            <div key={memb.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${memb.profile_path}`}
              />
              <li>
                {memb.character}
                <h5>{memb.original_name}</h5>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
