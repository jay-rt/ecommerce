import Chart from "../../components/chart/Chart";
import Card from "../../components/card/Card";
import BasicTable from "../../components/tables/basic/Basictable";
import Widget from "../../components/widget/Widget";
import useValues from "../../hooks/useValues";
import "./home.scss";
import useUserStats from "../../hooks/useUserStats";
import { widgetData } from "../../widgetData";
import useIncome from "../../hooks/useIncome";

const Home = () => {
  const users = useValues("users");
  const orders = useValues("orders");
  const userStats = useUserStats();
  const income = useIncome();
  console.log(income);

  return (
    <div className="home">
      <div className="widgets">
        <Widget data={widgetData.user} />
        <Widget
          data={widgetData.order}
          current={income.current}
          previous={income.previous}
        />
        <Widget data={widgetData.earning} />
        <Widget data={widgetData.balance} />
      </div>
      <div className="center">
        <Card users={users} />
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
