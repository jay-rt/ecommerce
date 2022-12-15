import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { mobile } from "../responsive";
import Product from "./Product";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0.5rem" })}
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category ? `/api/products?categories=${category}` : "/api/products",
          {
            signal: signal,
          }
        );
        console.log("Products information recieved");
        setProducts(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProducts();

    return () => {
      //cancels the request before the components unmount
      controller.abort();
    };
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((product) =>
          Object.entries(filters).every(([key, value]) =>
            product[key].includes(value)
          )
        )
      );
  }, [category, products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
