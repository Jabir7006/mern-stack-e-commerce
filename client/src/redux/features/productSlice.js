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
     
  }
});

export const { getProductStart, getProductSuccess, getProductFailure } = productSlice.actions;

export default productSlice.reducer;
