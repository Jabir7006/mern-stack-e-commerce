import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { handleLogin } from "../services/userService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/userSlice";
import { setLoading, stopLoading } from "../features/loadingSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputsData, setInputsData] = useState({
    email: "",
    password: "",
  });
  const { loading } = useSelector((state) => state.loading);
  const { isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const response = await handleLogin(inputsData);
      dispatch(stopLoading());
      dispatch(
        login({ user: response.payload.user, token: response.payload.token, isLoggedIn: true })
      );
      console.log(response);
      navigate("/");
      window.location.reload(true);
      toast.success(response.message);
    } catch (error) {
      dispatch(logout());
      dispatch(stopLoading());
      toast.error(error.response.data.message);
    }
  };

  // const login = localStorage.getItem("isLoggedIn");

  // useEffect(() => {
  //   if (login) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      {loading && (
        <div className="text-2xl font-semibold fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
          Loading...
        </div>
      )}
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            {/* email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={inputsData.email}
                onChange={handleChange}
              />
            </div>

            {/* password Input */}
            <div className="mb-3 relative">
              <i
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </i>
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={inputsData.password}
                onChange={handleChange}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-3 flex items-center">
              <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>

            {/* submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              login
            </button>
          </form>
          {/* Sign up  Link */}
          <div className="mt-6 text-blue-500 text-center">
            <Link to="/register" className="hover:underline">
              Regisater Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
