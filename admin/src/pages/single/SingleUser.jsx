import { useParams } from "react-router-dom";
import InfoCard from "../../components/cards/info/InfoCard";
import Chart from "../../components/chart/Chart";
import Basictable from "../../components/tables/basic/BasicTable";
import useStats from "../../hooks/useStats";
import useValues from "../../hooks/useValues";
import "./single.scss";

const SingleUser = () => {
  const { id } = useParams();
  const user = useValues(`/users/find/${id}`, "User");
  const income = useStats(`/orders/income?uid=${id}`, "income");
  const orders = useValues(`/orders/user/${id}`);

  const data = [
    { id: "id", label: "ID: ", value: user._id },
    { id: "name", label: "Username: ", value: user.username },
    { id: "admin", label: "Admin: ", value: user.inAdmin ? "Yes" : "No" },
  ];

  return (
    <div className="single">
      <div className="top">
        <InfoCard
          title={user.firstname + " " + user.lastname}
          img={user.image}
          data={data}
        />
        <Chart title="User Spending" aspect={3 / 1} data={income} />
      </div>
      <div className="bottom">
        <h1 className="title">Last Transaction</h1>
        <Basictable orders={orders} />
      </div>
    </div>
  );
};

export default SingleUser;
