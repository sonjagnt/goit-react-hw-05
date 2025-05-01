import { useEffect, useState } from "react";
import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./MovieReviews.module.css";
import { FaCircleUser } from "react-icons/fa6";
const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoader(true);
        const data = await getMovieReviews(movieId);
        setReviews(data.data.results);
        console.log(data.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    fetchReviews();
  }, [movieId]);
  if (reviews.length === 0) {
    return (
      <div>
        <p>There is no reviews yet.</p>
      </div>
    );
  }
  return (
    <div>
      {loader && <Loader />}
      <ul className={s.reviewList}>
        {reviews.map((review) => {
          return (
            <div key={review.id} className={s.review}>
              <li>
                <div className={s.authorWrapper}>
                  <FaCircleUser size={24} />
                  <p className={s.author}>{review.author}</p>
                </div>
                <p>{review.content}</p>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieReviews;
