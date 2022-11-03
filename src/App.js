/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import { useRoutes } from './hooks/routes.hook';
import { NavBar } from './components/NavBar';

import './App.css';
import { checkAuth, tokenAuth } from './store/authSlice';
import { LeftSideBar } from './components/LeftSideBar';
import { useModal } from './hooks/modal.hook';
import { Footer } from './components/Footer';

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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(tokenAuth());
      dispatch(checkAuth());
    }
  }, []);

  return (
    <Router>
      <NavBar />
      <Container>
        <Row>
          <Col md={2} className="ColSideBar">
            {/* <div className="DivSideBar"> */}
            <LeftSideBar />
            {/* </div> */}
          </Col>
          <Col md={10} id="page-content-wrapper">
            <div className="App">{routes}</div>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ScrollToTop />
      <ToastContainer />
      {modals}
    </Router>
  );
};

export default App;
