import React, { useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { failLogout, startLogout, successLogout } from "../redux/features/userslice";
import { baseUrl, handleLogout } from "../services/userService";

const Logout = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      dispatch(startLogout());
      const response = await handleLogout();

      dispatch(successLogout());
      toast("️✅ " + response.message);
    } catch (error) {
      console.log("Error during logout:", error);
      dispatch(failLogout(error.response.data.message));
      toast(error.response.data.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);




  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="relative inline-block ">
        {/* Dropdown toggle button */}
        <button
          onClick={toggleDropdown}
          className="relative z-10 flex items-center p-1 lg:p-2 text-sm text-gray-600 lg:bg-[#20303D] border border-transparent rounded-full lg:rounded-md lg:focus:border-blue-500 lg:focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-white  lg:focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <img
              src={`${baseUrl}/${user?.image}`}
              className="w-8 h-8  object-cover rounded-full"
              alt=""
            />
            <span className="hidden lg:block mx-1 text-white">{user?.firstName + " " + user?.lastName}</span>
          </div>
         
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 md:right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
          >
            <Link
              to="/profile"
              className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <img
                className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 border border-gray-300"
                src={`${baseUrl}/${user?.image}`}
                alt="avatar"
              />
              <div className="mx-1">
                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {user.firstName + " " + user.lastName}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{`${
                  user.email.includes("www.") ? user.email.split("www.")[1] : user.email
                }`}</p>
              </div>
            </Link>

            <hr className="border-gray-200 dark:border-gray-700" />

            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineUser size={20} />
              <span>View Profile</span>
            </Link>

            <button
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover-bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={logoutUser}
            >
              <RiLogoutCircleRLine size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Logout;
