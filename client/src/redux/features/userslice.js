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
      state.user = action.payload || null;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    failLogin: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },

    startLogout: (state) => {
      state.loading = true;
    },

    successLogout: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      localStorage.setItem("user", null);
    },

    failLogout: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { startLogin, successLogin, failLogin, startLogout, successLogout, failLogout } =
  userslice.actions;

export default userslice.reducer;
