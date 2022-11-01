/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import {
  ChatTextFill,
  ClockFill,
  HandThumbsUpFill,
  PenFill,
  PersonFill,
  PostcardFill,
} from 'react-bootstrap-icons';
import Moment from 'react-moment';
import { Nothing } from '../components/Nothing';
import { getUser } from '../store/userSlice';
import { Filters } from '../components/Filters';
import { AVATAR_URL, DEFAUL_FILTERS } from '../utils/constants';
import { PostPagination } from '../components/PostPagination';
import { PostCard } from '../components/PostCard';
import { ProfileEditOn } from '../store/modalSlice';

export const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading: userLoading,
    user,
    error,
  } = useSelector((state) => state.user);
  const { isLoading: postsLoading, currentPagePosts } = useSelector(
    (state) => state.post,
  );
  const { me } = useSelector((state) => state.auth);
  const [localFilter, setLocalFilter] = useState(DEFAUL_FILTERS);

  useEffect(() => {
    dispatch(getUser({ id }));
  }, [id]);

  if (error) {
    return <Nothing />;
  }
  return (
    <Container className="mt-3">
      <Row>
        <Col md={3} className="d-flex flex-column align-items-center mt-2 p-0">
          {userLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <Row>
              <Col
                md={12}
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  src={`${AVATAR_URL}/${user.profile_picture}`}
                  width="80%"
                  alt="avatar"
                  className="NavAva"
                />
              </Col>
              <Col
                md={12}
                className="d-flex align-items-center justify-content-center mt-1"
              >
                <h3>{user.full_name}</h3>
              </Col>
              <Col
                md={{ span: 2, offset: 1 }}
                className="d-flex align-items-center justify-content-end mt-3"
              >
                <ClockFill color="orange" className="" />
              </Col>
              <Col md={{ span: 9 }} className="d-flex align-items-center mt-3">
                <h6>
                  Member for
                  {' '}
                  <Moment trim durationFromNow>
                    {user.createdAt}
                  </Moment>
                </h6>
              </Col>
              <Col
                md={{ span: 2, offset: 1 }}
                className="d-flex align-items-center justify-content-end mt-1"
              >
                <PersonFill color="orange" className="" />
              </Col>
              <Col md={{ span: 9 }} className="d-flex align-items-center mt-1">
                <h6>{user.login}</h6>
              </Col>
              <Col
                md={{ span: 2, offset: 1 }}
                className="d-flex align-items-center justify-content-end mt-1"
              >
                <HandThumbsUpFill color="orange" className="" />
              </Col>
              <Col md={{ span: 9 }} className="d-flex align-items-center mt-1">
                <h6>
                  {user.rating}
                  {' '}
                  reputation
                </h6>
              </Col>
              <Col
                md={{ span: 2, offset: 1 }}
                className="d-flex align-items-center justify-content-end mt-1"
              >
                <PostcardFill color="orange" className="" />
              </Col>
              <Col md={{ span: 9 }} className="d-flex align-items-center mt-1">
                <h6>
                  {user.postsCount}
                  {' '}
                  posts
                </h6>
              </Col>
              <Col
                md={{ span: 2, offset: 1 }}
                className="d-flex align-items-center justify-content-end mt-1"
              >
                <ChatTextFill color="orange" className="" />
              </Col>
              <Col md={{ span: 9 }} className="d-flex align-items-center mt-1">
                <h6>
                  {user.commentsCount}
                  {' '}
                  comments
                </h6>
              </Col>
              {(user.id === me.id || me.role === 'admin') && (
              <Col
                md={12}
                className="d-flex align-items-center justify-content-center mt-2"
              >
                <Button
                  variant="outline-warning"
                  className="d-flex align-items-center justify-content-center pt-1 pb-1"
                  onClick={() => dispatch(ProfileEditOn())}
                >
                  <PenFill color="orange" className="me-2" />
                  <h6 className="mt-1">Edit profile</h6>
                </Button>

              </Col>
              )}
            </Row>
          )}
        </Col>
        <Col md={9}>
          <Filters
            localFilter={localFilter}
            setLocalFilter={setLocalFilter}
            isUser={id}
          />
          <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }} />
          <Col
            md={12}
            className="d-flex flex-column align-items-center justify-content-between mt-4"
          >
            {postsLoading ? (
              <Spinner animation="border" variant="warning" />
            ) : (
              <>
                {currentPagePosts.length ? (
                  <>
                    {currentPagePosts?.map((post) => (
                      <PostCard post={post} key={post.id} />
                    ))}
                  </>
                ) : (
                  <Nothing />
                )}
              </>
            )}
          </Col>
          <Col
            md={12}
            className="d-flex align-items-center justify-content-center"
          >
            <PostPagination />
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
