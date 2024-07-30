import React, { useEffect, useState } from "react";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import Container from "react-bootstrap/Container";

import MovieList from "../components/MovieList/MovieList";

function Search({ query }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(-1);

  const getMovies = async (page) => {
    const token = process.env.REACT_APP_TOKEN;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    let url = ";";
    query == ""
      ? (url =
          "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=revenue.desc&page=1")
      : (url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`);

    const res = await axios.get(url, {
      headers,
    });
    setTotalPages(res.data.total_pages >= 500 ? 500 : res.data.total_pages);
    setMovies(res.data.results);
  };

  useEffect(() => {
    getMovies(1);
  }, [query]);

  const onPageChange = (page) => {
    getMovies(page);
  };

  return (
    <div className="movies-section">
      <Container>
        <div style={{ marginTop: 72 }} id="movie-section">
          <MovieList
            title="Search Results"
            movies={movies}
            setActivePage={onPageChange}
            totalPages={totalPages}
            id="movie-section"
          >
            <BiSolidSearchAlt2 />
          </MovieList>
        </div>
      </Container>
    </div>
  );
}

export default Search;
