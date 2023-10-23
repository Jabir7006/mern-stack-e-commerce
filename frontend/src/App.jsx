import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

import { useEffect } from "react";
import axios from "axios";
import ActivateAccount from "./pages/ActivateAccount";
import { baseURL, handleCheckLogin } from "./services/userService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, logout } from "./features/userSlice";

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const handleCheckLogin = () => {
  //     try {
  //       const response = axios.get(`${baseURL}/api/auth/verify`, {
  //         withCredentials: true,
  //       });
  //       if (response.status === 200) {
  //         dispatch(login({ isLoggedIn: true }));
  //       }
  //     } catch (error) {
  //       dispatch(logout());
  //     }
  //   };
  //   handleCheckLogin();
  // }, []);

  // console.log(isLoggedIn);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api/users/activate" element={<ActivateAccount />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
