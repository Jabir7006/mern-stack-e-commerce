import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
  },

  reducers: {
    register: (state, actions) => {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
      state.isLoggedIn = true;
    },
  },
});

export const { register } = userSlice.actions;

export default userSlice.reducer;