import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

// SAVE POST
export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  const response = await axios.post("http://localhost:3001/savePost", {
    postMsg: postData.postMsg,
    email: postData.email,
  });
  return response.data.post;
});

// GET POSTS
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await axios.get("http://localhost:3001/getPosts");
  return response.data.posts || [];
});

// LIKE POST
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  const response = await axios.put(
    `http://localhost:3001/likePost/${postData.postId}`,
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
