import React, { useState } from "react";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const images = [
    {
      id: 1,
      url: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_200,c_fit,f_auto,dpr_auto,q_auto:good/v1705726628/ecommerce/local%20images/eyewrukbvnm7tlbx63ei.webp",
      alt: "Fashion Item 1",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_200,c_fit,f_auto,dpr_auto,q_auto:good/v1705726628/ecommerce/local%20images/fsuk4tmu51kv8sliocs6.webp",
      alt: "Fashion Item 2",
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fit,f_auto,dpr_auto,q_auto:good/v1705732466/ecommerce/local%20images/czmavxdehfe25fu9wanm.jpg",
      alt: "Fashion Item 3",
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fit,f_auto,dpr_auto,q_auto:good/v1705732539/ecommerce/local%20images/tmb7phbwrmmqycxb3cfg.jpg",
      alt: "Fashion Item 4",
    },
  ];

  const handleLoadImage = () => {

      setImageLoaded(true);

  };

  React.useEffect(() => {
    handleLoadImage();
  }, [imageLoaded]);

  return (
    <div className="container flex flex-col gap-8 lg:gap-5 justify-around lg:flex-row">
      <div className="lg:w-[60%]">
        <HeroCarousel />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {images.map((image) => (
          <div key={image.id}>
            {imageLoaded ? (
              <img
                className="h-full max-w-full rounded-lg"
                loading="lazy"
                src={image.url}
                alt={image.alt}
                onLoad={handleLoadImage}
              />
            ) : (
              <div className="h-[150px] md:h-full w-60 max-w-full rounded-lg bg-gray-200 animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
