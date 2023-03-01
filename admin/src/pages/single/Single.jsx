import Chart from "../../components/chart/Chart";
import Basictable from "../../components/tables/basic/Basictable";
import "./single.scss";

const Single = ({ title }) => {
  return (
    <div className="single">
      <div className="top">
        <div className="left">
          <div className="btn-edit">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt=""
              className="item-img"
            />
            <div className="details">
              <h1 className="item-title">Jane Doe</h1>
              <div className="item-detail">
                <span className="item-key">Email: </span>
                <span className="item-value">janedoe@gmail.com</span>
              </div>
              <div className="item-detail">
                <span className="item-key">Phone: </span>
                <span className="item-value">+1 234 567 8901</span>
              </div>
              <div className="item-detail">
                <span className="item-key">Address: </span>
                <span className="item-value">123 Unknown Street, New York</span>
              </div>
              <div className="item-detail">
                <span className="item-key">Country: </span>
                <span className="item-value">USA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Chart title={`${title} (Last 6 Months)`} aspect={3.5 / 1} />
        </div>
      </div>
      <div className="bottom">
        <h1 className="title">Last Transaction</h1>
        <Basictable />
      </div>
    </div>
  );
};

export default Single;
