import { useState } from 'react';
import './App.css';
import PokemonLogo from './Assets/PokemonLogo.png';
import ButtonStyle from './Components/ButtonStyle';

const cardImages = [
  { "src": "/img/charmander-1.jpeg" },
  { "src": "/img/jigglypuff-1.jpeg" },
  { "src": "/img/pikachu-1.jpeg" },
  { "src": "/img/meowth-1.webp" },
  { "src": "/img/poison-1.jpeg" },
  { "src": "/img/Snorelax-1.jpeg" }
];

function App() {
  const [cards, setCards] =useState([])
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [ ...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setCards(shuffledCards)
      setTurns(0)
  };

  console.log(cards, turns)
  return (
    <div className="App">
      <img
        src={PokemonLogo}
        alt="Pokemon Logo"
        className="logo"
      />
      <div className="button-container">
        {/* Pass the onClick prop to ButtonStyle */}
        <ButtonStyle onClick={shuffleCards} />
        <p className="play-text">Play Game</p>
      </div>
    </div>
  );
}

export default App;
