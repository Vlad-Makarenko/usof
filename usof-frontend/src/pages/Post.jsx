import React, { useEffect } from 'react';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Nothing } from '../components/Nothing';
import { PostInfo } from '../components/PostInfo';
import { TagsSideBar } from '../components/TagsSideBar';
import { getAllTags } from '../store/tagSlice';
import { getPost } from '../store/postSlice';
import { CommentInfo } from '../components/CommentInfo';
import { getAllComments } from '../store/commentSlice';
import { Answer } from '../components/Answer';

export const Post = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    isLoading: postLoading,
    error,
    post,
  } = useSelector((state) => state.post);
  const { isLoading: tagsLoading } = useSelector((state) => state.tag);
  const { isLoading: commentLoading, allComments } = useSelector(
    (state) => state.comment,
  );

  useEffect(() => {
    dispatch(getPost({ id }));
    dispatch(getAllTags());
    dispatch(getAllComments({ id }));
  }, []);

  if (error) {
    return <Nothing />;
  }
  return (
    <Container className="mt-3">
      <Row>
        <Col md={9} className="d-flex flex-column align-items-center">
          {postLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <PostInfo />
          )}
          <h1 className="mt-4 align-self-start justify-content-center d-flex align-items-center">
            Comments
            <span
              style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.5)' }}
              className="mt-2 ms-3"
            >
              x
              {post.answerCount}
            </span>
          </h1>
          {commentLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <div className="d-flex flex-column align-items-center w-100">
              {allComments.length ? (
                <div className="d-flex flex-column align-items-center w-100">
                  {allComments.map((comment) => (
                    <CommentInfo
                      comment={comment.comment}
                      commentVote={comment.commentVote}
                      key={comment.comment.id}
                    />
                  ))}
                </div>
              ) : (
                <h5>There seems to be no comment here...</h5>
              )}
            </div>
          )}
          <Answer />
        </Col>

        <Col md={3} className="d-flex flex-column align-items-center mt-1">
          {tagsLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <TagsSideBar filter={{}} filterControl={() => {}} />
          )}
        </Col>
      </Row>
    </Container>
  );
};
