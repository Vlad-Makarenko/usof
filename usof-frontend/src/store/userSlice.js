/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/users`);
      console.log('Loading', Date.now());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ avatar }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const response = await api.patch(`${API_URL}/users/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async ({
    full_name, email, login, id,
  }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/users/${id}`, {
        full_name,
        email,
        login,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: {
      id: 0,
      login: 'Login',
      full_name: '',
      profile_picture: 'default.png',
      rating: 0,
      role: 'admin',
      createdAt: Date.now(),
    },
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [editProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [editProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [updateAvatar.fulfilled]: (state, action) => {
      state.user.profile_picture = action.payload.avatar;
      state.isLoading = false;
    },
    [updateAvatar.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [getUser.rejected]: errorHandler,
    [getAllUsers.rejected]: errorHandler,
    [editProfile.rejected]: errorHandler,
    [updateAvatar.rejected]: errorHandler,
  },
});

export default userSlice.reducer;
