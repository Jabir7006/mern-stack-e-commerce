import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Products from "../components/Products";
import { getProductFailure, getProductStart, getProductSuccess } from "../redux/features/productSlice";
import { handleGetProducts } from "../services/productService";
import { addToCart } from "../redux/features/cartSlice";
import axios from "axios";

const Home = () => {
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
      const getProducts = async () => {
        try {
          dispatch(getProductStart())
           const response = await handleGetProducts();
        
           dispatch(getProductSuccess(response.payload))
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
          dispatch(getProductFailure(error.response.data.message))
        }
      }

      getProducts();
    },[])

    const handleAddToCart = (product) => {
      dispatch(addToCart(product))
      toast.success('Product added to cart')
  };
  

  return (
    <main className="py-8 px-3 md:px-4 lg:px-5 overflow-x-hidden">
       {loading && (
        <div className="fixed top-0 left-0 bg-white w-full h-full flex justify-center items-center z-50">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-20 w-20" />
        </div>
      )}
      <div>
        <Hero />
      </div>

      <div>
        <Features />
      </div>

      <h4 className='font-medium text-2xl mb-5 mt-12'>New Arrival</h4>
      <hr className="mb-12"/>

    
      <div className="flex gap-6 items-center flex-wrap">
     
       {
        products.map((product) => <Products key={product._id} product={product} setOpen={setOpen} handleAddToCart={handleAddToCart}/>)
       }
      </div>
    </main>
  );
};

export default Home;
