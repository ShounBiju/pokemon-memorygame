import './App.css';
import PokemonLogo from './Assets/PokemonLogo.png';
import ButtonStyle from './Components/ButtonStyle';
import { useState } from 'react';

function App() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // Reset animation after 300ms
  };

  return (
    <div className="App">
      <img
        src={PokemonLogo}
        alt="Pokemon Logo"
        className="logo"
      />
      <div className="button-container">
        <ButtonStyle isClicked={isClicked} onClick={handleClick} />
        <p className="play-text">Play Game</p>
      </div>
    </div>
  );
}

export default App;
