import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'loading',
  initialState: {
    signIn: false,
    signUp: false,
    editPost: false,
    editComment: false,
  },
  reducers: {
    SignInOn(state) {
      state.signIn = true;
    },
    SignInOff(state) {
      state.signIn = false;
    },
    SignUpOn(state) {
      state.signUp = true;
    },
    SignUpOff(state) {
      state.signUp = false;
    },
    EditPostOn(state) {
      state.editPost = true;
    },
    EditPostOff(state) {
      state.editPost = false;
    },
    EditCommentOn(state) {
      state.editComment = true;
    },
    EditCommentOff(state) {
      state.editComment = false;
    },
  },
});

export const {
  SignInOn, SignInOff, SignUpOn, SignUpOff, EditPostOn, EditPostOff, EditCommentOn, EditCommentOff,
} = modalSlice.actions;

export default modalSlice.reducer;
