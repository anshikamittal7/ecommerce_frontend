// productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: true,
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRequest, fetchSuccess, fetchFail } = productSlice.actions;
export default productSlice.reducer;
