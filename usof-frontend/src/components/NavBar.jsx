import React from 'react';
import {
  Container, Navbar, Nav, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { SERVER_URL } from '../utils/constants';
import '../styles/NavBar.css';
import { SignInOn, SignUpOn } from '../store/modalSlice';
import logo from '../assets/logo.png';
import logout from '../assets/logout.png';
import { logOut } from '../store/authSlice';

export const NavBar = () => {
  const { me, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar className="NavBarMain" bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">
            <img src={logo} height="35" alt="Logo" />
          </NavLink>
        </Navbar.Brand>
        {isAuthenticated ? (
          <Nav>
            <Nav.Item
              className="d-flex justify-content-center align-items-center NavProfile"
              onClick={() => {
                navigate('/profile');
              }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span style={{ fontSize: '20px' }}>{me.login}</span>
                {me.role === 'admin' ? (
                  <span style={{ fontSize: '10px', color: '#a57926' }}>{me.role}</span>
                ) : (
                  <div />
                )}
              </div>
              <div>
                <img
                  className="NavAva"
                  src={`${SERVER_URL}/avatars/${me.avatar}`}
                  alt="ava"
                />
              </div>
            </Nav.Item>
            <Nav.Item
              className="d-flex flex-column justify-content-center align-items-center NavLogout"
              onClick={() => { dispatch(logOut()); }}
            >
              <img src={logout} height="30" alt="logout" />
              <span style={{ fontSize: '10px' }}>Logout</span>
            </Nav.Item>
          </Nav>
        ) : (
          <Nav className="d-flex justify-content-around">
            <Nav.Item>
              <Button
                className="signInBtn"
                variant="outline-warning"
                onClick={() => dispatch(SignInOn())}
              >
                Sign In
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button
                className="signUnBtn"
                variant="warning"
                onClick={() => dispatch(SignUpOn())}
              >
                Sign Up
              </Button>
            </Nav.Item>
          </Nav>
        )}
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};
