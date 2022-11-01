/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { At } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import faq from '../assets/auth.png';
import {
  ResetPswdOff,
  SignInOn,
} from '../store/modalSlice';
import { resetPswd } from '../store/authSlice';
import '../styles/Auth.css';

export const ResetPswd = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    login: '',
  });
  const { isLoading, isAuthenticated, success } = useSelector(
    (state) => state.auth,
  );

  const resetHandler = (e) => {
    e.preventDefault();
    dispatch(resetPswd(form));
  };

  useEffect(() => {
    if (isAuthenticated || success) {
      dispatch(ResetPswdOff());
    }
  }, [isAuthenticated, success]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 5, offset: 1 }}>
          <h2>Reset password</h2>
          <p className="align-self-start ps-3 pe-1" style={{ textAlign: 'start', fontSize: '12px' }}>
            Enter the email from the account for which you want to reset the
            password. We will send a password reset link to this email.
          </p>
          <form
            onSubmit={resetHandler}
            className="d-flex flex-column justify-content-center align-items-center signInForm"
          >
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
            <Button
              type="submit"
              className="mt-2 mb-2 waves-effect"
              variant="warning"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" variant="black" />
              ) : (
                'Send mail'
              )}
            </Button>
            <span>
              Back to
              <span
                style={{ color: 'orange', cursor: 'pointer' }}
                onClick={() => {
                  dispatch(ResetPswdOff());
                  dispatch(SignInOn());
                }}
              >
                {'  '}
                Sign In
              </span>
            </span>
          </form>
        </Col>
        <Col
          md={{ span: 5, offset: 1 }}
          className="d-flex justify-content-center align-items-center"
        >
          <img src={faq} width="100%" alt="aurh" />
        </Col>
      </Row>
    </Container>
  );
};
