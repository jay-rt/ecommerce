import "./variables.scss";
import "./app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/users-list/UserList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./form-source";
import ProductList from "./pages/products-list/ProductList";
import { useSelector } from "react-redux";
import { dark } from "./redux/themeSlice";
import { currentUser } from "./redux/userSlice";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";

const App = () => {
  const darkMode = useSelector(dark);
  const user = useSelector(currentUser);
  const admin = user && user.isAdmin;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={admin ? <Navigate to="/" replace="true" /> : <Login />}
          />
          {admin && (
            <>
              <Route element={<Layout />}>
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
              </Route>
            </>
          )}
          {!admin && (
            <Route path="/" element={<Navigate to="/login" replace="true" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
