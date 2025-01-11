import axios from "axios";

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmIxNjlkYTVlNjE2NGQ3ZmI4NzgwMjVkOTU0YWY3YyIsIm5iZiI6MTczNjI1MTQyMS43MzgsInN1YiI6IjY3N2QxODFkYTZkZWYwMTExYTc0ZWUxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U2T_T_tzRPWD_DaLFDOY-flP4stMLtWVZYmDf25GeA8",
  },
};

export const getMovies = async () => {
  const response = await axios.get(url, options);
  return response.data.results;
};

export const getMovieById = async (movie_id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
    options
  );
  return response;
};

export const getMovieCredits = async (movie_id) => {
  const response = await axios.get(
    `
https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    options
  );
  return response;
};

export const getMovieReviews = async (movie_id) => {
  const response = await axios.get(
    `
https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    options
  );
  return response;
};

export const getMovieByQuery = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    options
  );
  return response;
};
