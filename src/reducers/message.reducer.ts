import { createReducer } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "../actions/message.action";

// Define the initial state
const initialState = {
  message: ""
};

// Define the reducer
const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMessage, (state, action) => {
      state.message = action.payload;
    })
    .addCase(clearMessage, (state) => {
      state.message = "";
    });
});

export default messageReducer;