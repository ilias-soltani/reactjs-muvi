import React, { useEffect, useState } from "react";
import { BiSolidChart } from "react-icons/bi";
import { FaRankingStar } from "react-icons/fa6";
import { MdUpcoming } from "react-icons/md";
import { GiPopcorn } from "react-icons/gi";
import Container from "react-bootstrap/Container";
import axios from "axios";

import MovieList from "../../components/MovieList/MovieList";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import "./MoviesShowCase.scss";

function MoviesShowCase() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(-1);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzg1NDc2NzcyMjIyMDM5OTg3N2RmMTAwYmUyNzdlMSIsInN1YiI6IjY0ZmNjN2I3ZWZlYTdhMDBlMDMzODI5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rKJquUBFiZ5lj_xUYrTvJkHoK3TVICtmmvUzpqxyV7w";
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getTrendMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

    const res = await axios.get(url, {
      headers,
    });

    setTrendMovies(res.data.results);
  };

  const getTopMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

    const res = await axios.get(url, {
      headers,
    });

    setTopMovies(res.data.results);
  };

  const getUpcoming = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

    const res = await axios.get(url, {
      headers,
    });

    setUpcoming(res.data.results);
  };

  const getAllMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=revenue.desc&page=${page}`;

    const res = await axios.get(url, {
      headers,
    });
    setTotalPages(res.data.total_pages >= 500 ? 500 : res.data.total_pages);
    setAllMovies(res.data.results);
  };

  useEffect(() => {
    getTrendMovies();
    getTopMovies();
    getUpcoming();
    getAllMovies(1);
  }, []);

  const onPageChange = (page) => {
    getAllMovies(page);
  };
  return (
    <div className="movies-show-case">
      <Container>
        <MovieCarousel
          title="Trends Now"
          sectionId="popular"
          movies={trendMovies}
          swiperId="swiper1"
        >
          <BiSolidChart />
        </MovieCarousel>

        <MovieCarousel
          title="Top Rated"
          sectionId="toprated"
          movies={topMovies}
          swiperId="swiper2"
        >
          <FaRankingStar />
        </MovieCarousel>

        <MovieCarousel
          title="Upcoming"
          sectionId="upcoming"
          movies={upcoming}
          swiperId="swiper3"
        >
          <MdUpcoming />
        </MovieCarousel>
        <div id="movie-section">
          <MovieList
            title="Movies"
            movies={allMovies}
            setActivePage={onPageChange}
            totalPages={totalPages}
            id="movie-section"
          >
            <GiPopcorn />
          </MovieList>
        </div>
      </Container>
    </div>
  );
}

export default MoviesShowCase;
