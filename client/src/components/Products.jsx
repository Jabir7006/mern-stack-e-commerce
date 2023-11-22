import React, { useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { baseUrl } from "../services/userService";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Products = ({ product, setOpen, handleAddToCart }) => {
  return (
    <div className="border-2 border-[#EBEBEB] hover:border-yellow-400 transition-all duration-200 p-5 w-full h-full md:h-[400px] md:w-[300px] text-center overflow-hidden group">
      <div className="mySwiper">
        <div className="relative overflow-hidden group">
          <Link to={`/product/${product._id}`}>
            <img
              src={`${baseUrl}/${product.image}`}
              className="w-[220px] object-cover mx-auto mb-4"
              alt=""
            />
          </Link>

          <div className="flex justify-center items-center gap-2 absolute left-0 right-0 top-52 transition-all duration-300 group-hover:top-36">
            <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300">
              <IoMdHeartEmpty size={26} />
            </button>
            <button
              className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300"
              onClick={() => setOpen(true)}
            >
              <LuEye size={26} />
            </button>
            <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300">
              <IoGitCompareOutline size={26} />
            </button>
          </div>
        </div>
        <Link
          to={`/product/${product._id}`}
          className="text-blue-700 hover:underline cursor-pointer"
        >
          {product.title}
        </Link>

        <p className="text-yellow-600 mt-5 mb-4">
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

        <h6 className="font-semibold">${product.price}.00</h6>

        <button
          className="bg-yellow-500 text-white px-7 py-3 rounded-full text-[12px] uppercase hover:bg-black hover:text-white transition-all translate-y-[100px] duration-300 group-hover:translate-y-[-40px]"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
