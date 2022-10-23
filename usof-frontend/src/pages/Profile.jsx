import React, { useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';

export const Profile = () => {
  const [info, setInfo] = useState('Profile Page');
  const register = useCallback(() => {}, []);
  return (
    <Container>
      <h1>{info}</h1>
    </Container>
  );
};
