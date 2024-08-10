import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieCarousel.scss";

function MovieCarousel({ children, title, sectionId, movies, swiperId }) {
  return (
    <div className="movie-carousel">
      <div className="heading">
        <div className="text">
          <div className="icon flex-center">{children}</div>
          <h1 className="title">{title}</h1>
        </div>
        <button className="btn-none">
          <Link to={sectionId}>See All</Link>
        </button>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        navigation={{
          nextEl: `.${swiperId}-button-next`,
          prevEl: `.${swiperId}-button-prev`,
        }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          400: {
            slidesPerView: 2.2,
          },
          767: {
            slidesPerView: 3.2,
          },
          992: {
            slidesPerView: 4.2,
          },
          1200: {
            slidesPerView: 5.2,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {movies &&
          movies.length > 1 &&
          movies.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard movie={item} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className={`flex-center ${swiperId}-button-prev prev`}>
        <IoIosArrowBack onClick={() => {}} />
      </div>
      <div className={`flex-center ${swiperId}-button-next next`}>
        <IoIosArrowForward onClick={() => {}} />
      </div>
    </div>
  );
}

export default MovieCarousel;
