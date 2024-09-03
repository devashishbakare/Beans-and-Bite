import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
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
    resetUserAuth: () => initialState,
  },
});

export const { updateToken, resetUserAuth } = userAuthSlice.actions;
export default userAuthSlice.reducer;
