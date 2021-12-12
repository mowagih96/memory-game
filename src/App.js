import { useState, useEffect } from 'react';
import Card from './components/Card';

import './App.css';

const cardImages = [
  { src: '/images/helmet-1.png', matched: false, disabled: false },
  { src: '/images/ring-1.png', matched: false, disabled: false },
  { src: '/images/scroll-1.png', matched: false, disabled: false },
  { src: '/images/shield-1.png', matched: false, disabled: false },
  { src: '/images/sword-1.png', matched: false, disabled: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(null);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [canFlip, setCanFlip] = useState(true);

  const initGame = () => {
    resetTurn();
    shuffleCards();
  };

  const shuffleCards = () => {
    // TODO:
    // 1. Use images API instead
    // 2. Use UUID instead

    const seed = Math.random() - 0.5;
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => (seed < 0 ? -1 : seed > 0 ? 1 : 0))
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);

    console.log(shuffledCards);
  };

  const handleChoice = (card) =>
    choiceOne && choiceOne?.id !== card.id
      ? setChoiceTwo(card)
      : setChoiceOne(card);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setCanFlip(true);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        console.log('MATCH');
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );

        resetTurn();
      } else {
        console.log('DOESN"T MATCH');
        setCanFlip(false);
        setTimeout(() => resetTurn(), 2000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <button onClick={initGame}>New Game</button>

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
