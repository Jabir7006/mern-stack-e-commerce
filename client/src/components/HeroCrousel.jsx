import React from "react";
import { Swiper,  SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full cursor-pointer"
      >
        <SwiperSlide className="">
            <Link to="/store">
            <img src="https://wphix.com/template/topico-prev/topico/assets/img/slider/02/slider-02.jpg" className="rounded-md" alt="" />
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <img className="rounded-md" src="https://wphix.com/template/topico-prev/topico/assets/img/slider/02/slider-03.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide><img className="rounded-md" src="https://wphix.com/template/topico-prev/topico/assets/img/slider/02/slider-01.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroCarousel;
