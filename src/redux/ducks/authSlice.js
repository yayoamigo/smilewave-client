import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("login")) || null,
  isFetching: false,
  error: false,
};

export const login = createAsyncThunk("api/auth/login", async (userCredential) => {
  try{
    const response = await axios.post("https://52.87.212.123:8000/api/auth/login", userCredential);
    const data = response.data;
  return data;
  }catch (error) {
    console.error(error);
    throw error;
  }
});

export const register = createAsyncThunk("api/auth/register", async (user) => {
  try {
     await axios.post("https://52.87.212.123:8000/api/auth/register", user);

  } catch (error) {
    console.error(error);
    throw error;
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isFetching = false;
        localStorage.setItem("login", JSON.stringify(state.user)); // save the sorted posts to localStorage
        state.error = false;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isFetching = false;
        state.error = true;
      })
      .addCase(register.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isFetching = false;
        state.error = false;
      })
      .addCase(register.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      });
  },
});


export default authSlice;
