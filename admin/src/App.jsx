import Navbar from "./components/navbar/Navbar";
import "./variables.scss";
import "./app.scss";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/users-list/UserList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./form-source";
import ProductList from "./pages/products-list/ProductList";
import { useSelector } from "react-redux";
import { dark } from "./redux/themeSlice";

const App = () => {
  const darkMode = useSelector(dark);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users">
                <Route index element={<UserList />} />
                <Route
                  path=":userId"
                  element={<Single title="User Spending" />}
                />
                <Route
                  path="new"
                  element={<New title="User" inputs={userInputs} />}
                />
              </Route>
              <Route path="/products">
                <Route index element={<ProductList />} />
                <Route
                  path=":productId"
                  element={<Single title="Product Sold" />}
                />
                <Route
                  path="new"
                  element={<New title="Product" inputs={productInputs} />}
                />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
