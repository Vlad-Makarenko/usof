/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { Col, Container, Row } from 'react-bootstrap';
import { useRoutes } from './hooks/routes.hook';
import { NavBar } from './components/NavBar';
import { ModalWin } from './components/ModalWin';
import {
  EditCommentOff, EditPostOff, ResetPswdOff, SignInOff, SignUpOff,
} from './store/modalSlice';

import './App.css';
import { Login } from './components/Login';
import { useMessage } from './hooks/message.hook';
import { checkAuth } from './store/authSlice';
import { LeftSideBar } from './components/LeftSideBar';
import { PostForm } from './components/PostForm';
import { Answer } from './components/Answer';
import { Register } from './components/Register';
import { ResetPswd } from './components/ResetPswd';

const App = () => {
  const routes = useRoutes();
  const dispatch = useDispatch();
  const {
    signIn, signUp, editPost, editComment, resetPswd,
  } = useSelector((state) => state.modal);
  const { error: postErr } = useSelector((state) => state.post);
  const { error: tagErr } = useSelector((state) => state.tag);
  const { error: authErr } = useSelector((state) => state.auth);
  const { error: userErr } = useSelector((state) => state.user);
  const { error: CommentErr } = useSelector((state) => state.comment);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  const message = useMessage();

  useEffect(() => {
    message(postErr, 'error');
  }, [postErr]);
  useEffect(() => {
    message(tagErr, 'error');
  }, [tagErr]);
  useEffect(() => {
    message(authErr, 'error');
  }, [authErr]);
  useEffect(() => {
    message(userErr, 'error');
  }, [userErr]);
  useEffect(() => {
    message(CommentErr, 'error');
  }, [CommentErr]);

  return (
    <Router>
      <NavBar />
      <Container>
        <Row>
          <Col md={2} className="ColSideBar">
            <div className="DivSideBar">
              <LeftSideBar />
            </div>
          </Col>
          <Col md={10} id="page-content-wrapper">
            <div className="App">{routes}</div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
      <ModalWin show={signIn} onHide={() => dispatch(SignInOff())}>
        <Login />
      </ModalWin>
      <ModalWin show={signUp} onHide={() => dispatch(SignUpOff())}>
        <Register />
      </ModalWin>
      <ModalWin show={resetPswd} onHide={() => dispatch(ResetPswdOff())}>
        <ResetPswd />
      </ModalWin>
      <ModalWin show={editPost} onHide={() => dispatch(EditPostOff())}>
        <PostForm isEditing />
      </ModalWin>
      <ModalWin show={editComment} onHide={() => dispatch(EditCommentOff())}>
        <Answer isEditing />
      </ModalWin>
    </Router>
  );
};

export default App;
