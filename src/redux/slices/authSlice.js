import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser:(initialState, action) => {
            initialState.user = action.payload
        },
        logout: (initialState) => {
            initialState.user = null
            sessionStorage.removeItem("tkn")
        }
    }
})

export const {setUser,logout} = userSlice.actions
export default userSlice.reducer
