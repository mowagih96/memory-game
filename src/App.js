import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from './components/Card';
import './App.css';

const cardImages = [
  { src: '/images/helmet-1.png', name: 'helmet', matched: false },
  { src: '/images/ring-1.png', name: 'ring', matched: false },
  { src: '/images/scroll-1.png', name: 'scroll', matched: false },
  { src: '/images/shield-1.png', name: 'shield', matched: false },
  { src: '/images/sword-1.png', name: 'sword', matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [canFlip, setCanFlip] = useState(true);

  const initGame = () => {
    resetTurn(true);
    shuffleCards();
  };

  const shuffleCards = () => {
    // TODO:
    // 1. Use images API instead

    const seed = Math.random() - 0.5;
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => (seed < 0 ? -1 : seed > 0 ? 1 : 0))
      .map((card) => ({ ...card, id: uuidv4() }));

    setCards(shuffledCards);
  };

  const handleChoice = (card) =>
    choiceOne && choiceOne?.id !== card.id
      ? setChoiceTwo(card)
      : setChoiceOne(card);

  const resetTurn = (newGame = false) => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(newGame ? 0 : (prevTurn) => prevTurn + 1);
    setCanFlip(true);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.name === choiceTwo.name && choiceOne.id !== choiceTwo.id) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === choiceOne.name ? { ...card, matched: true } : card
          )
        );

        resetTurn();
      } else {
        setCanFlip(false);
        setTimeout(() => resetTurn(), 2000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <button
        style={{ cursor: !canFlip ? 'not-allowed' : 'pointer' }}
        onClick={initGame}
        disabled={!canFlip}
      >
        New Game
      </button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            enabled={canFlip}
            handleChoice={handleChoice}
          />
        ))}
      </div>

      {cards.length !== 0 && <p>Turns: {turns}</p>}
    </div>
  );
};

export default App;
