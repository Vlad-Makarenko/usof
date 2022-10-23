import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../store/userSlice';

export const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const { users } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.loading);
  return (
    <div>
      <h1>
        {'Users: '}
        {isLoading ? 'LOADING' : 'NOT'}
      </h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.id}</p>
          <p>{user.login}</p>
          <p>{user.full_name}</p>
          <p>{user.profile_picture}</p>
          <p>{user.rating}</p>
          <p>{user.role}</p>
          <p>{user.createdAt}</p>
        </div>
      ))}
    </div>
  );
};