import React from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/Modal.css';

export const ModalWin = ({ show, onHide, children }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    animation={false}
    className="modalWin"
  >
    <Modal.Header style={{ border: '0' }} closeButton />
    <Modal.Body
      style={{ textAlign: 'center' }}
      className="d-flex flex-column align-items-center"
    >
      {children}
    </Modal.Body>
  </Modal>
);
