import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {},
  error: null,
};

const productSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addProductFromCategories: (state, action) => {
      const { categoryName, data } = action.payload;
      state.categories[categoryName] = data;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addProductFromCategories, setError } = productSlice.actions;
export default productSlice.reducer;
