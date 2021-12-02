import './Card.css';

const Card = ({ card, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/images/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
