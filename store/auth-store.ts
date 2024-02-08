"use client"
import { configureStore, createSlice } from "@reduxjs/toolkit"; 

interface AuthState{
    isAuth:boolean
}

const initialState = {isAuth : false} as AuthState;

const authSlice = createSlice({
    name :'Auth',
    initialState,
    reducers : {
        login(state){
            state.isAuth = true; 
        },
        logout(state){
            state.isAuth = false; 
        }
    }
});

export const isAuthActions = authSlice.actions;

const store = configureStore({
    reducer : authSlice.reducer
});

export default store;