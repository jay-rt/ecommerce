import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    productStart: (state) => {
      state.isFetching = true;
    },
    productFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    emptyProduct: (state) => {
      state.products = [];
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  productStart,
  productFailure,
  getProductSuccess,
  addProductSuccess,
  deleteProductSuccess,
  emptyProduct,
} = productSlice.actions;
export const allProducts = (state) => state.product.products;
export default productSlice.reducer;
