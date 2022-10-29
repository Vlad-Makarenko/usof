import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL } from '../utils/constants';

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
