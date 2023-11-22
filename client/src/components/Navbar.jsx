import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLogin } from "react-icons/ai";
import { BsFillBagHeartFill, BsHeart } from "react-icons/bs";

import { LuMenu } from "react-icons/lu";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);


  return (
    <header className="bg-[#111821] h-[10.6rem] lg:h-40 text-white">
      {loading && (
        <div className="fixed top-0 left-0 bg-white w-full h-full flex justify-center items-center z-50">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-20 w-20" />
        </div>
      )}
      {/* fistNav  */}
      <div className="border-b border-gray-400 py-2 px-3 md:px-4">
        <div className="flex justify-between items-center h-7 text-[.9rem]">
          <p className="text-[.85rem] md:text-[.92rem]">Free Shipping Over $100 & Free returns</p>
          <p className="text-[.85rem] md:text-[.92rem]">Hotline : +123-456-789</p>
        </div>
      </div>

      {/* secondNav */}
      <div className="flex justify-between items-center px-4 py-3">
        <Link to="/" className="font-semibold text-[1.2rem] lg:text-2xl flex items-center gap-3">
          <BsFillBagHeartFill />
          <h6>KizMart</h6>
        </Link>

        {/* search bar */}

        <div className="hidden input-group relative md:flex w-full md:w-96 xl:w-[30rem]">
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
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
        </div>

        <div className="flex gap-5 lg:gap-6 items-center">
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

          <div className="flex items-center gap-2">
            <BsHeart className="text-[1.1rem] lg:text-[25px]" />
            <Link to="/wishlist" className="text-[.91rem] lg:text-[1rem]">
              Wishlist
            </Link>
          </div>

          <Link to="/cart" className="flex items-center gap-1">
            <PiShoppingCartSimple className="text-[1.5rem] lg:text-[28px] text-yellow-400" />
            <div>
              <p className="bg-white rounded-full text-black font-bold text-center h-6 w-6 lg:h-6 lg:w-8">
                {cartItems.length || 0}
              </p>
              <p className="text-[.9rem] lg:text-[1rem]">${total.toFixed(2)}</p>
            </div>
          </Link>

          {/* mobile menu */}
          <LuMenu size={22} className="lg:hidden cursor-pointer" onClick={() => setOpen(!open)} />
          {open && (
            <div
              className={`${
                open ? "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 lg:hidden" : ""
              }`}
            >
              <div className="flex flex-col justify-center items-center lg:hidden gap-6 z-10 fixed top-0 right-0 bg-[#20303D] w-1/2 p-4 h-full">
                <NavLink to="/" onClick={() => setOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/store" onClick={() => setOpen(false)}>
                  Store
                </NavLink>
                <NavLink to="/blogs" onClick={() => setOpen(false)}>
                  Blogs
                </NavLink>
                <NavLink to="/contact" onClick={() => setOpen(false)}>
                  Contact
                </NavLink>
              </div>
              <AiOutlineClose
                size={22}
                onClick={() => setOpen(false)}
                className="lg:hidden cursor-pointer fixed top-5 right-5 z-50 text-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* thirdNav */}

      <div className="px-4 lg:bg-[#20303D]">
        <div className="hidden lg:flex gap-6 py-3 z-10">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/store">Store</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="">
          <div className="input-group relative flex md:hidden w-full md:w-96 xl:w-[30rem]">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
