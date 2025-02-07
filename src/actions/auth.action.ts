import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.action";
import AuthService from "../services/auth.service";
import { User } from "../entities/User";
import { TemporaryUser } from "../entities/TemporaryUser";

export const register = createAsyncThunk(
  "auth/register",
  async (user: TemporaryUser, thunkAPI) => {
    try {
      const response = await AuthService.register(user);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: TemporaryUser, thunkAPI) => {
    try {
      const data = await AuthService.login(user);
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});