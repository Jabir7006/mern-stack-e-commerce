import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { handleRegister } from "../services/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../features/userSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputsData, setInputsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("firstName", inputsData.firstName);
      userData.append("lastName", inputsData.lastName);
      userData.append("email", inputsData.email);
      userData.append("password", inputsData.password);
      userData.append("image", inputsData.image);

      const response = await handleRegister(userData);
        console.log(response);
      dispatch(register({ user: response.payload.user, token: response.payload.token }));
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      dispatch(register({ user: null, token: null }));
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen overflow-y-hidden">
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
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            {/* first name Input */}
            <div className="mb-3">
              <label htmlFor="firstName" className="block text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={inputsData.firstName}
                onChange={handleChange}
              />
            </div>

            {/* last name Input */}
            <div className="mb-3">
              <label htmlFor="lastName" className="block text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={inputsData.lastName}
                onChange={handleChange}
              />
            </div>

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

            {/* image Input */}
            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-600">
                Profile Picture
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none"
                onChange={(e) => setInputsData({ ...inputsData, image: e.target.files[0] })}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-3 flex items-center">
              <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>
            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Create Account
            </button>
          </form>
          {/* Sign up  Link */}
          <div className="mt-6 text-blue-500 text-center">
            <Link to="/login" className="hover:underline">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
