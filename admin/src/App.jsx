import "./variables.scss";
import "./app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./form-source";
import { useSelector } from "react-redux";
import { dark } from "./redux/themeSlice";
import { currentUser } from "./redux/userSlice";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import Product from "./pages/single/Product";
import User from "./pages/single/User";
import UserList from "./pages/lists/UserList";
import ProductList from "./pages/lists/ProductList";

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
                  <Route path=":id" element={<User />} />
                  <Route
                    path="new"
                    element={<New title="User" inputs={userInputs} />}
                  />
                </Route>
                <Route path="/products">
                  <Route index element={<ProductList />} />
                  <Route path=":id" element={<Product />} />
                  <Route
                    path="new"
                    element={<New title="Product" inputs={productInputs} />}
                  />
                </Route>
              </Route>
            </>
          )}
          {!admin && (
            <Route path="*" element={<Navigate to="/login" replace="true" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
