import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { addProduct } from "../redux/cartSlice";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ padding: "0.5rem", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "0.5rem 0" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getProduct = async () => {
      try {
        const res = await axios.get(`/api/products/find/${id}`, {
          signal: signal,
        });
        console.log("Product information received");
        setProduct(res.data);
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProduct();

    return () => {
      //cancels the requests before the component unmounts
      controller.abort();
    };
  }, [id]);

  const handleClick = (type) => {
    if (type === "inc") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      quantity > 1 && setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={product.img} />
      </ImageContainer>
      <InfoContainer>
        <Title>{product.name}</Title>
        <Desc>{product.description}</Desc>
        <Price>$ {product.price}</Price>

        <FilterContainer>
          <Filter>
            <FilterTitle>Color</FilterTitle>
            {product.color?.map((colour) => (
              <FilterColor
                color={colour}
                key={colour}
                onClick={() => setColor(colour)}
              />
            ))}
          </Filter>
          <Filter>
            <FilterTitle>Size</FilterTitle>
            <FilterSize onChange={(event) => setSize(event.target.value)}>
              {product.size?.map((s) => (
                <FilterSizeOption key={s}>{s.toUpperCase()}</FilterSizeOption>
              ))}
            </FilterSize>
          </Filter>
        </FilterContainer>
        <AddContainer>
          <AmountContainer>
            <Remove
              onClick={() => {
                handleClick("dec");
              }}
            />
            <Amount>{quantity}</Amount>
            <Add
              onClick={() => {
                handleClick("inc");
              }}
            />
          </AmountContainer>
          <Button onClick={handleCart}>ADD TO CART</Button>
        </AddContainer>
      </InfoContainer>
    </Container>
  );
};

export default Product;
