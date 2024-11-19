import React, { useState } from 'react';
import './ButtonStyle.css';  // Import your CSS file

const ButtonStyle = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);  // Reset animation after 300ms
  };

  return (
    <button className="button" onClick={handleClick}>
      <div className={`loader ${isClicked ? 'isClicked' : ''}`} />
    </button>
  );
};

export default ButtonStyle;
