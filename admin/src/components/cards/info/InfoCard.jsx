import { Link } from "react-router-dom";
import "./infocard.scss";

const InfoCard = ({ title, img, data, link }) => {
  return (
    <div className="info-card">
      <Link to={link} className="link">
        <div className="btn-edit">Edit</div>
      </Link>
      <h1 className="title">Information</h1>
      <div className="item">
        <img
          src={
            img
              ? img
              : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          }
          alt=""
          className="item-img"
        />
        <div className="details">
          <h1 className="item-title">{title}</h1>
          {data.map((item) => (
            <div className="item-detail" key={item.id}>
              <span className="item-key">{item.label}</span>
              <span className="item-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
