import VisibilityIcon from "@mui/icons-material/Visibility";
import "./carditem.scss";

const CardItem = ({ user }) => {
  return (
    <li className="card-item">
      <img
        src={
          user.img ||
          "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
        }
        alt=""
        className="card-img"
      />
      <div className="card-user">
        <span className="fullname">{user.firstname + " " + user.lastname}</span>
        <span className="username">{user.username}</span>
      </div>
      <button className="card-btn">
        <VisibilityIcon className="card-icon" />
        Display
      </button>
    </li>
  );
};

export default CardItem;
