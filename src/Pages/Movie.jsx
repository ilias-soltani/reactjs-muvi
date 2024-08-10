import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import MoviePage from "../container/MoviePage/MoviePage";
import Loading from "../components/Loading/Loading";

function Movie() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getMovie = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const token = process.env.REACT_APP_TOKEN;

    try {
      const res = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setMovie(res.data);
    } catch (e) {
      console.error("Error fetching movie:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  if (loading) {
    return <Loading />; // Show the loading component while data is being fetched
  }

  if (!movie) {
    return <NotFound />; // Show the NotFound component if the movie doesn't exist
  }

  return <MoviePage movie={movie} />; // Show the MoviePage component once the data is loaded
}

export default Movie;
