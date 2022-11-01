import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getTag } from '../store/tagSlice';
import '../styles/Card.css';

export const Tag = ({ tag }) => {
  const dispath = useDispatch();
  return (
    <Card
      style={{ margin: '1%' }}
      className="TagCard"
      onClick={() => dispath(getTag({ id: tag.id }))}
    >
      <Card.Body>
        <Card.Title>{tag.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '13px' }}>
          {tag.questionsCount}
          {' '}
          questions
        </Card.Subtitle>
        <Card.Text style={{ fontSize: '12px' }}>{tag.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
