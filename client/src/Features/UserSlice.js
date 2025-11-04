import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersData } from "../Exampledata";
import axios from "axios";



// const initialState = { value: [] };
//const initialState = { value: UsersData };
const initialState = {
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};

//Create the thunk
export const registerUser = createAsyncThunk("users/registerUser",
    async (userData) => {
        try {
            const response = await axios.post("http://localhost:3001/registerUser",
                {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                });
            console.log(response);
            const user = response.data.user;
            return user;
        } catch (error) {
            console.log(error)
        }
    }

);

export const userSlice = createSlice({
    name: "users",
    initialState,
    // reducers: {
    //     addUser: (state, action) => {
    //         state.value.push(action.payload);
    //     },
    //     deleteUser: (state, action) => {
    //         state.value = state.value.filter((user) => user.email !== action.payload);
    //     },
    //     updateUser: (state, action) => {
    //         state.value.map((user) => {
    //             if (user.email === action.payload.email) {
    //                 user.name = action.payload.name;
    //                 user.password = action.payload.password;
    //             }
    //         });
    //     },
    // },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const { addUser, deleteUser, updateUser } = userSlice.actions; //export the function
export default userSlice.reducer;