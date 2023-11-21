import React from "react";
import HeroCarousel from "./HeroCrousel";

const Hero = () => {
  return (
    <div className="container flex flex-col gap-8 lg:gap-5 justify-around lg:flex-row">
      <div className="lg:w-[60%]">
        <HeroCarousel />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <img
            className="h-full max-w-full rounded-lg"
            src="https://img.pikbest.com/origin/06/04/44/45npIkbEsTdJc.jpg!w700wp"
            alt
          />
        </div>
        <div>
          <img
            className="h-full max-w-full rounded-lg"
            src="https://img.pikbest.com/origin/05/95/43/98xpIkbEsTInv.jpg!w700wp"
            alt
          />
        </div>
        <div>
          <img
            className="h-full max-w-full rounded-lg"
            src="https://wphix.com/template/topico-prev/topico/assets/img/banner/top/banner-top-4.jpg"
            alt
          />
        </div>
        <div>
          <img
            className="h-full max-w-full rounded-lg"
            src="https://wphix.com/template/topico-prev/topico/assets/img/banner/top/banner-top-1.jpg"
            alt
          />
        </div>
      </div>



    </div>
  );
};

export default Hero;
