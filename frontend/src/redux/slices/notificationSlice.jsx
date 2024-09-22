import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  favoriteCount: 0,
  cartError: null,
  favoriteError: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    incrementCount: (state, action) => {
      const { requestFor, incrementCount } = action.payload;
      if (requestFor === "cart") {
        state.cartCount += incrementCount;
      } else {
        state.favoriteCount += incrementCount;
      }
    },
    decrementCount: (state, action) => {
      const { requestFor, incrementCount } = action.payload;
      if (requestFor === "cart") {
        state.cartCount -= incrementCount;
      } else {
        state.favoriteCount -= incrementCount;
      }
    },
    resetCount: (state, action) => {
      const { requestFor } = action.payload;
      if (requestFor == "cart") {
        state.cartCount = 0;
      } else {
        state.favoriteCount = 0;
      }
    },
    resetNotification: () => initialState,
    setCartError: (state, action) => {
      const { error } = action.payload;
      state.cartError = error;
    },
    setFavoriteError: (state, action) => {
      const { error } = action.payload;
      state.favoriteError = error;
    },
  },
});

export const {
  incrementCount,
  decrementCount,
  resetCount,
  resetNotification,
  setCartError,
  setFavoriteError,
} = notificationSlice.actions;
export default notificationSlice.reducer;
