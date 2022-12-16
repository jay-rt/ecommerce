import React, { useState } from "react";
import styled from "styled-components";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  ${mobile({ margin: "10px" })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: 0 })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <Container>
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters} defaultValue="color">
            <Option value="color" disabled>
              Color
            </Option>
            <Option value="pink">Pink</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="orange">Orange</Option>
            <Option value="cream">Cream</Option>
            <Option value="green">Green</Option>
            <Option value="gray">Gray</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="brown">Brown</Option>
          </Select>
          <Select name="size" onClick={handleFilters} defaultValue="size">
            <Option value="size" disabled>
              Size
            </Option>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
    </Container>
  );
};

export default ProductList;
