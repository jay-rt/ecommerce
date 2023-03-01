import "./card.scss";
import CardItem from "./CardItem";

const Card = () => {
  return (
    <div className="card">
      <h1 className="card-title">Newly Joined Members</h1>
      <ul className="card-list">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </ul>
    </div>
  );
};

export default Card;
