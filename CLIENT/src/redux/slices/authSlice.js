import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../config/axiosinstance'

const initialState = {
    isLoggedin: localStorage.getItem("isLoggedin") || false,
    role : localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
}

export const createAccount = createAsyncThunk("/auth/signup", async (data)=> {
    try {
        const response = axiosInstance.post("users/register",data);
        toast.promise(response, {
            loading: 'Wait! creating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to create your account'
        });
        
        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{}
});

export default authSlice.reducer;