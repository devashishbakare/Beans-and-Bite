import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProductWithQuantity: {},
  cartPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartProductQuantity: (state, action) => {
      const { cartProducts } = action.payload;
      const mockProductWithQuantity = { ...state.cartProductWithQuantity };
      let initialPrice = 0;
      cartProducts.forEach((cartProduct) => {
        const { cartId, quantity, cartProductPrice } = cartProduct;
        if (!state.cartProductWithQuantity[cartId]) {
          mockProductWithQuantity[cartId] = quantity;
        }
        initialPrice =
          initialPrice + mockProductWithQuantity[cartId] * cartProductPrice;
      });
      state.cartProductWithQuantity = mockProductWithQuantity;
      state.cartPrice = initialPrice;
    },
    updateCartProductQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;
      state.cartProductWithQuantity[cartId] = quantity;
    },
    updateCartPrice: (state, action) => {
      const { price } = action.payload;
      state.cartPrice = price;
    },
    removeFromCart: (state, action) => {
      const { cartId } = action.payload;
      if (state.cartProductWithQuantity[cartId]) {
        delete state.cartProductWithQuantity[cartId];
      }
    },
    resetCart: () => initialState,
  },
});

export const {
  addCartProductQuantity,
  updateCartPrice,
  updateCartProductQuantity,
  removeFromCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
