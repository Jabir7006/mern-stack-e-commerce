import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    getProductFailure: (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload;
    },

    setProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p._id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
     
  }
});

export const { getProductStart, getProductSuccess, getProductFailure,setProductQuantity } = productSlice.actions;

export default productSlice.reducer;
