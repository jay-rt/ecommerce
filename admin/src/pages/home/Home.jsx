import Chart from "../../components/chart/Chart";
import Card from "../../components/card/Card";
import BasicTable from "../../components/tables/basic/Basictable";
import Widget from "../../components/widget/Widget";
import useValues from "../../hooks/useValues";
import "./home.scss";

const Home = () => {
  const users = useValues("users");
  const orders = useValues("orders");

  return (
    <div className="home">
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="center">
        <Card users={users} />
        <Chart title="Last 6 Months (Revenue)" aspect={2.5 / 1} />
      </div>

      <div className="table-container">
        <h1 className="list-title">Latest Transactions</h1>
        <BasicTable orders={orders} />
      </div>
    </div>
  );
};

export default Home;
