import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import productSlice from "./features/productSlice";
import userslice from "./features/userslice";

const store = configureStore({
  reducer: {
    user: userslice,
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;
