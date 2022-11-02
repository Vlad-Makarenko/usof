import React, { useEffect } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Switch, useDarkreader } from 'react-darkreader';

import { SERVER_URL } from '../utils/constants';
import '../styles/NavBar.css';
import { SignInOn, SignUpOn } from '../store/modalSlice';
import logo from '../assets/miniLogo.png';
import logout from '../assets/logout.png';
import { logOut } from '../store/authSlice';

export const NavBar = () => {
  const { me, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDark, { toggle }] = useDarkreader(localStorage.getItem('theme') === 'true');

  useEffect(() => {
    localStorage.setItem('theme', isDark);
  }, [isDark]);

  return (
    <Navbar className="NavBarMain" bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand className="p-0">
          <Container
            onClick={() => navigate('/')}
            className="d-flex justify-content-center align-items-center p-0"
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} height="40" alt="Logo" />
            <span style={{ fontSize: '24px' }}>Stack</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '3px' }}>
              overclone
            </span>
          </Container>
        </Navbar.Brand>
        {isAuthenticated ? (
          <Nav>
            <Nav.Item className="d-flex flex-column justify-content-center align-items-center me-2">
              <Switch checked={isDark} onChange={toggle} styling="github" />
            </Nav.Item>
            <OverlayTrigger
              key="profile"
              delay={{ show: 300 }}
              placement="bottom"
              overlay={<Tooltip id="tooltip-bottom">Profile</Tooltip>}
            >
              <Nav.Item
                className="d-flex justify-content-center align-items-center NavProfile"
                onClick={() => {
                  navigate(`/users/${me.id}`);
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <span style={{ fontSize: '20px' }}>{me.login}</span>
                  {me.role === 'admin' ? (
                    <span style={{ fontSize: '10px', color: '#a57926' }}>
                      {me.role}
                    </span>
                  ) : (
                    <div />
                  )}
                </div>
                <div>
                  <img
                    className="NavAva ms-2"
                    src={`${SERVER_URL}/avatars/${me.avatar}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = `${AVATAR_URL}/default.png`;
                    }}
                    height="45px"
                    alt="ava"
                  />
                </div>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger
              key="logout"
              delay={{ show: 300 }}
              placement="bottom"
              overlay={<Tooltip id="tooltip-bottom">Logout</Tooltip>}
            >
              <Nav.Item
                className="d-flex flex-column justify-content-center align-items-center NavLogout"
                onClick={() => {
                  dispatch(logOut());
                }}
              >
                <img src={logout} height="35" alt="logout" />
              </Nav.Item>
            </OverlayTrigger>

          </Nav>
        ) : (
          <Nav className="d-flex justify-content-around">
            <Nav.Item className="d-flex flex-column justify-content-center align-items-center">
              <Switch checked={isDark} onChange={toggle} styling="github" />
            </Nav.Item>
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
                className="signUnBtn me-2"
                variant="warning"
                onClick={() => dispatch(SignUpOn())}
              >
                Sign Up
              </Button>
            </Nav.Item>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
