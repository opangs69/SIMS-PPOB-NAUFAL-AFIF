import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "./slices/authSlice";

export const store = configureStore({
    reducer:{
        user: userSlice
    }
})