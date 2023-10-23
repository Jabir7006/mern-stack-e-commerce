import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
// const token = JSON.parse(localStorage.getItem("token"));
// const isLoggedin = JSON.parse(localStorage.getItem("isLoggedIn"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: user || {},
    token: '',
    isLoggedIn: false,
    loading: false,
  },

  reducers: {
    register: (state, actions) => {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
      state.isLoggedIn = actions.payload.isLoggedIn;
      localStorage.setItem("user", JSON.stringify(state.user))
      // localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },

    login: (state, actions) => {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
      state.isLoggedIn = actions.payload.isLoggedIn;
      
      // localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },

    logout: (state) => {
      state.user = {};
      state.token = "";
      state.isLoggedIn = false;
      
      // localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
    },
  },
});

export const { register, login, logout } = userSlice.actions;

export default userSlice.reducer;