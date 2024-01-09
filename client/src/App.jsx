import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ActivateAccount from "./pages/ActivateAccount";
import BlogDetail from "./pages/BlogDetail";
import Blogs from "./pages/Blogs";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Profile from './pages/Profile';
import Register from "./pages/Register";
import Store from "./pages/Store";
import Wishlist from "./pages/Wishlist";
import { UserProvider } from "./context/userContext";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

function App() {
  const { user } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home showModal={showModal} setShowModal={setShowModal}/>} />

          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/api/users/activate" element={<ActivateAccount />} />
          <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/store" element={<Store showModal={showModal} setShowModal={setShowModal}/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
