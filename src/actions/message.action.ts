import { createAction } from "@reduxjs/toolkit";

export const SET_MESSAGE = "message/setMessage";
export const CLEAR_MESSAGE = "message/clearMessage";

export const setMessage = createAction<string>(SET_MESSAGE);
export const clearMessage = createAction(CLEAR_MESSAGE);