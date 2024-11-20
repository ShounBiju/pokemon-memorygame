import { useEffect, useState } from 'react';
import './App.css';
import PokemonLogo from './Assets/PokemonLogo.png';
import ButtonStyle from './Components/ButtonStyle';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { "src": "/img/jigglypuf-1.jpg", matched: false },
  { "src": "/img/meowth-1.jpg", matched: false },
  { "src": "/img/meowtwo-1.jpg", matched: false },
  { "src": "/img/pikachu-1.jpg", matched: false },
  { "src": "/img/psyduck-1.jpg", matched: false },
  { "src": "/img/snorelax-1.jpg", matched: false }
];

function App() {
  const [cards, setCards] =useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [ ...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  };
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }


  //compare 2 selected cards
  useEffect(() => {
    

    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])

  console.log(cards)

  //reset choises and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <img
        src={PokemonLogo}
        alt="Pokemon Logo"
        className="logo"
      />
      <div className="button-container">
        <ButtonStyle onClick={shuffleCards} />
        <p className="play-text">Play Game</p>
      </div>

      <div className='card-grid'>
        {cards.map(card => (
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
