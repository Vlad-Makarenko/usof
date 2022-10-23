import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL } from '../utils/constants';
import { toggleLoading } from './loadingSlice';

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(toggleLoading(true));
      const response = await api.get(`${API_URL}/users`);
      console.log('Loading', Date.now());
      dispatch(toggleLoading(false));

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
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      console.log('Loading pending');
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      console.log('Loading fulfilled', Date.now());
    },
    [getAllUsers.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default userSlice.reducer;
