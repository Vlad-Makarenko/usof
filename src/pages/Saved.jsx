/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { DEFAUL_FILTERS } from '../utils/constants';
import { TagsSideBar } from '../components/TagsSideBar';
import { PostCard } from '../components/PostCard';
import { Filters } from '../components/Filters';
import { PostPagination } from '../components/PostPagination';
import { Nothing } from '../components/Nothing';

export const Saved = () => {
  const { isLoading: postsLoading, currentPagePosts } = useSelector(
    (state) => state.post,
  );
  const { isLoading: tagsLoading } = useSelector((state) => state.tag);
  const [localFilter, setLocalFilter] = useState(DEFAUL_FILTERS);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={9}>
          <Filters localFilter={localFilter} setLocalFilter={setLocalFilter} isSaved />
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

        <Col md={3} className="d-flex flex-column align-items-center mt-1">
          {tagsLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <TagsSideBar filter={localFilter} filterControl={setLocalFilter} />
          )}
        </Col>
      </Row>
    </Container>
  );
};
