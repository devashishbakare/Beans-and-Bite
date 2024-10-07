import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  favoriteCount: 0,
  cartError: null,
  favoriteError: null,
  favorites: [],
  wallet: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    incrementCount: (state, action) => {
      const { requestFor, count } = action.payload;
      if (requestFor === "cart") {
        if (state.cartCount == null) {
          state.cartCount = 1;
        } else {
          state.cartCount += count;
        }
      } else {
        if (state.favoriteCount == null) {
          state.favoriteCount = 1;
        } else {
          state.favoriteCount += count;
        }
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
      console.log(productId);
      state.favorites.push(productId);
      console.log(state);
    },
    removeFromFavorites: (state, action) => {
      const { productId } = action.payload;
      const storeFavorites = [...state.favorites];
      state.favorites = storeFavorites.filter(
        (product) => product !== productId
      );
      state.favoriteCount -= 1;
    },
    setNotificationDetails: (state, action) => {
      const { cartCount, favoriteCount, favourites, wallet } = action.payload;
      state.cartCount = cartCount;
      state.favoriteCount = favoriteCount;
      state.favorites = favourites;
      state.wallet = wallet;
    },
    updateWallet: (state, action) => {
      const { requestFor, value } = action.payload;
      const amount = Number(value);
      if (requestFor == "inc") {
        state.wallet += amount;
      } else {
        if (amount >= state.wallet) {
          state.wallet -= amount;
        }
      }
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
  setNotificationDetails,
  updateWallet,
} = notificationSlice.actions;
export default notificationSlice.reducer;
