import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  favoriteCount: 0,
  cartError: null,
  favoriteError: null,
  favorites: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    incrementCount: (state, action) => {
      const { requestFor, count } = action.payload;
      if (requestFor === "cart") {
        state.cartCount += count;
      } else {
        state.favoriteCount += count;
      }
    },
    decrementCount: (state, action) => {
      const { requestFor, count } = action.payload;
      if (requestFor === "cart") {
        state.cartCount -= count;
      } else {
        state.favoriteCount -= count;
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
    addToFavorites: (state, action) => {
      const { productId } = action.payload;
      state.favorites.push(productId);
    },
    removeFromFavorites: (state, action) => {
      const { productId } = action.payload;
      state.favorites = state.favorites.filter(
        (product) => product !== productId
      );
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
  addToFavorites,
  removeFromFavorites,
} = notificationSlice.actions;
export default notificationSlice.reducer;
