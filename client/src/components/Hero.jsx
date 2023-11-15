import React from "react";
import HeroCarousel from "./HeroCrousel";

const Hero = () => {
  return (
    <div className="container flex flex-col gap-8 lg:gap-5 justify-around lg:flex-row">
     <div className="lg:w-[60%]">
     <HeroCarousel />
     </div>

      <div className="flex lg:ms-4 w-full">
       <div className="flex flex-col gap-y-3 mr-3 w-full h-full">
       <img src="https://wphix.com/template/topico-prev/topico/assets/img/banner/top/banner-top-3.jpg" alt="" className="cursor-pointer w-full h-full"/>
       <img src="https://wphix.com/template/topico-prev/topico/assets/img/banner/top/banner-top-4.jpg" alt="" className="cursor-pointer w-full h-full"/>
       </div>
      <div className="flex flex-col gap-y-3 ">
      <img src="https://wphix.com/template/topico-prev/topico/assets/img/banner/top/banner-top-5.jpg" alt="" className="cursor-pointer w-full h-full"/>
       <img src="https://wphix.com/template/topico-prev/topico/assets/img/banner/top/banner-top-5.jpg" alt="" className="cursor-pointer w-full h-full"/>
      </div>
      </div>
  
      
    </div>
  );
};

export default Hero;
