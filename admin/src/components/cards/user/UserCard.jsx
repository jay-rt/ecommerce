import "./usercard.scss";
import CardItem from "./UserCardItem";

const UserCard = ({ users }) => {
  return (
    <div className="user-card">
      <h1 className="card-title">Newly Joined Members</h1>
      <ul className="card-list">
        {users.map((user) => (
          <CardItem user={user} key={user._id} />
        ))}
      </ul>
    </div>
  );
};

export default UserCard;
