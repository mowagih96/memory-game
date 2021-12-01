import './Card.css';

const Card = ({ imageSource }) => {
  return (
    <div className="card">
      <div>
        <img className="front" src={imageSource} alt="card front" />
        <img className="back" src="/images/cover.png" alt="card back" />
      </div>
    </div>
  );
};

export default Card;
