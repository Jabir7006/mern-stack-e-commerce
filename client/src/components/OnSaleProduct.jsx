import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { baseUrl } from '../services/userService';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation'; // Import navigation styles
import 'swiper/css/pagination';

import { Grid, Navigation } from 'swiper/modules';

const OnSaleProduct = ({ products }) => {
  return (
    <div className='pt-5'>
      <h4 className="font-medium text-xl md:text-[1.5rem] lg:text-2xl mb-5 mt-12">On Sale Products</h4>
      <hr className="mb-8" />

      {/* Navigation arrows container */}
      <div className="swiper-navigation-container flex gap-3 justify-end items-center mb-5">
        {/* Previous button */}
        <div className="swiper-button-prev-custom cursor-pointer">
         <IoIosArrowBack size={20}/>
        </div>

        {/* Next button */}
        <div className="swiper-button-next-custom cursor-pointer">
         <IoIosArrowForward size={20}/>
        </div>
      </div>

      {/* Swiper component */}
      <Swiper
      
        grid={{ rows: 2, fill: 'row' }}
        slidesPerView={3}
        spaceBetween={20}
        
        breakpoints={{
          0: {
            slidesPerView: 1,
            grid: {
              rows: 2,
              fill: 'row',
            }
          },
          768: {
            slidesPerView: 2,
            grid: {
              rows: 2,
              fill: 'row',
            }
          },
          1124: {
            slidesPerView: 3,
            grid: {
              rows: 2,
              fill: 'row',
            }
          },
        }}
        
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        modules={[Grid, Navigation]}
      >
        {products.map((product) => (
           <SwiperSlide key={product._id} className='border-2 border-[#EBEBEB] hover:border-yellow-400 transition-all duration-200 p-3 flex items-center gap-3'>
             <Link to={`/product/${product._id}`}>
             <img src={product.image} className='max-w-[100px] h-[130px] object-fill' alt="" />
             </Link>

              <div>
                <Link to={`/product/${product._id}`} className="text-base text-blue-600 hover:underline max-lines-3">{product.title}</Link>
                <p className='text-yellow-500 my-1'>
                <Rating
            initialRating={product.totalRatings}
            emptySymbol={
              <i>
                <FaRegStar />
              </i>
            }
            fullSymbol={
              <i>
                <FaStar />
              </i>
            }
            readonly
          />
                </p>
                <h5 className="text-base font-medium">${product.price}</h5>
              </div>
           </SwiperSlide>
        ))}
     </Swiper>
    </div>
  )
}

export default OnSaleProduct
