import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AVATAR_URL } from '../utils/constants';
import '../styles/Card.css';

export const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ margin: '1%' }}
      className="TagCard d-flex flex-row justify-content-around align-items-center"
      onClick={() => {
        navigate(`/users/${user.id}`);
      }}
    >
      <Card.Img
        variant="start"
        height="60"
        width="60"
        src={`${AVATAR_URL}/${user.profile_picture}`}
        onErrorCapture={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = `${AVATAR_URL}/default.png`;
        }}
        className="NavAva ms-3"
      />
      <Card.Body>
        <Card.Title style={{ fontSize: '100%' }}>{user.login}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '13px' }}>
          {user.rating}
          {' '}
          reputation
        </Card.Subtitle>
        <Card.Text style={{ fontSize: '12px' }}>{user.full_name}</Card.Text>
      </Card.Body>
    </Card>
  );
};
