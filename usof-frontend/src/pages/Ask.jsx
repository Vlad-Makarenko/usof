import React from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import { AskInfo } from '../components/AskInfo';
import { PostForm } from '../components/PostForm';

export const Ask = () => (
  <Container className="mt-3">
    <Row>
      <Col
        md={12}
        className="d-flex flex-column mt-1 w-100 ps-4 pt-3 pb-3 mt-1 mb-4"
        style={{
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        }}
      >
        <AskInfo />
      </Col>
      <Col md={12}>
        <PostForm />
      </Col>
    </Row>
  </Container>
);
