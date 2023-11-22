import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: cartItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const sameProduct = state.cartItems.find((item) => item._id === action.payload._id);

      if (sameProduct) {
        toast.warning("Item already added");
      } else {
        state.cartItems = [...state.cartItems, action.payload];
        toast.success("Product added to cart");
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    incrementQuantity: (state, action) => {
      const itemToUpdate = state.cartItems.find((item) => item._id === action.payload);
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decrementQuantity: (state, action) => {
      const itemToUpdate = state.cartItems.find((item) => item._id === action.payload);
      if (itemToUpdate) {
        itemToUpdate.quantity -= 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
