import React, { useContext } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { baseUrl } from "../services/userService";

import "swiper/css";
import "swiper/css/pagination";

import { UserContext } from "../context/userContext";


const Products = ({ product }) => {

  const {handleAddToCart, handleAddToWishlist, showModal, setShowModal, setModalProd} = useContext(UserContext)


 
  return (
 
    
    <div className="hover:border-2 hover:border-yellow-400 transition-all duration-200 p-1 min-[320px]:p-2 min-[420px]:p-3 w-full max-[320px]:h-[320px] max-h-[345px] md:max-w-[300px] text-center overflow-hidden group shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:scale-[.99] min-[390px]:hover:scale-[.96] rounded relative">
      
      <div className="mySwiper">
        
        <div className="relative overflow-hidden group">
          <Link to={`/product/${product._id}`}>
            <img
              src={`${
                product.image.startsWith("public/images/")
                  ? baseUrl + "/" + product.image
                  : product.image
              }`}
              className="w-[150px] h-[150px] object-contain mx-auto mb-4 "
              alt=""
            />
          </Link>
         

          <div className="flex justify-center items-center gap-1 sm:gap-2 absolute left-0 right-0 top-44 transition-all duration-300 group-hover:top-28">
            <button
              className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300"
              onClick={() => handleAddToWishlist(product)}
            >
              <IoMdHeartEmpty className="text-[17px] sm:text-[20px] md:text-[24px]" />
            </button>
            <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300" onClick={() => {
              setShowModal(true)
              setModalProd(product)
            }}>
              <LuEye className="text-[15px] min-[320px]:text-[17px] sm:text-[20px] md:text-[24px]" />
            </button>
            
            <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300">
              <IoGitCompareOutline className="text-[17px] sm:text-[20px] md:text-[24px]" />
            </button>
          </div>
        </div>
      
        <Link
          to={`/product/${product._id}`}
          className="text-blue-700 hover:underline cursor-pointer text-[.85rem] min-[320px]:text-[.88rem] min-[420px]:text-[.9rem] sm:text-[.97rem] max-lines-2 overflow-hidden"
        >
          {product.title.length > 50 ? (
            <>
              <span>{product.title.substring(0, 50)}</span>
              <span style={{ display: "block" }}>{product.title.substring(40) + "..."}</span>
            </>
          ) : (
            product.title
          )}
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

        <h6 className="font-semibold">${product.price}</h6>

        <button
          className="bg-yellow-500 text-white px-4 py-3 sm:px-7 sm:py-3 rounded-full text-[12px] uppercase hover:bg-black hover:text-white transition-all translate-y-[100px] duration-300 group-hover:translate-y-[-40px]"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
      <div className="absolute top-0 left-0 bg-orange-500 text-white text-sm capitalize p-2 shadow-md">
  <span className="absolute left-0 top-full transform -translate-y-5 inline-block border-t-5 border-b-5 border-r-5 border-transparent border-orange-500" />
  {product.category}
</div>


    </div>
   
  );
};

export default Products;
