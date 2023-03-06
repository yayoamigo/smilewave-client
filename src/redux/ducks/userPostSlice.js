import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    postUser: JSON.parse(localStorage.getItem("postUser")) || [],
    isLoading: true,
};

export const fetchPostUser = createAsyncThunk('fetchPostUser', async (username) => {
    try {
      const response = await axios.get(`https://52.87.212.123:8000/api/posts/profile/${username}`);
      
      const data =  response.data
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
});

const postUserSlice = createSlice({
  name: 'postUser',
  initialState,
  reducers: {
    setPostUser: (state, action) => {
      state.postUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.postUser = payload.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
        
      })
      .addCase(fetchPostUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPostUser } = postUserSlice.actions;
export default postUserSlice;

