import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  admin:  [],
  isLoading: true,
};

export const fetchAdmin = createAsyncThunk('fetchAdmin', async (userId) => {
  try {
    const response = await axios.get(`https://52.87.212.123:8000/api/users?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdmin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.admin = payload;
      })
      .addCase(fetchAdmin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


export default adminSlice;