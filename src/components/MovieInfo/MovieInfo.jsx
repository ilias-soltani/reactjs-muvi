import React from "react";
import Container from "react-bootstrap/Container";
import { TbStarHalfFilled } from "react-icons/tb";

import dateFormat from "../../Helper/dateFormat.js";
import image from "../../assets/muvi-img.png";
import "./MovieInfo.scss";

function MovieInfo({ movie }) {
  return (
    <div className="movie-info">
      <Container>
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = image;
            }}
            alt="movie"
          />
        </div>
        <div className="info">
          <h1>{movie?.title}</h1>
          <div className="item-categories">
            {movie?.genres.map((item, i) => (
              <div className="category" key={i}>
                {`${item.name}${i + 1 !== movie?.genres.length ? "," : ""}`}
                &nbsp;
              </div>
            ))}
          </div>
          <h3>
            {movie?.release_date ? dateFormat(movie?.release_date) : "unknown"}
          </h3>

          <div className="rating">
            <TbStarHalfFilled className="icon" />
            {(Math.round(movie?.vote_average * 10) / 10).toString()}
          </div>

          <div className="story">
            <h1>Overview</h1>
            <p>{movie?.overview}</p>
          </div>

          <button className="btn-main">
            <a href={movie?.homepage} target="_blank">
              Watch Now
            </a>
          </button>
        </div>
      </Container>
    </div>
  );
}

export default MovieInfo;
