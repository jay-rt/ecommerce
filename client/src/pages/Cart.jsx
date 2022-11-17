import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  ${mobile({ padding: "0.5rem" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10px",
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ margin: 0 })}
`;

const Amount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "0 1.25rem" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
`;

const Hr = styled.div`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
`;

const Cart = () => {
  return (
    <Container>
      <Title>YOUR BAG</Title>
      <Top>
        <TopButton>CONTINUE SHOPPING</TopButton>
        <TopTexts>
          <TopText>SHOPPING BAG (2)</TopText>
          <TopText>Your Wishlist (0)</TopText>
        </TopTexts>
        <TopButton type="filled">CHECKOUT NOW</TopButton>
      </Top>
      <Bottom>
        <Info>
          <Product>
            <ProductDetail>
              <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
              <Details>
                <ProductName>
                  <b>Product:</b> JESSIE THUNDER SHOES
                </ProductName>
                <ProductId>
                  <b>ID:</b> 93813718293
                </ProductId>
                <ProductColor color="black" />
                <ProductSize>
                  <b>Size:</b> 37.5
                </ProductSize>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <AmountContainer>
                <Add />
                <Amount>2</Amount>
                <Remove />
              </AmountContainer>
              <ProductPrice> $30</ProductPrice>
            </PriceDetail>
          </Product>
          <Hr />
          <Product>
            <ProductDetail>
              <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
              <Details>
                <ProductName>
                  <b>Product:</b> HAKURA T-SHIRT
                </ProductName>
                <ProductId>
                  <b>ID:</b> 93813718293
                </ProductId>
                <ProductColor color="gray" />
                <ProductSize>
                  <b>Size:</b> M
                </ProductSize>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <AmountContainer>
                <Add />
                <Amount>1</Amount>
                <Remove />
              </AmountContainer>
              <ProductPrice>$ 20</ProductPrice>
            </PriceDetail>
          </Product>
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>$80</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>$10</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping Discount</SummaryItemText>
            <SummaryItemPrice>-$10</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>$80</SummaryItemPrice>
          </SummaryItem>
          <Button>CHECKOUT NOW</Button>
        </Summary>
      </Bottom>
    </Container>
  );
};

export default Cart;
