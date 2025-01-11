import { useEffect, useState } from "react";
import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

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
      <ul>
        {reviews.map((review) => {
          return (
            <div key={review.id}>
              <li>
                <h5>{review.author}</h5>
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
