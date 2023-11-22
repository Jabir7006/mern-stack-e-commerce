import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Features from "../components/Features";
import Hero from "../components/Hero";
import OfferProduct from "../components/OfferProduct";
import OnSaleProduct from "../components/OnSaleProduct";
import Products from "../components/Products";
import { addToCart } from "../redux/features/cartSlice";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../redux/features/productSlice";
import { handleGetProducts } from "../services/productService";

const Home = () => {
  const { products, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(getProductStart());
        const response = await handleGetProducts();

        dispatch(getProductSuccess(response.payload));
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        dispatch(getProductFailure(error.response.data.message));
      }
    };

    getProducts();
  }, []);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
  if(user){
      dispatch(addToCart(product));
    }else{
      toast.error("Please login first");
      navigate("/login");
    }
    
  }

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

      <h4 className="font-medium text-2xl mb-5 mt-12">New Arrival</h4>
      <hr className="mb-12" />

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-20 lg:flex lg:gap-6 items-center flex-wrap justify-center">
        {products.map((product) => (
          <Products
            key={product._id}
            product={product}
            setOpen={setOpen}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

   
        <div className="flex flex-col md:flex-row gap-5 mt-14">
          <Link to="/store">
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-4.jpg"
              alt=""
            />
          </Link>
          <Link to={"/store"}>
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-5.jpg"
              alt=""
            />
          </Link>
        </div>

        <OfferProduct products={products} handleAddToCart={handleAddToCart}/>
     
        <div className="flex flex-col md:flex-row gap-5 mt-14">
          <Link to="/store">
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-6.jpg"
              alt=""
            />
          </Link>
          <Link to={"/store"}>
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-7.jpg"
              alt=""
            />
          </Link>
          <Link to={"/store"}>
            <img
              src="https://wphix.com/template/topico-prev/topico/assets/img/banner/banner-8.jpg"
              alt=""
            />
          </Link>
        </div>
        
       <OnSaleProduct products={products}/>
     
      
    </main>
  );
};

export default Home;
