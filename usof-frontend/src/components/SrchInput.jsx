import React from 'react';
import { Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import '../styles/Card.css';

export const SrchInput = ({ searchInput, changeHandler }) => (
  <Container className="d-flex align-items-center serchForm">
    <Search color="orange" />
    <input
      type="text"
      onChange={changeHandler}
      value={searchInput}
      name="search"
      className="searchInput"
      placeholder="Search..."
    />
  </Container>
);
