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
  const [showModal, setShowModal] = useState(false);
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
            <img src={user.image} className="w-8 h-8  object-cover rounded-full" alt="" />

            <span className="hidden lg:block mx-1 text-white">
              {user?.firstName + " " + user?.lastName}
            </span>
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute -left-20 sm:right-0 sm:left-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
          >
            <Link
              to="/profile"
              className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <img
                className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 border border-gray-300"
                src={`${
                  user.image.startsWith("public/images/") ? baseUrl + "/" + user.image : user.image
                }`}
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
              onClick={() => setShowModal(true)}
            >
              <RiLogoutCircleRLine size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* sign out modal */}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[999]">
          {/* Background backdrop */}
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />

          <div className="fixed overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {/* Modal panel */}
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* Modal content */}
                <div className="p-4 sm:p-10 text-center overflow-y-auto">
                  {/* Icon */}
                  <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </span>
                  {/* End Icon */}

                  {/* Sign Out Button */}
                  <button className="mb-2 text-2xl font-bold text-gray-800">Sign out</button>

                  {/* Sign Out Confirmation */}
                  <p className="text-gray-500">
                    Are you sure you would like to sign out of your account?
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-center gap-x-4">
                    <button
                      className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                      onClick={() => {
                        logoutUser();
                        setShowModal(false);
                      }}
                    >
                      Sign out
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  {/* End Action Buttons */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
