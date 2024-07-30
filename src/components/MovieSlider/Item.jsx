import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { TbPointFilled, TbStarHalfFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa6";
import axios from "axios";

import dateFormat from "../../Helper/dateFormat.js";
import runtimeFormat from "../../Helper/runtimeFormat.js";
import "./MovieSlider.scss";

function Item({ id }) {
  const [movie, setMovie] = useState(null);
  const getMovie = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzg1NDc2NzcyMjIyMDM5OTg3N2RmMTAwYmUyNzdlMSIsInN1YiI6IjY0ZmNjN2I3ZWZlYTdhMDBlMDMzODI5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rKJquUBFiZ5lj_xUYrTvJkHoK3TVICtmmvUzpqxyV7w";

    const res = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setMovie(res.data);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className="item">
      <div className="img">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt="img-movie"
        />
      </div>
      <Container>
        <div className="content">
          <h1 className="item-name">{movie?.title}</h1>
          <div className="item-categories">
            {movie?.genres.map((item, i) => (
              <div className="category" key={i}>
                {`${item.name}${i + 1 !== movie?.genres.length ? "," : ""}`}
                &nbsp;
              </div>
            ))}
          </div>
          <div className="info">
            <div className="date">{dateFormat(movie?.release_date)}</div>
            <div className="point">
              <TbPointFilled />
            </div>
            <div className="runtime">{runtimeFormat(movie?.runtime)}</div>
            <div className="point">
              <TbPointFilled />
            </div>
            <div className="rating">
              <TbStarHalfFilled />
              {(Math.round(movie?.vote_average * 10) / 10).toString()}
            </div>
          </div>
          <button className="btn-main">
            <a href={movie?.homepage}>
              <div className="icon-play flex-center">
                <FaPlay />
              </div>
              Watch Now
            </a>
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Item;
