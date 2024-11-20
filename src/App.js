import { useEffect, useState, useRef } from 'react';
import './App.css';
import PokemonLogo from './Assets/PokemonLogo.png';
import ButtonStyle from './Components/ButtonStyle';
import SingleCard from './Components/SingleCard';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; 

const cardImages = [
  { "src": "/img/jigglypuf-1.jpg", matched: false },
  { "src": "/img/meowth-1.jpg", matched: false },
  { "src": "/img/meowtwo-1.jpg", matched: false },
  { "src": "/img/pikachu-1.jpg", matched: false },
  { "src": "/img/psyduck-1.jpg", matched: false },
  { "src": "/img/snorelax-1.jpg", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const audioRef = useRef(null);  // Create a ref for the audio element
  const [isPlaying, setIsPlaying] = useState(true);  // Track if music is playing

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Play or Pause background music
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="App">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music/pokemon-bgm.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <img src={PokemonLogo} alt="Pokemon Logo" className="logo" />

      <div className="button-container">
        <ButtonStyle onClick={shuffleCards} />
        <p className="play-text">Play Game</p>
      </div>

      {/* Volume Icon */}
      <div className="volume-icon" onClick={toggleMusic}>
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
