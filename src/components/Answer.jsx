import React, { useEffect, useState } from 'react';

import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ceateComment, updateComment } from '../store/commentSlice';
import { EditCommentOff } from '../store/modalSlice';

export const Answer = ({ isEditing }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const { comment } = useSelector((state) => state.comment);
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    if (isEditing) {
      setContent(comment.content);
    }
  }, []);

  return (
    <Container
      style={!isEditing ? { borderTop: '1px solid rgba(0, 0, 0, 0.2)' } : {}}
      className={
        !isEditing
          ? 'd-flex flex-column justify-content-center aling-items-center mt-5'
          : 'd-flex flex-column justify-content-center aling-items-center'
      }
    >
      <h3 className="aling-self-center mt-3">{isEditing ? 'Edit Answer' : 'Your Answer'}</h3>
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
          if (isEditing) {
            dispatch(updateComment({ content, id: comment.id }));
          } else {
            dispatch(ceateComment({ content, id: post.id }));
          }
          setContent('');
          dispatch(EditCommentOff());
        }}
      >
        {isEditing ? 'Edit your answer' : 'Post your answer'}
      </Button>
    </Container>
  );
};
