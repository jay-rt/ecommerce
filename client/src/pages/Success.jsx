import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartProducts } from "../redux/cartSlice";
import { currentUser } from "../redux/userSlice";
import { userRequest } from "../requestMethods";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

const Success = () => {
  const [session, setSession] = useState("");
  const [orderId, setOrderId] = useState("");
  const location = useLocation();
  const sessionId = location.search.split("=")[1];
  const products = useSelector(cartProducts);
  const user = useSelector(currentUser);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: user._id,
          products: products.map((product) => ({
            productId: product._id,
            quantity: session.lineItems.find(
              (item) => item.description === product.name
            ).quantity,
            size: product.size,
            color: product.color,
          })),
          amount: session.total,
          address: session.address,
        });
        setOrderId(res.data._id);
        console.log("New Order Created");
      } catch (err) {
        console.log(err);
      }
    };
    session && session.paymentStatus === "paid" && createOrder();
  }, [products, session, user._id]);

  useEffect(() => {
    const retriveSession = async () => {
      try {
        const res = await userRequest.post("/checkout/session", {
          sessionId: sessionId,
        });
        setSession(res.data);
        console.log("Retrived Session");
      } catch (err) {
        console.log(err);
      }
    };
    sessionId && retriveSession();
  }, [sessionId]);

  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order id is ${orderId}`
        : "Successful. Your order is being processed..."}
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </Container>
  );
};

export default Success;
