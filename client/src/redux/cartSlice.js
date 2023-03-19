import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    increseQuantity: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ].quantity += 1;
      state.total += action.payload.price;
    },
    decreaseQuantity: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ].quantity -= 1;
      state.total -= action.payload.price;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );
      state.total -= action.payload.price;
    },
    emptyCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  increseQuantity,
  decreaseQuantity,
  removeProduct,
  emptyCart,
} = cartSlice.actions;
export const cartQuantity = (state) => state.cart.quantity;
export const cartProducts = (state) => state.cart.products;
export const cart = (state) => state.cart;

export default cartSlice.reducer;
