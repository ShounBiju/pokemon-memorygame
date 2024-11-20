import React from 'react';
import './ButtonStyle.css';  

// Accept the onClick prop here
const ButtonStyle = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>  
      <div className="loader" />
    </button>
  );
};

export default ButtonStyle;
