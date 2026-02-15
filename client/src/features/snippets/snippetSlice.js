import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/";

export const createSnippet = createAsyncThunk(
  "snippets/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}snippets/`,
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
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}snippets`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data?.message);
    }
  }
);

export const updateSnippet = createAsyncThunk(
  "snippets/updateSnippet",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BACKEND_URL}snippets/${id}`, data);
      return res.data.updated;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const getSnippetById = createAsyncThunk(
  "snippets/getById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch snippet");
    }
  }
);

export const updateCode = createAsyncThunk(
  "snippet/updateCode",
  async ({ id, code }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${BACKEND_URL}snippets/${id}`, { code }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update code");
    }
  }
);

export const deleteSnippet = createAsyncThunk(
  "snippets/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${BACKEND_URL}snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete snippet");
    }
  }
);

export const explainCode = createAsyncThunk(
  "snippets/explainCode",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}snippets/explain/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        error: err.response?.data?.error || "Failed to explain code",
        code: err.response?.data?.code
      });
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
    explanation: null,
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
      })
      .addCase(updateSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippet = action.payload; // update single snippet
        // also update in snippets array if present
        const idx = state.snippets.findIndex(s => s._id === action.payload._id);
        if (idx !== -1) {
          state.snippets[idx] = action.payload;
        }
      })
      .addCase(updateSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCode.fulfilled, (state, action) => {
        state.loading = false;
        state.snippet = action.payload; // update single snippet
        // also update in snippets array if present
        const idx = state.snippets.findIndex(s => s._id === action.payload._id);
        if (idx !== -1) {
          state.snippets[idx] = action.payload;
        }
      })
      .addCase(updateCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = state.snippets.filter(s => s._id !== action.payload.id);
        if (state.snippet?._id === action.payload.id) {
          state.snippet = null; // clear if deleted snippet was being viewed
        }
      })
      .addCase(deleteSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(explainCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.explanation = null;
      })
      .addCase(explainCode.fulfilled, (state, action) => {
        state.loading = false;
        state.explanation = action.payload;
      })
      .addCase(explainCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default snippetSlice.reducer;