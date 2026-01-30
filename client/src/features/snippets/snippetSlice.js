import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a snippet
export const createSnippet = createAsyncThunk(
  "snippet/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/snippets/",
        formData, // body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

const snippetSlice = createSlice({
  name: "snippet",
  initialState: {
    snippets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets.push(action.payload); // add new snippet to list
      })
      .addCase(createSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default snippetSlice.reducer;