import {
  addProductSuccess,
  deleteProductSuccess,
  productFailure,
  productStart,
} from "../redux/productSlice";
import useUserRequest from "./useUserRequest";

const useApiCalls = (name) => {
  const userRequest = useUserRequest();

  //ADDING A NEW PRODUCT
  const addProduct = async (dispatch, product) => {
    dispatch(productStart());
    try {
      const res = await userRequest.post("/products", product);
      console.log("New product successfully created");
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(productFailure());
    }
  };

  //DELETING A PRODUCT
  const deleteProduct = async (dispatch, id) => {
    dispatch(productStart());
    try {
      const res = await userRequest.delete(`/products/${id}`);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(productFailure());
    }
  };

  if (name === "addProduct") {
    return addProduct;
  } else if (name === "deleteProduct") {
    return deleteProduct;
  }
};

export default useApiCalls;
