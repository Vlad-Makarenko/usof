/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import {
  Bookmark,
  BookmarkCheckFill,
  Clock,
  EyeFill,
  EyeSlashFill,
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
import { checkSaved } from '../utils/postsUtils';
import {
  addToFavorite,
  ceateLike,
  deleteLike,
  deletePost,
  removeFromFavorite,
  updatePost,
} from '../store/postSlice';
import { EditPostOn } from '../store/modalSlice';

export const PostInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, postVote, isLoading } = useSelector((state) => state.post);
  const { isAuthenticated, me } = useSelector((state) => state.auth);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      checkSaved(post.id).then((data) => setIsSaved(data));
    }
  }, [isAuthenticated]);

  const saveHandler = () => {
    if (isSaved) {
      dispatch(removeFromFavorite({ id: post.id }));
      setIsSaved(false);
    } else {
      dispatch(addToFavorite({ id: post.id }));
      setIsSaved(true);
    }
  };

  if (isLoading) {
    return <div />;
  }

  return (
    <Row
      // style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}
      style={{
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
      }}
      className="w-100 pt-2 pb-4 mt-1"
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
            delay={{ show: 300 }}
            placement="left"
            overlay={<Tooltip id="tooltip-left">Post author</Tooltip>}
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center userInfo"
              onClick={() => navigate(`/users/${post.author.id}`)}
            >
              <img
                src={`${AVATAR_URL}/${post.author?.profile_picture}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `${AVATAR_URL}/default.png`;
                }}
                height="35"
                alt="avatar"
                className="NavAva m-0"
              />
              <span style={{ fontSize: '14px', marginTop: '3px' }}>
                {post.author?.login}
              </span>
            </div>
          </OverlayTrigger>
        </Container>
        <Container
          fluid
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            color: 'rgba(0, 0, 0, 0.5)',
          }}
          className="d-flex flex-column align-items-center pb-2 pt-2"
        >
          {postVote?.type === 'like' ? (
            <HandThumbsUpFill
              style={{ cursor: 'pointer' }}
              size={20}
              color="green"
              onClick={() => dispatch(deleteLike({ id: post.id }))}
            />
          ) : (
            <HandThumbsUp
              style={{ cursor: 'pointer' }}
              size={20}
              onClick={() => dispatch(ceateLike({ id: post.id, type: 'like' }))}
            />
          )}
          <OverlayTrigger
            key="likeCount"
            delay={{ show: 300 }}
            placement="left"
            overlay={<Tooltip id="tooltip-left">Like count</Tooltip>}
          >
            <h3>{post.likeCount}</h3>
          </OverlayTrigger>
          {postVote?.type === 'dislike' ? (
            <HandThumbsDownFill
              style={{ cursor: 'pointer' }}
              size={20}
              color="red"
              onClick={() => dispatch(deleteLike({ id: post.id }))}
            />
          ) : (
            <HandThumbsDown
              style={{ cursor: 'pointer' }}
              size={20}
              onClick={() => dispatch(ceateLike({ id: post.id, type: 'dislike' }))}
            />
          )}
        </Container>
        <Container
          fluid
          style={{
            // borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            color: 'rgba(0, 0, 0, 0.5)',
          }}
          className="d-flex flex-column align-items-center pt-2"
        >
          <OverlayTrigger
            key="favorite"
            delay={{ show: 300 }}
            placement="left"
            overlay={<Tooltip id="tooltip-left">favorite</Tooltip>}
          >
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3>{post.favoriteCount}</h3>
              {isSaved ? (
                <BookmarkCheckFill
                  style={{ cursor: 'pointer' }}
                  size={30}
                  color="black"
                  onClick={saveHandler}
                />
              ) : (
                <Bookmark
                  style={{ cursor: 'pointer' }}
                  size={30}
                  onClick={saveHandler}
                />
              )}
            </div>
          </OverlayTrigger>
        </Container>
      </Col>
      <Col
        md={10}
        className="d-flex flex-column align-items-center justify-content-between"
        style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)' }}
      >
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between">
            <h2 style={{ maxWidth: '80%', wordWrap: 'break-word' }}>{post.title}</h2>
            {(me.id === post.author?.id || me.role === 'admin') && (
              <div className="d-flex align-items-center">
                <OverlayTrigger
                  key="status"
                  delay={{ show: 300 }}
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom">Change status</Tooltip>
                  }
                >
                  <Button
                    key="ChangeBtn"
                    variant="outline-dark"
                    className="pe-2 ps-2 pt-0 pb-1 me-1"
                  >
                    {post.status === 'active' ? (
                      <EyeFill
                        onClick={() => {
                          dispatch(updatePost({ ...post, status: 'inactive', categories: undefined }));
                        }}
                      />
                    ) : (
                      <EyeSlashFill
                        onClick={() => {
                          dispatch(updatePost({ ...post, status: 'active', categories: undefined }));
                        }}
                      />
                    )}
                  </Button>
                </OverlayTrigger>
                {me.id === post.author?.id && (
                  <OverlayTrigger
                    key="editPost"
                    delay={{ show: 300 }}
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-bottom">Edit post</Tooltip>}
                  >
                    <Button
                      key="editBtn"
                      variant="outline-dark"
                      className="pe-2 ps-2 pt-0 pb-1 me-1"
                      onClick={() => dispatch(EditPostOn())}
                    >
                      <PenFill />
                    </Button>
                  </OverlayTrigger>
                )}
                <OverlayTrigger
                  key="delete"
                  delay={{ show: 300 }}
                  placement="bottom"
                  overlay={<Tooltip id="tooltip-bottom">Delete post</Tooltip>}
                >
                  <Button
                    key="deleteBtn"
                    variant="outline-dark"
                    className="pe-2 ps-2 pt-0 pb-1 me-1"
                    onClick={() => {
                      dispatch(deletePost({ id: post.id }));
                      navigate('/');
                    }}
                  >
                    <Trash3Fill />
                  </Button>
                </OverlayTrigger>
              </div>
            )}
          </div>
          <p style={{
            whiteSpace: 'pre-line', wordWrap: 'break-word', maxWidth: '100%',
          }}
          >
            {post.content}
          </p>
        </Container>
      </Col>
      <Col
        md={12}
        className="mt-2 ms-2"
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', width: '98%' }}
      />
      <Col md={8} className="mt-1 ps-4 pt-2">
        {post.categories?.map((tag) => (
          <OverlayTrigger
            key={tag.title}
            delay={{ show: 300 }}
            placement="bottom"
            overlay={<Tooltip id="tooltip-bottom">{tag.description}</Tooltip>}
          >
            <Button
              key={tag.id}
              variant="warning"
              className="pe-2 ps-2 pt-0 pb-1 me-1"
            >
              <span style={{ fontSize: '14px' }}>{tag.title}</span>
            </Button>
          </OverlayTrigger>
        ))}
      </Col>
      <Col
        md={4}
        className="d-flex justify-content-end align-items-center pt-2"
        style={{ color: 'rgba(0, 0, 0, 0.5)' }}
      >
        <OverlayTrigger
          key="time"
          placement="bottom"
          delay={{ show: 300 }}
          overlay={(
            <Tooltip id="tooltip-bottom">
              <span>Created at </span>
              <Moment format="D MMM YYYY, HH:mm">{post.createdAt}</Moment>
            </Tooltip>
          )}
        >
          <div className="d-flex align-items-center">
            <span>asked </span>
            <Moment fromNow className="ms-1">
              {post.createdAt}
            </Moment>
            <Clock className="me-2 ms-1 mt-1" />
          </div>
        </OverlayTrigger>
        {post.isEdited ? (
          <OverlayTrigger
            key="edited"
            delay={{ show: 300 }}
            placement="bottom"
            overlay={(
              <Tooltip id="tooltip-bottom">
                <span>Updated at </span>
                <Moment format="D MMM YYYY, HH:mm">{post.updatedAt}</Moment>
              </Tooltip>
            )}
          >
            <div
              className="d-flex align-items-center"
              style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)' }}
            >
              <PenFill className="me-3 ms-2 mt-1" />
            </div>
          </OverlayTrigger>
        ) : (
          <div />
        )}
      </Col>
    </Row>
  );
};
