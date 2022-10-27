/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL, DEFAUL_FILTERS } from '../utils/constants';
import { countTotalPages, filterPosts as filterPostsUtils, getCurentPosts } from '../utils/postsUtils';

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, { rejectWithValue }) => {
    // const { filters } = getState().posts;
    try {
      // const response = await api.get(
      // eslint-disable-next-line max-len
      //   `${API_URL}/posts/?page=${filters.page}&date=${filters.date}&categories=${filters.categories}&sort=${filters.sort}&user=${filters.user}`,
      // );
      const response = await api.get(`${API_URL}/posts/?page=-1`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const ceatePost = createAsyncThunk(
  'post/ceatePost',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/posts`, payload);
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

const postSlice = createSlice({
  name: 'post',
  initialState: {
    allPosts: [],
    filteredPosts: [],
    post: {},
    totalPages: 1,
    currentPage: 1,
    currentPagePosts: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    updateFilters(state, action) {
      state.filters = action.payload.filters;
    },
    clearFilters(state) {
      state.filters = DEFAUL_FILTERS;
    },
    filterPosts(state, action) {
      const filteredPosts = filterPostsUtils(
        action.payload.posts,
        action.payload.filters,
      );
      state.filteredPosts = filteredPosts;
      state.totalPages = countTotalPages(filteredPosts);
      state.currentPagePosts = getCurentPosts(filteredPosts, 1);
      state.currentPage = 1;
    },
    changePage(state, action) {
      state.currentPage = action.payload.page;
      state.currentPagePosts = getCurentPosts(action.payload.posts, action.payload.page);
    },
    resetFilters(state, action) {
      const filteredPosts = filterPostsUtils(action.payload.posts, DEFAUL_FILTERS);
      state.filteredPosts = filteredPosts;
      state.totalPages = countTotalPages(filteredPosts);
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      const filteredPosts = filterPostsUtils(action.payload.posts, DEFAUL_FILTERS);
      state.filteredPosts = filteredPosts;
      state.totalPages = countTotalPages(action.payload.posts);
      state.currentPagePosts = getCurentPosts(filteredPosts, 1);
      state.isLoading = false;
    },
    // [checkAuth.fulfilled]: (state, action) => {
    //   state.me = { ...action.payload, acceessToken: undefined };
    //   state.isAuthenticated = true;
    // },
    // [logOut.fulfilled]: (state) => {
    //   state.me = {};
    //   state.isAuthenticated = false;
    // },
    [getAllPosts.rejected]: setError,
    // [logOut.rejected]: setError,
  },
});

export const {
  clearError, updateFilters, clearFilters, filterPosts, resetFilters, changePage,
} = postSlice.actions;

export default postSlice.reducer;
