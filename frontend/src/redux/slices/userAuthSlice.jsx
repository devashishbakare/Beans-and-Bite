import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  signInUpModal: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      const { token, isAuthenticated } = action.payload;
      state.token = token;
      state.isAuthenticated = isAuthenticated;
    },
    updateSignInUpModal: (state, action) => {
      const { requestFor } = action.payload;
      if (requestFor == "open") {
        state.signInUpModal = true;
      } else {
        state.signInUpModal = false;
      }
    },
    resetUserAuth: () => initialState,
  },
});

export const { updateToken, resetUserAuth, updateSignInUpModal } =
  userAuthSlice.actions;
export default userAuthSlice.reducer;
