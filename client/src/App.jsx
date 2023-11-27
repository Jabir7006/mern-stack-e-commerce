import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ActivateAccount from "./pages/ActivateAccount";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Profile from './pages/Profile';
import Register from "./pages/Register";
import Store from "./pages/Store";

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
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/store" element={<Store />} />
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
