import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import api from '../http';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
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
      // console.table({ ...response.data });
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password, repeatedPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/password-reset/${token}`, { password, repeatedPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const resetPswd = createAsyncThunk(
  'auth/resetPswd',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/password-reset`, payload);
      // console.table({ ...response.data });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/register`, payload);
      // console.table({ ...response.data });
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
      localStorage.removeItem('token');
      const response = await api.post(`${API_URL}/auth/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {
      id: 0,
      login: 'Login',
      full_name: '',
      profile_picture: 'default.png',
      rating: 0,
      role: 'user',
      createdAt: Date.now(),
    },
    isAuthenticated: false,
    isLoading: false,
    success: false,
  },
  reducers: {
    tokenAuth(state) {
      const decodedToken = decode(localStorage.getItem('token'));
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        state.me = decodedToken;
        state.isAuthenticated = true;
      } else {
        state.me = {};
        state.isAuthenticated = false;
      }
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signUp.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [resetPswd.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [checkAuth.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.me = { ...action.payload, accessToken: undefined };
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [signUp.fulfilled]: (state) => {
      toast.success('Registration was successful. Confirm your email and log in');
      state.success = true;
      state.isLoading = false;
    },
    [resetPswd.fulfilled]: (state) => {
      toast.success('Now you should check your email');
      state.success = true;
      state.isLoading = false;
    },
    [resetPassword.fulfilled]: (state) => {
      toast.success('Password successfully reseted');
      state.success = true;
      state.isLoading = false;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.me = { ...action.payload, accessToken: undefined };
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [logOut.fulfilled]: (state) => {
      state.me = {};
      state.isAuthenticated = false;
    },
    [signIn.rejected]: errorHandler,
    [signUp.rejected]: errorHandler,
    [logOut.rejected]: (state) => {
      state.me = {};
      state.isAuthenticated = false;
    },
    [resetPassword.rejected]: errorHandler,
    [resetPswd.rejected]: errorHandler,
    [checkAuth.rejected]: (state, action) => {
      state.isLoading = false;
      console.log('req error: ', action.payload);
    },
  },
});

export const { tokenAuth } = authSlice.actions;

export default authSlice.reducer;
