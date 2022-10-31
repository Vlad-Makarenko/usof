/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import {
  HandThumbsUpFill, ChatTextFill, Clock, BookmarkFill,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { AVATAR_URL } from '../utils/constants';
import '../styles/Card.css';

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <Container className="PostCard w-100 m-2 pb-3 pt-2">
      <Row>
        <Col
          md={2}
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ color: 'rgba(0, 0, 0, 0.6)' }}
        >
          <OverlayTrigger
            key="like"
            delay={{ show: 300 }}
            placement="left"
            overlay={<Tooltip id="tooltip-left">Likes</Tooltip>}
          >
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-2">{post.likeCount}</span>
              <HandThumbsUpFill color="orange" />
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            key="answers"
            delay={{ show: 300 }}
            placement="left"
            overlay={<Tooltip id="tooltip-left">Answers</Tooltip>}
          >
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-2">{post.answerCount}</span>
              <ChatTextFill color="orange" />
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            key="favorites"
            delay={{ show: 300 }}
            placement="left"
            overlay={<Tooltip id="tooltip-left">Favorites</Tooltip>}
          >
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-2">{post.favoriteCount}</span>
              <BookmarkFill color="orange" />
            </div>
          </OverlayTrigger>
        </Col>
        <Col md={8} className="p-0">
          <div className="d-flex flex-column align-items-start justify-content-center">
            <h5
              className="postTitle"
              style={{ maxWidth: '100%', wordWrap: 'break-word' }}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {post.title}
            </h5>
            <div className="w-100">
              <p style={{
                wordWrap: 'break-word', maxWidth: '100%',
              }}
              >
                {post.content.length > 100
                  ? `${post.content.slice(0, 100)}...`
                  : post.content}
              </p>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <OverlayTrigger
            key="author"
            delay={{ show: 300 }}
            placement="right"
            overlay={<Tooltip id="tooltip-right">Post author</Tooltip>}
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center userInfo"
              onClick={() => navigate(`/users/${post.author.id}`)}
            >
              <img
                src={`${AVATAR_URL}/${post.author.profile_picture}`}
                height="35"
                alt="avatar"
                className="NavAva m-0"
              />
              <span style={{ fontSize: '14px', marginTop: '3px' }}>
                {post.author.login}
              </span>
            </div>
          </OverlayTrigger>
        </Col>
        <Col md={12}>
          <div
            className="mt-2 mb-1"
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}
          />
        </Col>
        <Col md={8} className="mt-1 ps-5">
          {post.categories.map((tag) => (
            <Button
              key={tag.id}
              variant="warning"
              className="pe-2 ps-2 pt-0 pb-1 me-1"
            >
              <span style={{ fontSize: '14px' }}>{tag.title}</span>
            </Button>
          ))}
        </Col>
        <Col
          md={4}
          className="d-flex justify-content-end align-items-center"
          style={{ color: 'rgba(0, 0, 0, 0.5)' }}
        >
          <OverlayTrigger
            key="time"
            placement="right"
            delay={{ show: 300 }}
            overlay={(
              <Tooltip id="tooltip-right">
                <Moment format="D MMM YYYY, HH:mm">{post.createdAt}</Moment>
              </Tooltip>
            )}
          >
            <div className="d-flex align-items-center">
              <span>asked </span>
              <Moment fromNow className="ms-1">
                {post.createdAt}
              </Moment>
              <Clock className="me-3 ms-1 mt-1" />
            </div>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
};
