import React, { useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';

export const Auth = () => {
  const [info, setInfo] = useState('Auth Page');
  const register = useCallback(() => {}, []);
  return (
    <Container>
      <h1>{info}</h1>
    </Container>
  );
};
