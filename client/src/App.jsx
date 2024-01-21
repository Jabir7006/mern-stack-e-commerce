import React, { useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";
import { UserProvider } from "./context/userContext";
import Loading from "./components/Loading";

const ActivateAccount = lazy(() => import("./pages/ActivateAccount"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Store = lazy(() => import("./pages/Store"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));

function App() {
  const { user } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
      <Navbar />
        <Suspense fallback={<Loading />}>
       
          <Routes>
            <Route path="/" element={<Home showModal={showModal} setShowModal={setShowModal} />} />
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
            <Route path="/store" element={<Store showModal={showModal} setShowModal={setShowModal} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
