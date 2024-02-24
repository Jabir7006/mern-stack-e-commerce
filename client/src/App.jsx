import React, { Suspense, lazy, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import { UserProvider } from "./context/userContext";
import Home from "./pages/Home";

const ActivateAccount = lazy(() => import("./pages/ActivateAccount"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
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
        <Routes>
          <Route path="/" element={<Home showModal={showModal} setShowModal={setShowModal} />} />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>{user ? <Navigate to="/" /> : <Login />}</Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                {user ? <Navigate to="/" /> : <Register />}
              </Suspense>
            }
          />
          <Route
            path="/api/users/activate"
            element={
              <Suspense fallback={<Loading />}>
                <ActivateAccount />
              </Suspense>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={<Loading />}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route
              path="/payment"
              element={
                <Suspense fallback={<Loading />}>
                  <Payment />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Suspense fallback={<Loading />}>
                <Wishlist />
              </Suspense>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route
            path="/store"
            element={
              <Suspense fallback={<Loading />}>
                <Store showModal={showModal} setShowModal={setShowModal} />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<Loading />}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Suspense fallback={<Loading />}>
                <BlogDetail />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
