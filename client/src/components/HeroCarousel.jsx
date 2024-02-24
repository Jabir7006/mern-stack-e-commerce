import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { carouselImg } from "../data";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroCarousel = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoadImage = () => {

      setImageLoaded(true);

  };

  useEffect(() => {
    handleLoadImage();
  }, [imageLoaded]);

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
        {imageLoaded ? (
          carouselImg.map((img) => (
            <SwiperSlide className="" key={img.id}>
              <Link to="/store">
                <img
                  loading="lazy"
                  src={img.url}
                  className="rounded-md"
                  alt={img.alt}
                  onLoad={handleLoadImage}
                />
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className="lg:h-[471px] md:h-[400px] sm:h-[350px] h-[200px] w-full rounded-lg bg-gray-200 animate-pulse"></div>
        )}
      </Swiper>
    </>
  );
};

export default HeroCarousel;
