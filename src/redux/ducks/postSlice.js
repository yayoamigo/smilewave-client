import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: JSON.parse(localStorage.getItem("posts")) || [],
  isLoading: true,
};

export const fetchPost = createAsyncThunk("fetchPost", async (username) => {
  try {
    const response = await fetch(`api/posts/timeline/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});



const postSlice = createSlice({
  name: "GET",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post = payload.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
        localStorage.setItem("posts", JSON.stringify(state.post)); // save the sorted posts to localStorage
      })
      .addCase(fetchPost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postSlice;
