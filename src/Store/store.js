import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../Features/UserSlice"; //import the reducer

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
}); 