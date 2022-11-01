/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Answer } from '../components/Answer';
import { EditProfile } from '../components/EditProfile';
import { Login } from '../components/Login';
import { ModalWin } from '../components/ModalWin';
import { PostForm } from '../components/PostForm';
import { Register } from '../components/Register';
import { ResetPswd } from '../components/ResetPswd';
import {
  EditCommentOff, EditPostOff, ProfileEditOff, ResetPswdOff, SignInOff, SignUpOff,
} from '../store/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const {
    signIn, signUp, editPost, editComment, resetPswd, profileEdit,
  } = useSelector((state) => state.modal);

  return (
    <div>
      <ModalWin show={signIn} onHide={() => dispatch(SignInOff())}>
        <Login />
      </ModalWin>
      <ModalWin show={signUp} onHide={() => dispatch(SignUpOff())}>
        <Register />
      </ModalWin>
      <ModalWin show={resetPswd} onHide={() => dispatch(ResetPswdOff())}>
        <ResetPswd />
      </ModalWin>
      <ModalWin show={editPost} onHide={() => dispatch(EditPostOff())}>
        <PostForm isEditing />
      </ModalWin>
      <ModalWin show={editComment} onHide={() => dispatch(EditCommentOff())}>
        <Answer isEditing />
      </ModalWin>
      <ModalWin show={profileEdit} onHide={() => dispatch(ProfileEditOff())}>
        <EditProfile />
      </ModalWin>
    </div>
  );
};
