import { createReducer } from "@reduxjs/toolkit";
import { register, login, logout } from "../actions/auth.action";

const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(register.fulfilled, (state) => {
      state.isLoggedIn = false;
    })
    .addCase(register.rejected, (state) => {
      state.isLoggedIn = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    })
    .addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    })
    .addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
});

export default authReducer;