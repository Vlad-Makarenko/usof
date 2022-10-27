import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const User = () => {
  const { id } = useParams();
  return (
    <Container>
      <h1>
        User
        {' '}
        {id}
      </h1>
    </Container>
  );
};
