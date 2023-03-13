import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../requestMethods";
import {
  addProductSuccess,
  deleteProductSuccess,
  getProductSuccess,
  productFailure,
  productStart,
} from "./productSlice";

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
