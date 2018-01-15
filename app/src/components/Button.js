import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({children, onClick, type, disabled, tooltip}) => (
  <button
    className={ type ? `Button ${type}` : 'Button' }
    onClick={ onClick }
    disabled={ disabled === null ? false : disabled }
    title={ tooltip }>
    { children }
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string
};

export default Button;
