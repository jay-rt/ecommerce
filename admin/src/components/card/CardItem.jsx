import VisibilityIcon from "@mui/icons-material/Visibility";
import "./carditem.scss";

const CardItem = () => {
  return (
    <li className="card-item">
      <img
        src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
        className="card-img"
      />
      <div className="card-user">
        <span className="username">Anna Keller</span>
        <span className="position">Software Engineer</span>
      </div>
      <button className="card-btn">
        <VisibilityIcon className="card-icon" />
        Display
      </button>
    </li>
  );
};

export default CardItem;
