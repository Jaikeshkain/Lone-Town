import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:JSON.parse(localStorage.getItem("userInfo") || "null")
    },
    reducers:{
        loginAction:(state,action)=>{
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
            state.user=action.payload;
        },
        logoutAction:(state)=>{
            localStorage.removeItem("userInfo");
            state.user=null;
        }
    }
})

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;