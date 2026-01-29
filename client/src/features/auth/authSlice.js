import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
    "auth/signup",
    async (FormData, { rejectWithValue }) => {
        try {
          const res = await axios.post("/api/auth/signup", FormData);
          return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data?.message);
        }
    }
);