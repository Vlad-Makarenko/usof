import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../http';
import { API_URL } from '../utils/constants';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/login`, payload);
      localStorage.setItem('token', response.data.acceessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/logout`);
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload.message;
  console.log('req error: ', action.payload);
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {
      id: 0,
      login: 'Login',
      full_name: '',
      profile_picture: 'default.png',
      rating: 0,
      role: 'admin',
      createdAt: Date.now(),
    },
    isAuthenticated: false,
    error: null,
    isLoading: false,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.me = { ...action.payload, acceessToken: undefined };
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.me = { ...action.payload, acceessToken: undefined };
      state.isAuthenticated = true;
    },
    [logOut.fulfilled]: (state) => {
      state.me = {};
      state.isAuthenticated = false;
    },
    [signIn.rejected]: setError,
    [logOut.rejected]: setError,
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
