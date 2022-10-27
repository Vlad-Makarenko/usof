import React from 'react';
import { useParams } from 'react-router-dom';

export const Post = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>
        post
        {' '}
        {id}
      </h1>
    </div>
  );
};
