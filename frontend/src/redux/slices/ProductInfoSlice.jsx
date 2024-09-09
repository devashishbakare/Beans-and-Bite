import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

const productInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    addProductInfo: (state, action) => {
      const { data } = action.payload;
      state.product = data;
    },
    resetProductInfo: () => initialState,
  },
});

export const { addProductInfo, resetProductInfo } = productInfoSlice.actions;
export default productInfoSlice.reducer;
