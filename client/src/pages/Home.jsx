import React, { useContext, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductModal from "../components/ProductModal";
import { AnimatePresence } from "framer-motion";

import Features from "../components/Features";
import Hero from "../components/Hero";
import OfferProduct from "../components/OfferProduct";
import OnSaleProduct from "../components/OnSaleProduct";
import Products from "../components/Products";
import { categories } from "../data";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../redux/features/productSlice";
import { handleGetProducts } from "../services/productService";
import Loading from "../components/Loading";
import { UserContext } from "../context/userContext";





const Home = () => {
  const { products, loading } = useSelector((state) => state.product);
const {showModal} = useContext(UserContext)
  const dispatch = useDispatch();

 

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(getProductStart());
        const response = await handleGetProducts({ limit : 10, page : 1, sort : "createdAt"});

        dispatch(getProductSuccess(response.payload.products));
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        dispatch(getProductFailure(error.response.data.message));
      }
    };

    getProducts();
  }, []);


 

  return (
  
  <main className="py-8 px-3 md:px-4 lg:px-8 overflow-x-hidden">
    <AnimatePresence>
        {showModal && <ProductModal />}
        </AnimatePresence>
      {loading && <Loading />}
  
     
      <div>
        <Hero />
      </div>

      <div>
        <Features />
      </div>

      <h4 className="font-medium text-2xl mb-5 mt-12">New Arrival</h4>
      <hr className="mb-12" />

      <div className="grid gap-2 min-[320px]:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 items-center grid-cols-2 md:gap-x-5 justify-center">
      {/* <AnimatePresence>
    {showModal && <ProductModal />}
    </AnimatePresence> */}
        {products.map((product) => (
          <Products
            key={product._id}
            product={product}
      
          />
        ))}
      </div>

   
        <div className="mt-14 bg-[#F1F1F1] p-6">
           <h5 className="text-2xl mb-5">Categories</h5>

         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[2px] sm:p-3">
         {categories.map((category) => (
           <Link to={"/store"} className="flex flex-col gap-2 items-center border border-transparent bg-white py-4 px-2 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" key={category.id}>
           <img src={category.img } className="w-24 h-24 object-contain" alt={category.name} />
           <p>{category.name}</p>
        </Link>
         
         ))}
         </div>
        
       
        </div>
        

        <OfferProduct products={products} />
     
        <div className="flex flex-col md:flex-row gap-5 mt-14">
          <Link to="/store">
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-6.jpg"
              alt="banner 3"
            />
          </Link>
          <Link to={"/store"}>
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-7.jpg"
              alt="banner 4"
            />
          </Link>
          <Link to={"/store"}>
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-8.jpg"
              alt="banner 5"
            />
          </Link>
        </div>
        
       <OnSaleProduct products={products}/>
     
     <Marquee className="py-12 mt-6" speed={60}>
      <img src="images/brand-01.png" className="mr-12 w-24" alt="" />
      <img src="images/brand-02.png" className="mr-12 w-24" alt="" />
      <img src="images/brand-03.png" className="mr-12 w-24" alt="" />
      <img src="images/brand-04.png" className="mr-12 w-24" alt="" />
      <img src="images/brand-05.png" className="mr-12 w-24" alt="" />
      <img src="images/brand-06.png" className="mr-12 w-24" alt="" />
      <img src="images/brand-07.png" className="mr-12 w-24" alt="" />
      <img src="images/brand-08.png" className="mr-12 w-24" alt="" />
     </Marquee>
     

     <div></div>
     
    </main>
  );
};

export default Home;
