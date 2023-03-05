import "./card.scss";
import CardItem from "./CardItem";

const Card = ({ users }) => {
  return (
    <div className="card">
      <h1 className="card-title">Newly Joined Members</h1>
      <ul className="card-list">
        {users.map((user) => (
          <CardItem user={user} key={user._id} />
        ))}
      </ul>
    </div>
  );
};

export default Card;
