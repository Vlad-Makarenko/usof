import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL } from '../utils/constants';

export const getAllTags = createAsyncThunk(
  'tag/getAllTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/categories/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getTag = createAsyncThunk(
  'tag/getTag',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      // eslint-disable-next-line no-use-before-define
      dispatch(setDefaulTag());
      const response = await api.get(`${API_URL}/categories/${id}`);
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

const initialTag = {
  id: 0,
  title: 'Tags',
  description: 'A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.',
  questionsCount: 0,
};

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    tag: initialTag,
    isLoading: false,
    error: null,
  },
  reducers: {
    setDefaulTag(state) {
      state.tag = initialTag;
    },
  },
  extraReducers: {
    [getAllTags.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllTags.fulfilled]: (state, action) => {
      state.tags = action.payload;
      state.isLoading = false;
    },
    [getAllTags.rejected]: setError,
    [getTag.pending]: (state) => {
      // state.isLoading = true;
      state.error = null;
    },
    [getTag.fulfilled]: (state, action) => {
      state.tag = action.payload;
      // state.isLoading = false;
    },
    [getTag.rejected]: setError,
  },
});

export const { setDefaulTag } = tagSlice.actions;

export default tagSlice.reducer;
