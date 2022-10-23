import React, { useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';

export const Main = () => {
  const [info, setInfo] = useState('Main Page');
  const register = useCallback(() => {}, []);
  return (
    <Container>
      <h1>{info}</h1>
    </Container>
  );
};
