import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  customizationDetails: {},
};

const productInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    addProductInfo: (state, action) => {
      const { data, customizationDetails = null } = action.payload;
      state.product = data;
      state.customizationDetails = customizationDetails;
    },
    resetProductInfo: () => initialState,
  },
});

export const { addProductInfo, resetProductInfo } = productInfoSlice.actions;
export default productInfoSlice.reducer;
