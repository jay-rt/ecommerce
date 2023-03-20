import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Product from "./Product";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0.5rem" })}
`;

const Products = ({ products, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    filters &&
      setFilteredProducts(
        products.filter((product) =>
          Object.entries(filters).every(([key, value]) =>
            product[key].includes(value)
          )
        )
      );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "new") {
      setFilteredProducts((prevProducts) =>
        [...prevProducts].sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        )
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
      {filters
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
