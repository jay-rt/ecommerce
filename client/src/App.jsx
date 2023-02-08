import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Cart from "./pages/Cart";
import CartLayout from "./pages/CartLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { currentUser } from "./redux/userSlice";

const App = () => {
  const user = useSelector(currentUser);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/success" element={<Success />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace={true} /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace={true} /> : <Login />}
          />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
          <Route element={<CartLayout />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
