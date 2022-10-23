import React, { useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';

export const User = () => {
  const [info, setInfo] = useState('User Page');
  return (
    <Container>
      <h1>{info}</h1>
    </Container>
  );
};
