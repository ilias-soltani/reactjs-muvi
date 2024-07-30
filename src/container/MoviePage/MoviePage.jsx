import React from "react";

import MovieInfo from "../../components/MovieInfo/MovieInfo";
import "./MoviePage.scss";

function MoviePage({ movie }) {
  return (
    <div className="movie-page">
      <div className="cover-img">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt="cover-img"
        />
        <div className="div-effect"></div>
      </div>
      <MovieInfo movie={movie} />
    </div>
  );
}

export default MoviePage;
