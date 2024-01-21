import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { carouselImg } from "../data";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
        {carouselImg.map((img) => (
          <SwiperSlide className="" key={img.id}>
            <Link to="/store">
              <img
                loading="lazy"
                src={img.url}
                className="rounded-md"
                alt={img.alt}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroCarousel;
