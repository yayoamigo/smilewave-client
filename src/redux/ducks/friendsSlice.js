import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  friendsByUserId: {},
  isLoading: true,
};

export const fetchFriends = createAsyncThunk("fetchFriends", async (userId) => {
    try {
      const response = await axios.get(`http://52.87.212.123:8000/api/users/friends/${userId}`);
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });


const friendsSlice = createSlice({
  name: "GET",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFriends.fulfilled, (state, { payload, meta }) => {
        state.isLoading = false;
        const userId = meta.arg;
        state.friendsByUserId[userId] = payload;
      })
      .addCase(fetchFriends.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default friendsSlice;
