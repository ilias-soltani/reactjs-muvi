import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRankingStar } from "react-icons/fa6";
import Container from "react-bootstrap/Container";

import MovieSlider from "../components/MovieSlider/MovieSlider";
import MovieList from "../components/MovieList/MovieList";
import Loading from "../components/Loading/Loading"; // Import the Loading component

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(-1);
  const [loading, setLoading] = useState(true); // Add loading state

  const token = process.env.REACT_APP_TOKEN;
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

    try {
      const res = await axios.get(url, { headers });
      setMovies(res.data.results);
    } catch (e) {
      console.error("Error fetching top-rated movies:", e);
    }
  };

  const getAllMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

    try {
      const res = await axios.get(url, { headers });
      setTotalPages(res.data.total_pages >= 500 ? 500 : res.data.total_pages);
      setAllMovies(res.data.results);
    } catch (e) {
      console.error("Error fetching all top-rated movies:", e);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      await getMovies();
      await getAllMovies(1);
    };

    fetchData();
  }, []);

  const onPageChange = (page) => {
    setLoading(true); // Set loading to true before fetching new page data
    getAllMovies(page);
  };

  if (loading) {
    return <Loading />; // Show the loading component while data is being fetched
  }

  return (
    <div className="movies-section-slider">
      <MovieSlider movies={movies} />
      <Container>
        <div style={{ marginTop: 72 }} id="movie-section">
          <MovieList
            title="Top Rated"
            movies={allMovies}
            setActivePage={onPageChange}
            totalPages={totalPages}
            id="movie-section"
          >
            <FaRankingStar />
          </MovieList>
        </div>
      </Container>
    </div>
  );
}

export default TopRated;
