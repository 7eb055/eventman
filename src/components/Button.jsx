import React from 'react'

import './css/Button.css';


function Button({ children, onClick, disabled, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant}`}
    >
      {children}
    </button>
  );
}

export default Button;

