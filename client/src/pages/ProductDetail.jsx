import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Loading from "../components/Loading";
import ProductReview from "../components/productReview";
import { addToCart, decrementQuantity, incrementQuantity } from "../redux/features/cartSlice";
import { handleGetSingleProduct } from "../services/productService";
import { baseUrl } from "../services/userService";
import { addToWhishList } from "../redux/features/wishlistSlice";

const ProductDetail = () => {

    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
   
    const dispatch = useDispatch()

    const getSingleProduct = async () => {
        try {
          setLoading(true);
          const response = await handleGetSingleProduct(id);
          setProduct(response.payload);
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getSingleProduct();
    },[])

    const handleAddToCart = (product) => {
      dispatch(addToCart(product))
  };
  

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  }

  const handleAddToWishlist = (product) => {
    dispatch(addToWhishList(product));
  }

  return (
    <section className="overflow-hidden py-11 font-poppins dark:bg-gray-800">
       {loading && <Loading />}
      <div className="w-full px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2 ">
            <div className="sticky top-0 overflow-hidden z-10">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                <img
                  src={`${product.image?.startsWith("https") ?  product.image : baseUrl+"/"+ product.image}`}
                  alt="product image"  
                  className="object-cover w-full mx-auto lg:max-h-[700px] lg:object-contain"
                />
              </div>
              
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 ">
            <div className="lg:pl-20">
              <div className="mb-8 ">
                <span className="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>
                <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {product.title}
                </h2>
                <div className="flex items-center mb-6">
                 <p>
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
                 </p>
                  <p className="text-xs dark:text-gray-400 ">(${product?.ratings?.length} customer reviews)</p>
                </div>
                <p className="max-w-md mb-5 text-gray-700 dark:text-gray-400">Category : {product.category}</p>
                <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">Brand : {product.brand}</p>
                <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {product.description}
                </p>
                <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                  <span>${product.price}</span>
                
                </p>
                <p className="text-green-600 dark:text-green-300 ">{product.inStock ? "in stock" : "out of stock"}</p>
              </div>
             {product.color && (
                <div className="flex items-center mb-8">
                <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">Colors:</h2>
                <div className="flex flex-wrap -mx-2 -mb-2">
                  <button className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                    <div className="w-6 h-6 bg-cyan-300" />
                  </button>
                  <button className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                    <div className="w-6 h-6 bg-green-300 " />
                  </button>
                  <button className="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                    <div className="w-6 h-6 bg-red-200 " />
                  </button>
                </div>
              </div>
             )}
              <div className="flex items-center mb-8">
                <h2 className="w-16 text-xl font-bold dark:text-gray-400">Size:</h2>
                <div className="flex flex-wrap -mx-2 -mb-2">
                  <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                    XL
                  </button>
                  <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                    S
                  </button>
                  <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                    M
                  </button>
                  <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                    XS
                  </button>
                </div>
              </div>
              <div className="w-32 mb-8 ">
                <label
                  htmlFor
                  className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                >
                  Quantity
                </label>
                <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                  <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400" onClick={() => handleDecrementQuantity(product._id)} disabled={product.quantity === 1}>
                    <span className="m-auto text-2xl font-thin">-</span>
                  </button>
                  <input
                    type="number"
                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                    value={product.quantity}
                    min={1}
                  />
                  <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400" onClick={() => handleIncrementQuantity(product._id)}
                          disabled={product.inStock === false}>
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center -mx-4 ">
                <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                  <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
                <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                  <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300" onClick={() => handleAddToWishlist(product)}>
                    Add to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductReview prodId={product._id} setProduct={setProduct} reviews={product.ratings}/>
       
      </div>
    </section>
  );
};

export default ProductDetail;
