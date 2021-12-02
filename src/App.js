import { useState, useEffect } from 'react';
import Card from './components/Card';

import './App.css';

const cardImages = [
  { src: '/images/helmet-1.png' },
  { src: '/images/ring-1.png' },
  { src: '/images/scroll-1.png' },
  { src: '/images/shield-1.png' },
  { src: '/images/sword-1.png' },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(null);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

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
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
  };

  useEffect(() => {
    if (choiceTwo) {
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        console.log('MATCH');
      } else {
        console.log('DOESN"T MATCH');
      }

      resetTurn();
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
};

export default App;
