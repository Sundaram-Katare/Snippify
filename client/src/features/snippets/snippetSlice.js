import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSnippets = createAsyncThunk('snippets/fetch', 
    async(_, { getState }) => {
        const token = getState().auth.token;
        
    }
)