import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getSignUpInfo } from '../../store/signUpInfo';
import { getPersonalInfo } from '../../store/personalInfo';

function ModalWindow({ show, onHide }: { show: boolean; onHide: () => void }) {
  const signUpInfo = useSelector(getSignUpInfo());
  const personalInfo = useSelector(getPersonalInfo());
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{`Welcom ${
          personalInfo.firstName + ' ' + personalInfo.lastName
        }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Information User</p>
        <p>Phone:{signUpInfo.phone}</p>
        <p>Email:{signUpInfo.email}</p>
        <p>Gender: {personalInfo.sex}</p>
        <p>Favorite ocean: {personalInfo.ocean}</p>
        <p>Favorite ocean: {personalInfo.ocean}</p>
        <p>Favorite ocean: {personalInfo.ocean}</p>
        <p>Hobbies: {personalInfo.hobbies}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalWindow.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default ModalWindow;
