import "./variables.scss";
import "./app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import New from "./pages/new/New";
import { userInputs } from "./form-source";
import { useSelector } from "react-redux";
import { dark } from "./redux/themeSlice";
import { currentUser } from "./redux/userSlice";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import UserList from "./pages/lists/UserList";
import ProductList from "./pages/lists/ProductList";
import SingleUser from "./pages/single/SingleUser";
import SingleProduct from "./pages/single/SingleProduct";
import NewProduct from "./pages/new/NewProduct";
import EditProduct from "./pages/edit/EditProduct";

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
                  <Route path=":id" element={<SingleUser />} />
                  <Route
                    path="new"
                    element={<New title="User" inputs={userInputs} />}
                  />
                </Route>
                <Route path="/products">
                  <Route index element={<ProductList />} />
                  <Route path=":id" element={<SingleProduct />} />
                  <Route path="new" element={<NewProduct />} />
                  <Route path="edit/:id" element={<EditProduct />} />
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
