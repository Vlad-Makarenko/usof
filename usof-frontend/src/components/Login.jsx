/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { At, PersonFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import { PswdInput } from './PswdInput';
import faq from '../assets/auth.png';
import '../styles/Auth.css';
import { SignInOff, SignUpOn } from '../store/modalSlice';
import { useMessage } from '../hooks/message.hook';
import { clearError, signIn } from '../store/authSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const message = useMessage();
  const [form, setForm] = useState({
    login: '',
    email: '',
    password: '',
  });
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const signInHandler = () => {
    dispatch(signIn(form));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(SignInOff());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      message(error, 'error');
      dispatch(clearError());
    }
  }, [error]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Row>
        <Col
          md={{ span: 5, offset: 1 }}
          className="d-flex flex-column justify-content-center align-items-center signInForm"
        >
          <h2>Sign In</h2>
          <label htmlFor="email" style={{ alignSelf: 'start' }}>
            Email:
          </label>
          <Container
            className="d-flex align-items-center authForm"
            style={{ width: '100%' }}
          >
            <At color="orange" />
            <input
              type="text"
              onChange={changeHandler}
              value={form.email}
              name="email"
              className="authInput"
              placeholder="Email"
            />
          </Container>
          <label htmlFor="login" style={{ alignSelf: 'start' }}>
            Login:
          </label>
          <Container
            className="d-flex align-items-center authForm"
            style={{ width: '100%' }}
          >
            <PersonFill color="orange" />
            <input
              type="text"
              onChange={changeHandler}
              value={form.login}
              name="login"
              className="authInput"
              placeholder="Login"
            />
          </Container>
          <label htmlFor="password" style={{ alignSelf: 'start' }}>
            Password:
          </label>
          <PswdInput
            changeHandler={changeHandler}
            passwordInput={form.password}
          />
          <span>
            Forgot your password?
            <span
              style={{ color: 'orange', cursor: 'pointer' }}
              onClick={() => {
                dispatch(SignInOff());
                dispatch(SignUpOn());
              }}
            >
              {'  '}
              Reset
            </span>
          </span>
          <Button
            className="mt-2 mb-2"
            variant="warning"
            style={{ width: '100%' }}
            onClick={signInHandler}
          >
            Sign In
          </Button>
          <p>
            Don’t have an account?
            <span
              style={{ color: 'orange', cursor: 'pointer' }}
              onClick={() => {
                dispatch(SignInOff());
                dispatch(SignUpOn());
              }}
            >
              {'  '}
              Sign Up
            </span>
          </p>

        </Col>
        {isLoading
          ? (
            <Col
              md={{ span: 5, offset: 1 }}
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner animation="border" variant="warning" />
            </Col>
          )
          : (
            <Col
              md={{ span: 5, offset: 1 }}
              className="d-flex justify-content-center align-items-center"
            >
              <img src={faq} width="100%" alt="aurh" />
            </Col>
          )}
      </Row>
    </Container>
  );
};
