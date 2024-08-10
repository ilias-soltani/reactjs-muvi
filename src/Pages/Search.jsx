import React, { useEffect, useState } from "react";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import Container from "react-bootstrap/Container";

import MovieList from "../components/MovieList/MovieList";
import Loading from "../components/Loading/Loading"; // Import the Loading component

function Search({ query }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(-1);
  const [loading, setLoading] = useState(true); // Add loading state

  const getMovies = async (page) => {
    const token = process.env.REACT_APP_TOKEN;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    let url = "";

    if (query === "") {
      url =
        "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=revenue.desc&page=1";
    } else {
      url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    }

    try {
      const res = await axios.get(url, { headers });
      setTotalPages(res.data.total_pages >= 500 ? 500 : res.data.total_pages);
      setMovies(res.data.results);
    } catch (e) {
      console.error("Error fetching movies:", e);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    getMovies(1);
  }, [query]);

  const onPageChange = (page) => {
    setLoading(true); // Set loading to true before fetching new page data
    getMovies(page);
  };

  if (loading) {
    return <Loading />; // Show the loading component while data is being fetched
  }

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
