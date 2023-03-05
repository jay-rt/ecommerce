import { Add, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useUserRequest from "../hooks/useUserRequest";
import { cart } from "../redux/cartSlice";
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
  cursor: pointer;
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

// const Hr = styled.div`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

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
  cursor: pointer;
`;

const Cart = () => {
  const cartItems = useSelector(cart);
  const userRequest = useUserRequest();
  const handleCheckout = async () => {
    try {
      const res = await userRequest.post("/checkout/payment", {
        products: cartItems.products,
      });
      const url = res.data.url;
      window.location = url;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Title>YOUR BAG</Title>
      <Top>
        <TopButton>CONTINUE SHOPPING</TopButton>
        <TopTexts>
          <TopText>SHOPPING BAG ({cartItems.quantity})</TopText>
          <TopText>Your Wishlist (0)</TopText>
        </TopTexts>
        <TopButton type="filled" onClick={handleCheckout}>
          CHECKOUT NOW
        </TopButton>
      </Top>
      <Bottom>
        <Info>
          {cartItems.products.map((product) => (
            <Product key={product._id + product.color + product.size}>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <AmountContainer>
                  <Add />
                  <Amount>{product.quantity}</Amount>
                  <Remove />
                </AmountContainer>
                <ProductPrice>
                  {" "}
                  $ {product.price * product.quantity}
                </ProductPrice>
              </PriceDetail>
            </Product>
          ))}
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>$ {cartItems.total}</SummaryItemPrice>
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
            <SummaryItemPrice>$ {cartItems.total}</SummaryItemPrice>
          </SummaryItem>
          <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
        </Summary>
      </Bottom>
    </Container>
  );
};

export default Cart;
