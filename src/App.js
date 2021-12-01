import { useState } from 'react';
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

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(({ id, src }) => (
          <Card key={id} imageSource={src} />
        ))}
      </div>
    </div>
  );
};

export default App;
