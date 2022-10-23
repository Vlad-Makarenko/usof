import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'loading',
  initialState: {
    signIn: false,
    signUp: false,
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
  },
});

export const {
  SignInOn, SignInOff, SignUpOn, SignUpOff,
} = modalSlice.actions;

export default modalSlice.reducer;
