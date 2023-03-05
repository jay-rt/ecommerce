import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartProducts, emptyCart } from "../redux/cartSlice";
import { currentUser } from "../redux/userSlice";
import styled from "styled-components";
import useUserRequest from "../hooks/useUserRequest";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span`
  font-weight: bold;
  font-size: 32px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

const Success = () => {
  const [session, setSession] = useState("");
  const [orderId, setOrderId] = useState(null);
  const location = useLocation();
  const sessionId = location.search.split("=")[1];
  const products = useSelector(cartProducts);
  const user = useSelector(currentUser);
  const dispatch = useDispatch();
  const userRequest = useUserRequest();

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
  }, [sessionId, userRequest]);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: user._id,
          fullname: `${user.firstname} ${user.lastname}`,
          products: products.map((product) => {
            const orderedProduct = session.lineItems.find(
              (item) => item.description === product.name
            );
            return {
              productId: product._id,
              productName: product.name,
              productImg: product.img,
              quantity: orderedProduct.quantity,
              price: orderedProduct.amount_total / 100,
              size: product.size,
              color: product.color,
            };
          }),
          amount: session.total / 100,
          address: session.address,
        });
        setOrderId(res.data._id);
        console.log("New Order Created");
      } catch (err) {
        console.log(err);
      }
    };
    session &&
      products.length !== 0 &&
      session.paymentStatus === "paid" &&
      createOrder();
  }, [products, session, user, userRequest]);

  useEffect(() => {
    orderId &&
      products.length !== 0 &&
      dispatch(emptyCart()) &&
      console.log("Emptied Cart");
  }, [orderId, dispatch, products]);

  return (
    <Container>
      <Span>
        {orderId
          ? `Order has been created successfully. Your order id is ${orderId}`
          : "Successful. Your order is being processed..."}
      </Span>
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </Container>
  );
};

export default Success;
