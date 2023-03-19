import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfoCard from "../../components/cards/info/InfoCard";
import Chart from "../../components/chart/Chart";
import Basictable from "../../components/tables/basic/BasicTable";
import useStats from "../../hooks/useStats";
import useValues from "../../hooks/useValues";
import { allProducts } from "../../redux/productSlice";
import "./single.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const products = useSelector(allProducts);
  const product = products.length !== 0 && products.find((p) => p._id === id);
  const income = useStats(`/orders/income?pid=${id}`, "income");
  const orders = useValues(`/orders/product/${id}`, "Orders");

  const data = [
    { id: "id", label: "ID: ", value: product._id },
    { id: "desc", label: "Description: ", value: product.description },
    { id: "price", label: "Price: ", value: `$${product.price}` },
    { id: "stock", label: "Stock: ", value: product.inStock ? "Yes" : "No" },
  ];

  return (
    <div className="single">
      <div className="top">
        <InfoCard
          title={product.name}
          img={product.img}
          data={data}
          link={`/products/edit/${id}`}
        />
        <Chart title="Sales Performance" aspect={3 / 1} data={income} />
      </div>
      <div className="bottom">
        <h1 className="title">Last Transaction</h1>
        <Basictable orders={orders} />
      </div>
    </div>
  );
};

export default SingleProduct;
