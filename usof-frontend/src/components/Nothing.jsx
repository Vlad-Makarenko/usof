import React from 'react';
import { Container } from 'react-bootstrap';
import nothingImg from '../assets/nothing-found.png';

export const Nothing = () => (
  <Container className="w-100 d-flex flex-column justify-content-center align-items-center mb-3">
    <img src={nothingImg} className="w-25" alt="nothing" />
    <h1>Oops..</h1>
    <h3>nothing found</h3>
  </Container>
);
