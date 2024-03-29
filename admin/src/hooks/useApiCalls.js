import {
  addProductSuccess,
  deleteProductSuccess,
  updateProductSuccess,
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

  //UPDATING A PRODUCT
  const updateProduct = async (dispatch, product, id) => {
    dispatch(productStart());
    try {
      const res = await userRequest.put(`/products/${id}`, product);
      console.log("Product successfully updated");
      dispatch(updateProductSuccess({ id: id, product: res.data }));
    } catch (err) {
      dispatch(productFailure());
    }
  };

  //DELETING A PRODUCT
  const deleteProduct = async (dispatch, id) => {
    dispatch(productStart());
    try {
      const res = await userRequest.delete(`/products/${id}`);
      console.log(res.data);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(productFailure());
    }
  };

  if (name === "addProduct") {
    return addProduct;
  } else if (name === "updateProduct") {
    return updateProduct;
  } else if (name === "deleteProduct") {
    return deleteProduct;
  }
};

export default useApiCalls;
