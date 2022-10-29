/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL, DEFAUL_FILTERS } from '../utils/constants';
import { countTotalPages, filterPosts as filterPostsUtils, getCurentPosts } from '../utils/postsUtils';

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/posts/?page=-1`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getPost = createAsyncThunk(
  'post/getPost',
  async ({ id }, { rejectWithValue }) => {
    try {
      const postResponse = await api.get(`${API_URL}/posts/${id}`);
      const likesResponse = await api.get(`${API_URL}/posts/${id}/like`);
      // console.log({ post: postResponse.data, like: likesResponse.data });
      return { post: postResponse.data, like: likesResponse.data };
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

export const ceateLike = createAsyncThunk(
  'post/ceateLike',
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/posts/${id}/like`, { type });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteLike = createAsyncThunk(
  'post/deleteLike',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/posts/${id}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addToFavorite = createAsyncThunk(
  'post/addToFavorite',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/posts/favorites/`, { postId: id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeFromFavorite = createAsyncThunk(
  'post/removeFromFavorite',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/posts/favorites/${id}`);
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
    postVote: {},
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
    [getPost.pending]: (state) => {
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
    [getPost.fulfilled]: (state, action) => {
      state.post = action.payload.post;
      state.postVote = action.payload.like;
      state.isLoading = false;
    },
    [ceateLike.fulfilled]: (state, action) => {
      state.post.likeCount = action.payload.type === 'like' ? state.post.likeCount + 1 : state.post.likeCount;
      if (state.postVote && action.payload.type === 'dislike') {
        state.post.likeCount -= 1;
      }
      state.postVote = action.payload;
    },
    [deleteLike.fulfilled]: (state) => {
      state.post.likeCount = state.postVote.type === 'like' ? state.post.likeCount - 1 : state.post.likeCount;
      state.postVote = null;
    },
    [addToFavorite.fulfilled]: (state) => {
      state.post.favoriteCount += 1;
    },
    [removeFromFavorite.fulfilled]: (state) => {
      state.post.favoriteCount -= 1;
    },
    [getAllPosts.rejected]: setError,
    [getPost.rejected]: setError,
    [ceateLike.rejected]: setError,
    [deleteLike.rejected]: setError,
    [addToFavorite.rejected]: setError,
    [removeFromFavorite.rejected]: setError,
  },
});

export const {
  clearError, updateFilters, clearFilters, filterPosts, resetFilters, changePage,
} = postSlice.actions;

export default postSlice.reducer;
