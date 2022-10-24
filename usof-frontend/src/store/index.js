import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import modalReducer from './modalSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import tagReducer from './tagSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    modal: modalReducer,
    auth: authReducer,
    tag: tagReducer,
  },
});
