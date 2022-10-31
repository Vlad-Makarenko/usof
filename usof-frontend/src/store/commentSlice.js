/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL } from '../utils/constants';

export const getAllComments = createAsyncThunk(
  'comment/getAllComments',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${API_URL}/posts/${id}/comments`);
      const result = [];
      for (const comment of data) {
        const voteRes = await api.get(`${API_URL}/comments/${comment.id}/like`);
        result.push({ comment: { ...comment }, commentVote: voteRes.data });
      }
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getComment = createAsyncThunk(
  'comment/getPost',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/comments/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/comments/${id}`, { content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/comments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const ceateComment = createAsyncThunk(
  'comment/ceateComment',
  async ({ content, id }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/posts/${id}/comments`, { content });
      return { comment: { ...response.data }, commentVote: null };
      // return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createCommentLike = createAsyncThunk(
  'comment/createCommentLike',
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/comments/${id}/like`, { type });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteCommentLike = createAsyncThunk(
  'comment/deleteCommentLike',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/comments/${id}/like`);
      return id;
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

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    allComments: [],
    comment: {},
    error: null,
    isLoading: false,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setComment(state, action) {
      state.comment = action.payload;
    },
  },
  extraReducers: {
    [getAllComments.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getComment.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllComments.fulfilled]: (state, action) => {
      state.allComments = action.payload;
      state.isLoading = false;
    },
    [getComment.fulfilled]: (state, action) => {
      state.comment = action.payload;
      state.isLoading = false;
    },
    [updateComment.fulfilled]: (state, action) => {
      const { id } = action.payload;
      const idx = state.allComments.findIndex(((obj) => obj.comment.id === Number(id)));
      state.allComments[idx].comment = action.payload;
    },
    [createCommentLike.fulfilled]: (state, action) => {
      const { CommentId } = action.payload;
      const idx = state.allComments.findIndex(((obj) => obj.comment.id === Number(CommentId)));
      state.allComments[idx].comment.likeCount = action.payload.type === 'like'
        ? state.allComments[idx].comment.likeCount + 1
        : state.allComments[idx].comment.likeCount;
      if (
        state.allComments[idx].commentVote
        && action.payload.type === 'dislike'
      ) {
        state.allComments[idx].comment.likeCount -= 1;
      }
      state.allComments[idx].commentVote = action.payload;
    },
    [deleteCommentLike.fulfilled]: (state, action) => {
      const idx = state.allComments.findIndex(
        (obj) => obj.comment.id === action.payload,
      );
      state.allComments[idx].comment.likeCount = state.allComments[idx].commentVote.type === 'like'
        ? state.allComments[idx].comment.likeCount - 1
        : state.allComments[idx].comment.likeCount;
      state.allComments[idx].commentVote = null;
    },
    [ceateComment.fulfilled]: (state, action) => {
      state.allComments.push(action.payload);
    },
    [getAllComments.rejected]: setError,
    [getComment.rejected]: setError,
    [createCommentLike.rejected]: setError,
    [deleteCommentLike.rejected]: setError,
    [ceateComment.rejected]: setError,
    [updateComment.rejected]: setError,
  },
});

export const { clearError, setComment } = commentSlice.actions;

export default commentSlice.reducer;
