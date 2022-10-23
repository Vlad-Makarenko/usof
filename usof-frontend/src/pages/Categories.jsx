import React, { useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';

export const Categories = () => {
  const [info, setInfo] = useState('Categories Page');
  const register = useCallback(() => {}, []);
  return (
    <Container>
      <h1>{info}</h1>
    </Container>
  );
};
