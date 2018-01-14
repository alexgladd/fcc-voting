import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ children }) => (
  <div className="Modal">
    { children }
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired
};

export default Modal;
