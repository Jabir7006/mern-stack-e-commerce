import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import loadingSlice from "../features/loadingSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
  },
});

export default store;
