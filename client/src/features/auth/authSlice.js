import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('user', response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.user; // { name, email, id }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('user', response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const switchTheme = createAsyncThunk(
  "theme/switchTheme",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token", token);
      const res = await axios.patch("http://localhost:3000/api/auth/theme", {}, {
        headers: { Authorization: `Bearer ${token}` }
      }); 
      console.log(res); 
      return res.data.user; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateApiKey = createAsyncThunk(
  'key/update',
  async ( apiKey, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log();

      const res = await axios.patch('http://localhost:3000/api/auth/key', apiKey, {
        headers: { Authorization: `Bearer ${token}`}
      });
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      })
      .addCase(switchTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(switchTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.theme = action.payload; // update theme
      })
      .addCase(switchTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateApiKey.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKey = action.payload;
      })
      .addCase(updateApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;