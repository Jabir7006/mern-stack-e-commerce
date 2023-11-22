import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ActivateAccount from "./pages/ActivateAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from './pages/Profile';
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/api/users/activate" element={<ActivateAccount />} />
          <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/product/:id" element={<ProductDetail />} />
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
