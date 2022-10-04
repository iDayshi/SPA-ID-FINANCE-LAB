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
        <p>
          <span className="text-primary">Phone: </span>
          {signUpInfo.phone}
        </p>
        <p>
          <span className="text-primary">Email: </span>
          {signUpInfo.email}
        </p>
        <p>
          <span className="text-primary">Gender: </span>
          {personalInfo.sex}
        </p>
        <p>
          <span className="text-primary">Birthday: </span>
          {personalInfo.day +
            '.' +
            personalInfo.month +
            '.' +
            personalInfo.year}
        </p>
        <p>
          <span className="text-primary">Age: </span>
          {personalInfo.age}
        </p>
        <p>
          <span className="text-primary">Favorite ocean: </span>
          {personalInfo.ocean}
        </p>
        <p>
          <span className="text-primary">Hobbies: </span>
          {personalInfo.hobbies.reduce((acc: string, hobby: string) => {
            return acc + `  ${hobby}`;
          }, '')}
        </p>
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
