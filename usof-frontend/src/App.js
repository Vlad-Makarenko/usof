/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { useRoutes } from './hooks/routes.hook';
import { NavBar } from './components/NavBar';
import { ModalWin } from './components/ModalWin';
import { SignInOff, SignUpOff } from './store/modalSlice';

import './App.css';
import { Login } from './components/Login';
import { useMessage } from './hooks/message.hook';
import { checkAuth } from './store/authSlice';

const App = () => {
  const routes = useRoutes();
  const dispatch = useDispatch();
  const { signIn, signUp } = useSelector((state) => state.modal);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  // const message = useMessage();
  // const { error } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   message(error, 'error');
  //   console.log(error);
  // }, [error]);
  return (
    <Router>
      <NavBar />
      <div className="App">{routes}</div>
      <ToastContainer />
      <ModalWin show={signIn} onHide={() => dispatch(SignInOff())}>
        <Login />
      </ModalWin>
      <ModalWin show={signUp} onHide={() => dispatch(SignUpOff())}>
        <h1>Sign Up</h1>
      </ModalWin>
    </Router>
  );
};

export default App;
