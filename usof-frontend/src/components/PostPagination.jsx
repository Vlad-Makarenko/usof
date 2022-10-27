/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../store/postSlice';
import '../styles/Card.css';

export const PostPagination = () => {
  const { totalPages, currentPage, filteredPosts } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();

  const pageHandler = (page) => {
    const posts = [...filteredPosts];
    dispatch(changePage({ page, posts }));
  };
  if (!totalPages) {
    return <div />;
  }

  return (
    <Pagination className="mt-3">
      <Pagination.First onClick={() => pageHandler(1)} />
      <Pagination.Prev
        disabled={currentPage - 1 < 1}
        onClick={() => pageHandler(currentPage - 1)}
      />
      <Pagination.Item onClick={() => pageHandler(1)}>{1}</Pagination.Item>
      <Pagination.Ellipsis disabled />

      {currentPage - 1 > 0 ? (
        <Pagination.Item onClick={() => pageHandler(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
      ) : (
        <></>
      )}
      <Pagination.Item active>{currentPage}</Pagination.Item>
      {currentPage + 1 <= totalPages ? (
        <Pagination.Item onClick={() => pageHandler(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      ) : (
        <></>
      )}
      {currentPage + 2 <= totalPages ? (
        <Pagination.Item onClick={() => pageHandler(currentPage + 2)}>
          {currentPage + 2}
        </Pagination.Item>
      ) : (
        <></>
      )}
      {currentPage + 3 <= totalPages ? (
        <Pagination.Item onClick={() => pageHandler(currentPage + 3)}>
          {currentPage + 3}
        </Pagination.Item>
      ) : (
        <></>
      )}

      <Pagination.Ellipsis disabled />
      <Pagination.Item onClick={() => pageHandler(totalPages)}>
        {totalPages}
      </Pagination.Item>
      <Pagination.Next
        disabled={currentPage + 1 > totalPages}
        onClick={() => pageHandler(currentPage + 1)}
      />
      <Pagination.Last onClick={() => pageHandler(totalPages)} />
    </Pagination>
  );
};
