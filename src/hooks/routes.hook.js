/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ResetPassword } from '../pages/ResetPassword';
import { Saved } from '../pages/Saved';
import { Users } from '../pages/Users';
import { Tags } from '../pages/Tags';
import { Main } from '../pages/Main';
import { User } from '../pages/User';
import { Post } from '../pages/Post';
import { Ask } from '../pages/Ask';

export const useRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Routes path>
      <Route path="/" element={<Main />} exact />
      <Route path="/post/:id" element={<Post />} exact />
      <Route path="/ask" element={<Ask />} exact />
      {isAuthenticated && <Route path="/saved" element={<Saved />} exact />}
      <Route path="/users" element={<Users />} exact />
      <Route path="/users/:id" element={<User />} exact />
      <Route path="/password-reset/:token" element={<ResetPassword />} exact />
      {/* <Route path="/profile"
      element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} exact /> */}
      <Route path="/tags" element={<Tags />} exact />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
