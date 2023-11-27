import React from "react";
import { BsFillBagHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#111821] px-3 md:px-4 lg:px-5">
        <footer className="rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto py-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
        <Link to="/" className="font-semibold text-[1.2rem] lg:text-2xl flex items-center gap-3 text-[#9fa2a8]">
          <BsFillBagHeartFill />
          <h6 className="py-4">KizMart</h6>
        </Link>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-[#b0b3b9] sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Jabir™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
