import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import productSlice from "./features/productSlice";
import userslice from "./features/userslice";
import blogSlice from "./features/blogSlice";
import wishlistSlice from "./features/wishlistSlice";

const store = configureStore({
  reducer: {
    user: userslice,
    product: productSlice,
    cart: cartSlice,
    whishList : wishlistSlice,
    blog: blogSlice,
  },
});

export default store;
