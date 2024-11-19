import React from 'react';
import './ButtonStyle.css';  // Import your CSS file

// Accept the onClick prop here
const ButtonStyle = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>  {/* Pass it to the button element */}
      <div className="loader" />
    </button>
  );
};

export default ButtonStyle;
