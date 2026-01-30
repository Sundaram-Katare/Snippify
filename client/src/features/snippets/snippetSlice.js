import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a snippet
export const createSnippet = createAsyncThunk(
  "snippets/create",
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

export const getSnippets = createAsyncThunk(
    "snippets/get",
    async ( { token }, { rejectWithValue }) => {
        try {
          const response = await axios.get("http://localhost:3000/api/snippets", {
            headers: { Authorization: `Bearer ${token}` }
          });

          console.log(response);
          return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data?.message);
        }
    }
);

export const getSnippetById = createAsyncThunk(
  "snippets/getById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch snippet");
    }
  }
);

const snippetSlice = createSlice({
  name: "snippet",
  initialState: {
    snippets: [],
    snippet: null,
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
      })
      .addCase(getSnippets.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSnippets.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload;
      })
      .addCase(getSnippets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSnippetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSnippetById.fulfilled, (state, action) => {
        state.loading = false;
        state.snippet = action.payload;  // store single snippet
      })
      .addCase(getSnippetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default snippetSlice.reducer;