import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import MoviesShowCase from "../container/MoviesShowCase/MoviesShowCase";
import LoadingPage from "../components/LoadingPage/LoadingPage";

function Main() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const getMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const token = process.env.REACT_APP_TOKEN;

    try {
      const res = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const firstVisit = sessionStorage.getItem("firstVisit");

    if (!firstVisit) {
      sessionStorage.setItem("firstVisit", "true");

      // Start fetching the movies
      getMovies();

      // Show loading page for at least 3 seconds
      const timer = setTimeout(() => {
        setMinimumTimeElapsed(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // For subsequent visits, fetch movies immediately
      setShowLoading(false);
      getMovies();
      setMinimumTimeElapsed(true); // Skip minimum time delay on subsequent visits
    }
  }, []);

  useEffect(() => {
    if (!isLoading && minimumTimeElapsed) {
      document.body.classList.remove("hide");
    }
  }, [isLoading, minimumTimeElapsed]);

  return (
    <>
      {showLoading && (
        <AnimatePresence>
          {(isLoading || !minimumTimeElapsed) && <LoadingPage />}
        </AnimatePresence>
      )}

      {!isLoading && minimumTimeElapsed && (
        <>
          <MovieSlider movies={movies} />
          <MoviesShowCase />
        </>
      )}
    </>
  );
}

export default Main;
