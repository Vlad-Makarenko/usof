/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { At, EmojiSmileFill, PersonCircle, PersonFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Auth.css';
import { editProfile, updateAvatar } from '../store/userSlice';

export const EditProfile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    login: '',
    email: '',
    full_name: '',
  });
  const [avatar, setAvatar] = useState(null);
  const { me } = useSelector((state) => state.auth);
  const { isLoading, user } = useSelector((state) => state.user);

  const editHandler = (e) => {
    e.preventDefault();
    dispatch(editProfile({ ...form, id: user.id }));
  };

  const avatarHandler = (e) => {
    if (avatar) {
      dispatch(updateAvatar({ avatar }));
    }
  };

  useEffect(() => {
    setForm({
      login: user.login,
      email: user.email,
      full_name: user.full_name,
    });
  }, [user]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <form
        onSubmit={editHandler}
        className="d-flex flex-column justify-content-center align-items-center signInForm"
      >
        <h2>Edit profile</h2>
        {me.id === user.id && (
        <label htmlFor="email" style={{ alignSelf: 'start' }}>
          Avatar:
        </label>
        )}
        {me.id === user.id && (
        <Container
          className="d-flex align-items-center authForm"
          style={{ width: '100%' }}
        >
          <PersonCircle color="orange" />
          <input
            type="file"
            onChange={(e) => { setAvatar(e.target.files[0]); }}
            name="avatar"
            className="authInput"
          />
          <Button
            type="submit"
            className="mt-2 mb-2 w-25"
            variant="warning"
            disabled={isLoading}
            onClick={avatarHandler}
          >
            {isLoading ? (
              <Spinner animation="border" variant="black" />
            ) : (
              'Update avatar'
            )}
          </Button>
        </Container>
        )}
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
          <EmojiSmileFill color="orange" />
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
          {isLoading ? (
            <Spinner animation="border" variant="black" />
          ) : (
            'Confirm edition'
          )}
        </Button>
      </form>
    </Container>
  );
};
