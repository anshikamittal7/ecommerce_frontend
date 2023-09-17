import { createSlice } from "@reduxjs/toolkit";

// Initialize the cart state from localStorage
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  subTotal: localStorage.getItem("subTotal")
    ? parseFloat(localStorage.getItem("subTotal"))
    : 0,

  tax: localStorage.getItem("tax") ? parseFloat(localStorage.getItem("tax")) : 0,

  total: localStorage.getItem("total")
    ? parseFloat(localStorage.getItem("total"))
    : 0,

  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const isItemExist = state.cartItems.find((i) => i._id === product._id);
      if (isItemExist) {
        state.cartItems.forEach((i) => {
          if (i._id === product._id) {
            i.quantity += quantity;
          }
        });
      } else {
        state.cartItems.push({ ...product, quantity });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },


    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    signOut: (state) => {
      state.cartItems = [];
      state.shippingAddress = {};

    },

    decrement: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    calculateTotals: (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => {
        sum += i.price * i.quantity;
      });
      state.subTotal = sum;
      state.tax = Math.ceil(sum * 0.18);
      state.shipping = sum > 100 || sum === 0 ? 0 : 200;
      state.total = state.subTotal + state.tax + state.shipping;

      localStorage.setItem("subTotal", state.subTotal);
      localStorage.setItem("tax", state.tax);
      localStorage.setItem("shipping", state.shipping);
      localStorage.setItem("total", state.total);
    },
  },
});
export const { addToCart, decrement, deleteItem, calculateTotals, saveShippingAddress, signOut } = cartSlice.actions;
export default cartSlice.reducer;
