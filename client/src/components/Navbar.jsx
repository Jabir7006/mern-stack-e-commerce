import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineLogin } from "react-icons/ai";
import { BsFillBagHeartFill, BsHeart } from "react-icons/bs";
import { IoHomeOutline, IoStorefrontOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { MdOutlineContactSupport } from "react-icons/md";
import { PiShoppingCartSimple } from "react-icons/pi";
import { TbBrandBlogger } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { handleGetProducts } from "../services/productService";
import { baseUrl } from "../services/userService";
import Logout from "./Logout";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const { products } = useSelector((state) => state.product);
  const { whishListItems } = useSelector((state) => state.whishList);
  const total = cartItems.reduce((acc, { quantity, price }) => acc + quantity * price, 0);

  const handleSearch = async (e) => setSearchQuery(e.target.value);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await handleGetProducts({ search: searchQuery });
        setSearchResults(response.payload.products);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchQuery(""); // Close search suggestions
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-[#111821] h-[10.6rem] lg:h-40 text-white">
      {loading && (
        <div className="fixed top-0 left-0 bg-white w-full h-full flex justify-center items-center z-50">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-20 w-20" />
        </div>
      )}
      {/* fistNav  */}
      <div className="border-b border-gray-400 py-1 md:py-2 px-3 md:px-4 lg:px-8">
        <div className="flex justify-between items-center h-7 text-[.9rem]">
          <p className="text-[.7rem] sm:text-[.85rem] md:text-[.92rem]">
            Free Shipping Over $100 & Free returns
          </p>
          <p className="text-[.7rem] sm:text-[.85rem] md:text-[.92rem]">Hotline : +123-456-789</p>
        </div>
      </div>

      {/* secondNav */}
      <div className="flex justify-between items-center gap-3 py-3 px-3 md:px-4 lg:px-8">
        <Link
          to="/"
          className=" font-semibold text-[1.1rem] sm:text-[1.2rem] lg:text-2xl flex items-center gap-2"
        >
          <BsFillBagHeartFill className="text-yellow-400 mb-1" />
          <h6>KizMart</h6>
        </Link>

        {/* search bar */}

        <div
          className="hidden input-group md:flex w-full md:w-96 xl:w-[35rem] relative"
          ref={searchContainerRef}
        >
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search"
            aria-describedby="button-addon2"
          />
          <button
            className="px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md 
              absolute right-0 top-0 bottom-0 hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            id="button-addon2"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              />
            </svg>
          </button>
          {searchQuery && searchQuery.length > 0 && (
            <div className="absolute top-[36px] right-0 p-2 w-full bg-white z-[999] shadow-xl max-h-[400px] overflow-auto border-t">
              {searchResults.length > 0 &&
                !error &&
                searchResults.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="flex items-center gap-x-3 text-black border-b border-gray-300 p-3 hover:underline hover:text-blue-600"
                  >
                    <img
                      src={`${
                        product.image.startsWith("public/images/")
                          ? baseUrl + "/" + product.image
                          : product.image
                      }`}
                      className="max-w-12 h-12"
                      alt="product image"
                    />
                    <p>{product.title}</p>
                  </Link>
                ))}
              {error && (
                <div className="flex text-black p-3">
                  <p>{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-5 lg:gap-6 items-center ">
          <div className="flex items-center gap-2">
            {user ? (
              <Logout />
            ) : (
              <>
                <AiOutlineLogin className="text-[1.2rem] lg:text-[28px]" />
                <Link to="/login" className="text-[.92rem] lg:text-[1rem]">
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 ">
            <div className="relative">
              <BsHeart className="text-[1.1rem] lg:text-[25px]" />
              {whishListItems && whishListItems.length > 0 && (
                <span className="absolute top-0 end-0 inline-flex items-center w-3.5 h-3.5 rounded-full border-2 border-white text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-yellow-500 text-white dark:border-slate-900">
                  <span className="sr-only">Badge value</span>
                </span>
              )}
            </div>

            <Link to="/wishlist" className="text-[.91rem] lg:text-[1rem]">
              Wishlist
            </Link>
          </div>

          <Link to="/cart" className="flex items-center gap-1">
            <PiShoppingCartSimple className="text-[1.5rem] lg:text-[28px] text-yellow-400" />
            <div>
              <p className="bg-white rounded-full text-black font-semibold lg:font-bold text-center h-5 w-5 lg:h-6 lg:w-8">
                {cartItems.length || 0}
              </p>
              <p className="text-[.85rem] sm:text-[.9rem] lg:text-[1rem]">${total.toFixed(2)}</p>
            </div>
          </Link>

          {/* mobile menu */}
          <LuMenu size={22} className="lg:hidden cursor-pointer" onClick={() => setOpen(!open)} />
          <AnimatePresence>
            {open && (
              <motion.div
                className={`${
                  open
                    ? "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 lg:hidden"
                    : ""
                }`}
              >
                <motion.div
                  className="flex flex-col justify-center items-center lg:hidden gap-6 z-10 fixed top-0 right-0 bg-[#20303D] w-[60%] p-4 h-full"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.25 }}
                >
                  <NavLink
                    to="/"
                    className="flex items-center gap-1 hover:text-yellow-500 duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <IoHomeOutline />
                    <p>Home</p>
                  </NavLink>
                  <NavLink
                    to="/store"
                    className="flex items-center gap-1 hover:text-yellow-500 duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <IoStorefrontOutline />
                    <p>Store</p>
                  </NavLink>
                  <NavLink
                    to="/blogs"
                    className="flex items-center gap-1 hover:text-yellow-500 duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <TbBrandBlogger />
                    <p>Blogs</p>
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="flex items-center gap-1 hover:text-yellow-500 duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <MdOutlineContactSupport />
                    <p>Contact</p>
                  </NavLink>

                  <NavLink
                    to="/wishlist"
                    className="flex md:hidden items-center gap-1 hover:text-yellow-500 duration-300"
                  >
                    <BsHeart className="text-[1.1rem] lg:text-[25px]" />
                    <p className="text-[.91rem] lg:text-[1rem]">Wishlist</p>
                  </NavLink>
                  <AiOutlineClose
                    size={22}
                    onClick={() => setOpen(false)}
                    className="lg:hidden cursor-pointer fixed top-5 right-5 z-50 text-white"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* thirdNav */}

      <div className="lg:bg-[#20303D] px-3 md:px-4 lg:px-8">
        <div className="hidden lg:flex gap-6 py-3 z-10">
          <NavLink to="/" className="flex items-center gap-1 hover:text-yellow-500 duration-300">
            <IoHomeOutline />
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/store"
            className="flex items-center gap-1 hover:text-yellow-500 duration-300"
          >
            <IoStorefrontOutline />
            <p>Store</p>
          </NavLink>
          <NavLink
            to="/blogs"
            className="flex items-center gap-1 hover:text-yellow-500 duration-300"
          >
            <TbBrandBlogger />
            <p>Blogs</p>
          </NavLink>
          <NavLink
            to="/contact"
            className="flex items-center gap-1 hover:text-yellow-500 duration-300"
          >
            <MdOutlineContactSupport />
            <p>Contact</p>
          </NavLink>
        </div>

        <div className="">
          <div className="input-group relative flex md:hidden w-full">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
              aria-describedby="button-addon2"
            />
            <button
              className="px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md 
              absolute right-0 top-0 bottom-0 hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                />
              </svg>
            </button>
            {searchQuery && searchQuery.length > 0 && (
              <div
                className="absolute top-[37px] right-0 p-2 w-full bg-white z-[999] shadow-xl max-h-[320px] overflow-auto rounded-b-md"
                onClick={() => setSearchQuery("")}
              >
                {searchResults.length > 0 &&
                  !error &&
                  searchResults.map((product) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      className="flex items-center gap-x-3 text-black border-b border-gray-300 p-3 hover:underline hover:text-blue-600"
                    >
                      <img
                        src={`${
                          product.image.startsWith("public/images/")
                            ? baseUrl + "/" + product.image
                            : product.image
                        }`}
                        className="w-12 h-12"
                        alt="product image"
                      />
                      <p>{product.title}</p>
                    </Link>
                  ))}
                {error && (
                  <div className="flex text-black p-3">
                    <p>{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
