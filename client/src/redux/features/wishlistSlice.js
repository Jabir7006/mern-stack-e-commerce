import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const whishListItems = JSON.parse(localStorage.getItem("whishListItems")) || [];

const initialState = {
  whishListItems : whishListItems,
};

const wishlistSlice = createSlice({
  name: "whishList",
  initialState,
  reducers: {
    addToWhishList: (state, action) => {
      const sameProduct = state.whishListItems.find((item) => item._id === action.payload._id);

      if (sameProduct) {
        toast.warning("Item already added");
      } else {
        state.whishListItems = [...state.whishListItems, action.payload];
        toast.success("Product added to whishList");
      }

      localStorage.setItem("whishListItems", JSON.stringify(state.whishListItems));
    },

    removeFromWhishList: (state, action) => {
      state.whishListItems = state.whishListItems.filter((item) => item._id !== action.payload);
      localStorage.setItem("whishListItems", JSON.stringify(state.whishListItems));
    },

   
  },
});

export const { addToWhishList, removeFromWhishList } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
