import { useState } from "react";
import styled from "styled-components";
import Products from "../components/Products";
import { useParams } from "react-router-dom";
import { mobile } from "../responsive";
import useProducts from "../hooks/useProducts";

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
  const { category } = useParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const link = category ? `/products?categories=${category}` : "/products";
  const products = useProducts(link);

  const unique = (arr) => {
    //creating new array with all sub-array elements concatenated
    let uniqueArr = arr.flat();
    //only storing unique values in array
    uniqueArr = [...new Set(uniqueArr)];
    return uniqueArr;
  };

  let colors = products.map((product) => product.color?.map((c) => c));
  let sizes = products.map((product) => product.size?.map((s) => s));

  colors = unique(colors);
  sizes = unique(sizes);

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
      <Title>{category ? category : "Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters} defaultValue="color">
            <Option value="color" disabled>
              Color
            </Option>
            {colors.map((color) => (
              <Option value={color} key={color}>
                {color.toUpperCase()}
              </Option>
            ))}
          </Select>
          <Select name="size" onChange={handleFilters} defaultValue="size">
            <Option value="size" disabled>
              Size
            </Option>
            {sizes.map((size) => (
              <Option value={size} key={size}>
                {size.toUpperCase()}
              </Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort} defaultValue="new">
            <Option value="new">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products products={products} filters={filters} sort={sort} />
    </Container>
  );
};

export default ProductList;
