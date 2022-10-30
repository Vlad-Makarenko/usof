/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Spinner } from 'react-bootstrap';
import { PswdInput } from '../components/PswdInput';
import { resetPassword } from '../store/authSlice';
import faq from '../assets/background.png';
import { SignInOn } from '../store/modalSlice';

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, success } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    password: '',
    repeatedPassword: '',
  });

  useEffect(() => {
    if (success) {
      dispatch(SignInOn());
      navigate('/');
    }
  }, [success]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const resetHandler = (event) => {
    event.preventDefault();
    dispatch(resetPassword({ token, ...form }));
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center mt-3">
      <form onSubmit={resetHandler} className="d-flex flex-column align-items-center w-50 mb-5">
        <h1>Reset Password</h1>
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
        <Button
          type="submit"
          className="mt-2 mb-2 waves-effect"
          variant="warning"
          style={{ width: '100%' }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" variant="black" /> : 'Reset password' }
        </Button>
      </form>
      <img src={faq} width="80%" alt="auth" />
    </Container>
  );
};
