/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tags } from '../pages/Tags';
import { Main } from '../pages/Main';
import { Profile } from '../pages/Profile';
import { User } from '../pages/User';
import { Users } from '../pages/Users';

export const useRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Routes path>
      <Route path="/" element={<Main />} exact />
      <Route path="/users" element={<Users />} exact />
      <Route path="/users/:id" element={<User />} exact />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} exact />
      <Route path="/tags" element={<Tags />} exact />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
