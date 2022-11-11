import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Announcement from "./components/Announcement";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import Newsletter from "./components/Newsletter";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
