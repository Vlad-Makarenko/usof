/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { Col, Container, Row } from 'react-bootstrap';
import { useRoutes } from './hooks/routes.hook';
import { NavBar } from './components/NavBar';

import './App.css';
import { useMessage } from './hooks/message.hook';
import { checkAuth } from './store/authSlice';
import { LeftSideBar } from './components/LeftSideBar';
import { useModal } from './hooks/modal.hook';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const routes = useRoutes();
  const modals = useModal();
  const dispatch = useDispatch();
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
      <ScrollToTop />
      <ToastContainer />
      {modals}
    </Router>
  );
};

export default App;
