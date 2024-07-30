import React from "react";
import { TbStarHalfFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

import dateFormat from "../../Helper/dateFormat.js";
import image from "../../assets/muvi-img.png";
import "./MovieCard.scss";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = image;
            }}
            alt="movie"
          />
        </div>
        <div className="text">
          <h4 className="title">{movie.title}</h4>
          <div className="rating">
            <TbStarHalfFilled className="icon" />
            {(Math.round(movie.vote_average * 10) / 10).toString()}
          </div>
        </div>
        <p className="date">
          {movie.release_date ? dateFormat(movie.release_date) : "unknown"}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;
