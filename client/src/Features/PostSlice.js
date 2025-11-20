import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

// SAVE POST
export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
    postMsg: postData.postMsg,
    email: postData.email,
  });
  return response.data.post;
});

// GET POSTS
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
  return response.data.posts || [];
});

// LIKE POST
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  const response = await axios.put(
    `${ENV.SERVER_URL}/likePost/${postData.postId}`,
    { userId: postData.userId }
  );
  return response.data.post;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // SAVE POST
      .addCase(savePost.fulfilled, (state, action) => {
        if (action.payload) state.posts.unshift(action.payload);
      })

      // GET POSTS
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload || [];
      })

      // LIKE POST
      .addCase(likePost.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const index = state.posts.findIndex((p) => p._id === updated._id);

        if (index !== -1) {
          state.posts[index] = updated;
        }
      });
  },
});

export default postSlice.reducer;
