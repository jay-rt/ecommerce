import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../requestMethods";
import {
  addProductSuccess,
  deleteProductSuccess,
  getProductSuccess,
  productFailure,
  productStart,
} from "./productSlice";
import useUserRequest from "../hooks/useUserRequest";

//USER LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//GETTING ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(productStart());
  try {
    const res = await publicRequest.get("/products");
    console.log("Products data received");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(productFailure());
  }
};

//ADDING A NEW PRODUCT
export const addProduct = async (dispatch, product) => {
  const userRequest = useUserRequest();
  dispatch(productStart());
  try {
    const res = await userRequest.post("/products", product);
    console.log("New product successfully created");
    dispatch(addProductSuccess(product));
  } catch (err) {
    dispatch(productFailure());
  }
};

//DELETING A PRODUCT
export const deleteProduct = async (dispatch, id) => {
  // const userRequest = useUserRequest();
  dispatch(productStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(productFailure());
  }
};
