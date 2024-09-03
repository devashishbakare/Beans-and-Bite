import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 0,
  bestSellingProducts: [],
  error: null,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setBestSellingProducts: (state, action) => {
      state.status = action.payload.status;
      state.bestSellingProducts = action.payload.data;
    },
    resetBestSellingProducts: () => initialState,
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setBestSellingProducts, resetBestSellingProducts, setError } =
  commonSlice.actions;
export default commonSlice.reducer;
