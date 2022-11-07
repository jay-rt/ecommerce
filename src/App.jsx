import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Announcement />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/productlist" element={<ProductList />}></Route>
          <Route path="/product" element={<Product />}></Route>
        </Routes>
        <Newsletter />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
