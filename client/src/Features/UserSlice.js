import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// REGISTER
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    const response = await axios.post("http://localhost:3001/registerUser", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return response.data.user;
  }
);

// LOGIN
export const login = createAsyncThunk("users/login", async (userData) => {
  const response = await axios.post("http://localhost:3001/login", {
    email: userData.email,
    password: userData.password,
  });
  return response.data.user;
});

// LOGOUT
export const logout = createAsyncThunk("users/logout", async () => {
  await axios.post("http://localhost:3001/logout");
});

// UPDATE PROFILE (with FormData)
export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (userData) => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("profilePic", userData.profilePic);

    const response = await axios.put(
      `http://localhost:3001/updateUserProfile/${userData.email}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.user;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isSuccess = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
