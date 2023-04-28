/* eslint-disable react/prop-types */
import React from 'react';
import '../Atoms.css';

function Input({ type, value, placeholder, name }) {
  return (
    <div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        required
      />
    </div>
  );
}

export default Input;
