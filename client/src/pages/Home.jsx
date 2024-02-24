import { AnimatePresence } from "framer-motion";
import React, { Suspense, lazy, useContext, useEffect } from "react";
const Marquee = lazy(() => import("react-fast-marquee"));
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import Products from "../components/Products";
import { UserContext } from "../context/userContext";
import { categories } from "../data";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../redux/features/productSlice";
import { handleGetProducts } from "../services/productService";
import ProductSkeleton from "../components/skeleton/ProductSkeleton";
const ProductModal = lazy(() => import("../components/ProductModal"));
const Features = lazy(() => import("../components/Features"));
const OfferProduct = lazy(() => import("../components/OfferProduct"));
// const Products = lazy(() => import("../components/Products"));
const OnSaleProduct = lazy(() => import("../components/OnSaleProduct"));

const brandImg = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726626/ecommerce/local%20images/nkkhyh2px2copint8tra.png",
  },

  {
    id: 2,
    img: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726627/ecommerce/local%20images/nymgi7zc07oezqkplvbt.png",
  },

  {
    id: 3,
    img: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726626/ecommerce/local%20images/us7uf55epeaisldxgx8z.png",
  },

  {
    id: 4,
    img: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726626/ecommerce/local%20images/x2r3gnxpldtphfjqejbx.png",
  },

  {
    id: 5,
    mg: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726626/ecommerce/local%20images/olxsg3w6fkenkewjn9mc.png",
  },

  {
    id: 6,
    img: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726626/ecommerce/local%20images/sypeedw9nlgbfcbv53ys.png",
  },

  {
    id: 7,
    img: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726625/ecommerce/local%20images/la5j4yeztz1sfvikwaf9.png",
  },

  {
    id: 8,
    img: "https://res.cloudinary.com/dkzqijrkd/image/upload/w_300,h_300,c_fill,f_auto,dpr_auto,q_auto:good/v1705726625/ecommerce/local%20images/m2vev0kmenhpdckcvmnt.png",
  },
];

const Home = () => {
  const { products, loading } = useSelector((state) => state.product);
  const { showModal } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(getProductStart());
        const response = await handleGetProducts({ limit: 10, page: 1, sort: "createdAt" });

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
        <Suspense
          fallback={<div className="text-center animate-pulse font-medium"> Loading... </div>}
        >
          {showModal && <ProductModal />}
        </Suspense>
      </AnimatePresence>
      {/* {loading && <Loading />} */}

      <Hero />

      <div>
        <Suspense
          fallback={<div className="w-full h-24 rounded bg-gray-200 animate-pulse"></div>}
        >
          <Features />
        </Suspense>
      </div>

      <h4 className="font-medium text-2xl mb-5 mt-12">New Arrival</h4>
      <hr className="mb-12" />

      <div className="grid gap-2 min-[320px]:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 items-center grid-cols-2 md:gap-x-5 justify-center">
       
     {loading ? Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            )) : (
       products.map((product) => (
   
        <Products key={product._id} product={product} />
     
    ))
     )}
      </div>

      <div className="mt-14 bg-[#F1F1F1] p-6">
        <h5 className="text-2xl mb-5">Categories</h5>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[2px] sm:p-3">
          {categories.map((category) => (
            <Link
              to={"/store"}
              className="flex flex-col gap-2 items-center border border-transparent bg-white py-4 px-2 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              key={category.id}
            >
              <img
                loading="lazy"
                src={category.img}
                className="w-24 h-24 object-contain"
                alt={category.name}
              />
              <p>{category.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <Suspense
        fallback={<div className="text-center animate-pulse font-medium"> Loading... </div>}
      >
        <OfferProduct products={products} />
      </Suspense>

      <div className="flex flex-col md:flex-row gap-5 mt-14">
        <Link to="/store">
          <img
            src="https://res.cloudinary.com/dkzqijrkd/image/upload/w_auto,c_fill,f_auto,dpr_auto,q_auto:good/v1705726630/ecommerce/local%20images/vxkaxx4yit5hey9ykdvn.jpg"
            loading="lazy"
            alt="banner 3"
          />
        </Link>
        <Link to={"/store"}>
          <img
            src="https://res.cloudinary.com/dkzqijrkd/image/upload/w_auto,c_fill,f_auto,dpr_auto,q_auto:good/v1705726630/ecommerce/local%20images/s2h7hgywr9twc2ypajbd.jpg"
            loading="lazy"
            alt="banner 4"
          />
        </Link>
        <Link to={"/store"}>
          <img
            src="https://res.cloudinary.com/dkzqijrkd/image/upload/w_auto,c_fill,f_auto,dpr_auto,q_auto:good/v1705726625/ecommerce/local%20images/am6i8sf3owd0tzfmijtv.jpg"
            loading="lazy"
            alt="banner 5"
          />
        </Link>
      </div>

      <Suspense
        fallback={<ProductSkeleton />}
      >
        <OnSaleProduct products={products} />
      </Suspense>

      <Suspense fallback={<div className="text-center animate-pulse font-medium"> Loading... </div>}>
      <Marquee className="py-12 mt-6" speed={60}>
        {brandImg.map((brand) => (
          <img loading="lazy" src={brand.img} className="mr-12 w-24" alt="" key={brand.id} />
        ))}
      </Marquee>
      </Suspense>


      <div></div>
    </main>
  );
};

export default Home;
