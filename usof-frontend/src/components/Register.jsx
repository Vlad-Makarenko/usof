/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { At, EmojiSmile, PersonFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import { PswdInput } from './PswdInput';
import { SignInOn, SignUpOff } from '../store/modalSlice';
import { useMessage } from '../hooks/message.hook';
import { signUp } from '../store/authSlice';
import faq from '../assets/background.png';
import '../styles/Auth.css';

export const Register = () => {
  const dispatch = useDispatch();
  const message = useMessage();
  const [form, setForm] = useState({
    login: '',
    email: '',
    password: '',
    repeatedPassword: '',
    full_name: '',
  });
  const { isLoading, isAuthenticated, success } = useSelector((state) => state.auth);

  const signUpHandler = (e) => {
    e.preventDefault();
    if (!form.login.length || !form.email.length || !form.password.length) {
      message('All fields must be filled', 'error');
    } else {
      dispatch(signUp(form));
    }
  };

  useEffect(() => {
    if (isAuthenticated || success) {
      dispatch(SignUpOff());
    }
  }, [isAuthenticated, success]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <form onSubmit={signUpHandler} className="d-flex flex-column justify-content-center align-items-center">
        <Row>

          <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
            <label htmlFor="email" style={{ alignSelf: 'start' }}>
              Email:
            </label>
            <Container
              className="d-flex align-items-center authForm"
              style={{ width: '100%' }}
            >
              <At color="orange" />
              <input
                type="email"
                required
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
                required
                type="text"
                onChange={changeHandler}
                value={form.login}
                name="login"
                className="authInput"
                placeholder="Login"
              />
            </Container>
            <label htmlFor="login" style={{ alignSelf: 'start' }}>
              Full Name:
            </label>
            <Container
              className="d-flex align-items-center authForm"
              style={{ width: '100%' }}
            >
              <EmojiSmile color="orange" />
              <input
                required
                type="text"
                onChange={changeHandler}
                value={form.full_name}
                name="full_name"
                className="authInput"
                placeholder="Full Name"
              />
            </Container>
            <Button
              type="submit"
              className="mt-2 mb-2 waves-effect"
              variant="warning"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" variant="black" /> : 'Sign Up' }
            </Button>
            <p>
              Already have an account?
              <span
                style={{ color: 'orange', cursor: 'pointer' }}
                onClick={() => {
                  dispatch(SignUpOff());
                  dispatch(SignInOn());
                }}
              >
                {'  '}
                Sign In
              </span>
            </p>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column align-items-center"
          >
            <label htmlFor="password" style={{ alignSelf: 'start' }}>
              Password:
            </label>
            <PswdInput
              changeHandler={changeHandler}
              passwordInput={form.password}
            />
            <label htmlFor="password" style={{ alignSelf: 'start' }}>
              Repeat password:
            </label>
            <PswdInput
              changeHandler={changeHandler}
              passwordInput={form.repeatedPassword}
              isRepeated
            />
            <Container className="d-flex align-items-center h-100">
              <img src={faq} width="100%" alt="auth" />
            </Container>
          </Col>
        </Row>
      </form>
    </Container>
  );
};
