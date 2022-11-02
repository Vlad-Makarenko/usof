/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  Button,
  Col, Container, OverlayTrigger, Row, Tooltip,
} from 'react-bootstrap';
import {
  Clock,
  HandThumbsDown,
  HandThumbsDownFill,
  HandThumbsUp,
  HandThumbsUpFill,
  PenFill,
  Trash3Fill,
} from 'react-bootstrap-icons';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_URL } from '../utils/constants';
import {
  createCommentLike, deleteComment, deleteCommentLike, setComment,
} from '../store/commentSlice';
import { EditCommentOn } from '../store/modalSlice';

export const CommentInfo = ({ comment, commentVote }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment);
  const { me } = useSelector((state) => state.auth);

  // const { isAuthenticated } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div />;
  }

  return (
    <Row
      // style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}
      style={{ border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '20px', backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
      className="w-100 pt-2 pb-2 mt-3"
    >
      <Col md={2} className="d-flex flex-column align-items-center pb-3">
        <Container
          fluid
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            color: 'rgba(0, 0, 0, 0.5)',
          }}
          className="d-flex flex-column align-items-center pb-2 pt-3"
        >
          <OverlayTrigger
            key="author"
            placement="left"
            delay={{ show: 300 }}
            overlay={<Tooltip id="tooltip-left">Comment author</Tooltip>}
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center userInfo"
              onClick={() => navigate(`/users/${comment.author.id}`)}
            >
              <img
                src={`${AVATAR_URL}/${comment.author?.profile_picture}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `${AVATAR_URL}/default.png`;
                }}
                height="35"
                alt="avatar"
                className="NavAva m-0"
              />
              <span style={{ fontSize: '14px', marginTop: '3px' }}>
                {comment.author?.login}
              </span>
            </div>
          </OverlayTrigger>
        </Container>
        <Container
          fluid
          style={{
            // borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            color: 'rgba(0, 0, 0, 0.5)',
          }}
          className="d-flex flex-column align-items-center pb-2 pt-2"
        >
          {commentVote?.type === 'like' ? (
            <HandThumbsUpFill
              style={{ cursor: 'pointer' }}
              size={20}
              color="green"
              onClick={() => dispatch(deleteCommentLike({ id: comment.id }))}
            />
          ) : (
            <HandThumbsUp
              style={{ cursor: 'pointer' }}
              size={20}
              onClick={() => dispatch(createCommentLike({ id: comment.id, type: 'like' }))}
            />
          )}
          <OverlayTrigger
            key="likeCount"
            placement="left"
            delay={{ show: 300 }}
            overlay={<Tooltip id="tooltip-left">Like count</Tooltip>}
          >
            <h3>{comment.likeCount}</h3>
          </OverlayTrigger>
          {commentVote?.type === 'dislike' ? (
            <HandThumbsDownFill
              style={{ cursor: 'pointer' }}
              size={20}
              color="red"
              onClick={() => dispatch(deleteCommentLike({ id: comment.id }))}
            />
          ) : (
            <HandThumbsDown
              style={{ cursor: 'pointer' }}
              size={20}
              onClick={() => dispatch(createCommentLike({ id: comment.id, type: 'dislike' }))}
            />
          )}
        </Container>
      </Col>
      <Col
        md={10}
        className="d-flex flex-column align-items-center justify-content-between"
        style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)' }}
      >
        <Container fluid className="mt-2">
          <p>{comment.content}</p>
        </Container>
        <Container
          className="d-flex justify-content-between"
          style={{ color: 'rgba(0, 0, 0, 0.5)' }}
        >
          {(me.id === comment.author?.id || me.role === 'admin') ? (
            <div className="d-flex align-items-center">
              {me.id === comment.author?.id && (
              <OverlayTrigger
                key="editComment"
                delay={{ show: 300 }}
                placement="bottom"
                overlay={<Tooltip id="tooltip-bottom">Edit comment</Tooltip>}
              >
                <Button
                  key="editBtn"
                  variant="outline-dark"
                  className="pe-2 ps-2 pt-0 pb-1 me-1"
                  onClick={() => {
                    dispatch(setComment(comment));
                    dispatch(EditCommentOn());
                  }}
                >
                  <PenFill />
                </Button>
              </OverlayTrigger>
              )}
              <OverlayTrigger
                key="delete"
                delay={{ show: 300 }}
                placement="bottom"
                overlay={<Tooltip id="tooltip-bottom">Delete comment</Tooltip>}
              >
                <Button
                  key="deleteBtn"
                  variant="outline-dark"
                  className="pe-2 ps-2 pt-0 pb-1 me-1"
                  onClick={() => {
                    dispatch(deleteComment({ id: comment.id }));
                  }}
                >
                  <Trash3Fill />
                </Button>
              </OverlayTrigger>
            </div>
          ) : <div />}
          <OverlayTrigger
            key="time"
            delay={{ show: 300 }}
            placement="bottom"
            overlay={(
              <Tooltip id="tooltip-bottom">
                <span>Created at </span>
                <Moment format="D MMM YYYY, HH:mm">{comment.createdAt}</Moment>
              </Tooltip>
            )}
          >
            <div className="d-flex align-items-center">
              <span>asked </span>
              <Moment fromNow className="ms-1">
                {comment.createdAt}
              </Moment>
              <Clock className="me-2 ms-1 mt-1" />
            </div>
          </OverlayTrigger>
        </Container>
      </Col>
      {/* <Col
        md={12}
        className="mt-2 ms-2"
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', width: '98%' }}
      /> */}
      {/* <Col
        md={12}
        className="d-flex justify-content-end align-items-center pt-2"
        style={{ color: 'rgba(0, 0, 0, 0.5)' }}
      >
        <OverlayTrigger
          key="time"
          delay={{ show: 300 }}
          placement="bottom"
          overlay={(
            <Tooltip id="tooltip-bottom">
              <span>Created at </span>
              <Moment format="D MMM YYYY, HH:mm">{comment.createdAt}</Moment>
            </Tooltip>
          )}
        >
          <div className="d-flex align-items-center">
            <span>asked </span>
            <Moment fromNow className="ms-1">
              {comment.createdAt}
            </Moment>
            <Clock className="me-2 ms-1 mt-1" />
          </div>
        </OverlayTrigger>
      </Col> */}
    </Row>
  );
};
