import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
