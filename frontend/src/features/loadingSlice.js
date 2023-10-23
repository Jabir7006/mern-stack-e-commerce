import { createSlice } from "@reduxjs/toolkit";

 const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },

  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
