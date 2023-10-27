import { createSlice } from "@reduxjs/toolkit";

let user = localStorage.getItem("user");

if (user) {
 user = JSON.parse(user);
}
const initialState = {
  user: user ? user : null,
  loading: false,
  error: null,
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLogin: (state) => {
      state.loading = true;
    },

    successLogin: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
     
    },

    failLogin: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { startLogin, successLogin, failLogin } = userslice.actions;

export default userslice.reducer;
