import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";

import MoviePage from "../container/MoviePage/MoviePage";

function Movie() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = useParams().id;
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
      setLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    getMovie();
  }, []);
  return <>{!movie && !loading ? <NotFound /> : <MoviePage movie={movie} />}</>;
}

export default Movie;
