import Categories from "../components/Categories";
import Products from "../components/Products";
import Slider from "../components/Slider";
import useProducts from "../hooks/useProducts";

const Home = () => {
  const products = useProducts("/products?new=true");
  return (
    <>
      <Slider />
      <Categories />
      <Products products={products} />
    </>
  );
};

export default Home;
