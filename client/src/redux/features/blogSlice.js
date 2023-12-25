import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBlogsSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
      state.error = null;
    },
    getBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
  },
});

export const { getBlogsStart, getBlogsSuccess, getBlogsFailure } = blogSlice.actions;

export default blogSlice.reducer;
