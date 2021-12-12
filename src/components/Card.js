import './Card.css';

const Card = ({ card, flipped, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/images/cover.png" alt="card back" />
      </div>
    </div>
  );
};

export default Card;
