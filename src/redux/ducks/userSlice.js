import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || {},
  isLoading: true,
};

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const response = await axios.get(`http://52.87.212.123:8000/api/users/all`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        payload.forEach(user => {
          state.users[user._id] = user;
        });
        localStorage.setItem('users', JSON.stringify(state.users));
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


export default usersSlice;