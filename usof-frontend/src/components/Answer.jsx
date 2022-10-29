import React, { useState } from 'react';

import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ceateComment } from '../store/commentSlice';

export const Answer = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const { post } = useSelector((state) => state.post);
  return (
    <Container
      style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}
      className="d-flex flex-column justify-content-center aling-items-center mt-5"
    >
      <h3 className="aling-self-center mt-3">Your Answer</h3>
      <Container
        className="d-flex align-items-center serchForm p-0 m-0 mt-1 mb-1"
        fluid
      >
        <textarea
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          name="content"
          className="searchInput p-3 m-0"
          placeholder="Write your answer..."
          rows={5}
        />
      </Container>
      <Button
        variant="outline-dark"
        onClick={() => {
          dispatch(ceateComment({ content, id: post.id }));
          setContent('');
        }}
      >
        Post your answer
      </Button>
    </Container>
  );
};
