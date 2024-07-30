import React, { useState, useEffect } from "react";
import axios from "axios";

import MovieSlider from "../components/MovieSlider/MovieSlider";
import MoviesShowCase from "../container/MoviesShowCase/MoviesShowCase";

function Main() {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const token = process.env.REACT_APP_TOKEN;

    console.log(process.env.TOKEN);

    const res = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setMovies(res.data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <MovieSlider movies={movies} />
      <MoviesShowCase />
    </>
  );
}

export default Main;
