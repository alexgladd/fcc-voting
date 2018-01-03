import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({text, onClick, type, disabled}) => (
  <button
    className={ type ? `Button ${type}` : 'Button'}
    onClick={onClick}
    disabled={disabled === null ? false : disabled}>
    { text }
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
