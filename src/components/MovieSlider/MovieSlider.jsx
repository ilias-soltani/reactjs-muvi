import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Pagination,
  Navigation,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import Item from "./Item";
import "./MovieSlider";

function MovieSlider({ movies }) {
  return (
    <div className="position-relative">
      <div className="div-effect"></div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {movies.map((item, i) => (
          <SwiperSlide key={i}>
            <Item id={item.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieSlider;
