import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './commentSlice';
import modalReducer from './modalSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import postReducer from './postSlice';
import tagReducer from './tagSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    auth: authReducer,
    tag: tagReducer,
    post: postReducer,
    comment: commentReducer,
  },
});
