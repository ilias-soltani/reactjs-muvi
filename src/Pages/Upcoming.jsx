import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdUpcoming } from "react-icons/md";
import Container from "react-bootstrap/Container";

import MovieSlider from "../components/MovieSlider/MovieSlider";
import MovieList from "../components/MovieList/MovieList";

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(-1);
  const token = process.env.REACT_APP_TOKEN;
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const getMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

    const res = await axios.get(url, { headers });

    setMovies(res.data.results);
  };

  const getAllMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;

    const res = await axios.get(url, { headers });
    setTotalPages(res.data.total_pages >= 500 ? 500 : res.data.total_pages);
    setAllMovies(res.data.results);
  };

  useEffect(() => {
    getMovies();
    getAllMovies(1);
  }, []);
  const onPageChange = (page) => {
    getAllMovies(page);
  };
  return (
    <div className="movies-section-slider">
      <MovieSlider movies={movies} />
      <Container>
        <div style={{ marginTop: 72 }} id="movie-section">
          <MovieList
            title="Upcoming"
            movies={allMovies}
            setActivePage={onPageChange}
            totalPages={totalPages}
            id="movie-section"
          >
            <MdUpcoming />
          </MovieList>
        </div>
      </Container>
    </div>
  );
}

export default Upcoming;