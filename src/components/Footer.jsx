/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  Github, Instagram, Telegram, Twitter,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/miniLogo.png';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container className="footerMain p-3 pb-2" fluid>
      <Row>
        <Col md={6}>
          <Container
            onClick={() => navigate('/')}
            className="d-flex align-items-center justify-content-end pe-5"
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} height="40" alt="Logo" />
            <span style={{ fontSize: '24px' }}>Stack</span>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginLeft: '3px',
              }}
            >
              overclone
            </span>
          </Container>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)' }}

        >
          <Container
            className="d-flex align-items-center  justify-content-start ps-5"
          >
            <a
              href="https://t.me/VladMakarenko"
              target="_blank"
              className="me-2"
              rel="noreferrer"
            >
              <Telegram color="black" />
            </a>
            <a
              href="https://www.instagram.com/_vlad_makarenko_"
              target="_blank"
              className="ms-2 me-2"
              rel="noreferrer"
            >
              <Instagram color="black" />
            </a>
            <a
              href="https://twitter.com/_Vlad_Makarenko"
              target="_blank"
              className="ms-2 me-2"
              rel="noreferrer"
            >
              <Twitter color="black" />
            </a>
            <a
              href="https://github.com/Vlad-Makarenko"
              target="_blank"
              className="ms-2 me-2"
              rel="noreferrer"
            >
              <Github color="black" />
            </a>
          </Container>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-end pe-4"
        >
          <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Noncommercial</span>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-start ps-4"
          style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)' }}
        >
          <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Educational</span>
        </Col>
      </Row>
    </Container>
  );
};
