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
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
})
export const login = createAsyncThunk("/auth/signin", async (data)=> {
    try {
        const response = axiosInstance.post("users/login",data);
        toast.promise(response, {
            loading: 'Authenticating, please wait!',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'User authentication failed.'
        });
        
        return await response;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
})
export const logout = createAsyncThunk("/auth/logout", async ()=> {
    try {
        const response = axiosInstance.get("users/logout");
        toast.promise(response, {
            loading: 'Logging out...',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to logout.'
        });
        
        return await response;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(login.fulfilled, (state,action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.data));
            localStorage.setItem("isLoggedin",true)
            localStorage.setItem("role",action?.payload?.data?.user?.role)
            state.isLoggedin = true;
            state.role = action?.payload?.data?.user?.role;
            state.data = action?.payload?.data
        })
        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear();
            state.isLoggedin = false;
            state.role = "";
            state.data = ""
        })
    }
});

export default authSlice.reducer;