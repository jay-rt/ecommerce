import Chart from "../../components/chart/Chart";
import UserCard from "../../components/cards/user/UserCard";
import BasicTable from "../../components/tables/basic/Basictable";
import Widget from "../../components/widget/Widget";
import useValues from "../../hooks/useValues";
import "./home.scss";

import { widgetData } from "../../widgetData";
import useIncome from "../../hooks/useIncome";
import useStats from "../../hooks/useStats";

const Home = () => {
  const users = useValues("/users?new=true", "Users");
  const orders = useValues("/orders?new=true", "Orders");
  const userStats = useStats("/users/stats", "user");
  const income = useIncome();

  return (
    <div className="home">
      <div className="widgets">
        <Widget data={widgetData.user} />
        <Widget data={widgetData.order} />
        <Widget
          data={widgetData.earning}
          current={income.current}
          previous={income.previous}
        />
        <Widget data={widgetData.balance} />
      </div>
      <div className="center">
        <UserCard users={users} />
        <Chart
          title="New Users (Last Year)"
          aspect={2.5 / 1}
          data={userStats}
        />
      </div>

      <div className="table-container">
        <h1 className="list-title">Latest Transactions</h1>
        <BasicTable orders={orders} />
      </div>
    </div>
  );
};

export default Home;
