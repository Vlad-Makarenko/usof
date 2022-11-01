/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { EyeFill, EyeSlashFill, LockFill } from 'react-bootstrap-icons';

export const PswdInput = ({ changeHandler, passwordInput, isRepeated }) => {
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  return (
    <Container className="d-flex align-items-center authForm" style={{ width: '100%' }}>
      <LockFill color="orange" />
      <input
        required
        type={passwordType}
        onChange={changeHandler}
        value={passwordInput}
        name={isRepeated ? 'repeatedPassword' : 'password'}
        className="authInput"
        placeholder={isRepeated ? 'Repeate password' : 'Password'}
      />
      <div onClick={togglePassword} className="d-flex align-items-center">
        {passwordType === 'password' ? (
          <EyeFill color="orange" />
        ) : (
          <EyeSlashFill color="orange" />
        )}
      </div>
    </Container>
  );
};
