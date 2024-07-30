import React from "react";

import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import "./MovieList.scss";

function MovieList({ title, children, movies, setActivePage, totalPages, id }) {
  return (
    <div className="movie-list">
      <div className="heading">
        <div className="text">
          <div className="icon flex-center">{children}</div>
          <h1 className="title">{title}</h1>
        </div>
      </div>

      <div className="movies-list">
        {movies.map((item, i) => (
          <MovieCard movie={item} key={i} />
        ))}
      </div>

      <Pagination
        setActivePage={setActivePage}
        totalPages={totalPages}
        id={id}
      />
    </div>
  );
}

export default MovieList;
