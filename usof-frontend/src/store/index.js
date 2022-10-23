import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './loadingSlice';
import userReducer from './userSlice';
import modalSlice from './modalSlice';
import authSlice from './authSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingSlice,
    modal: modalSlice,
    auth: authSlice,
  },
});
