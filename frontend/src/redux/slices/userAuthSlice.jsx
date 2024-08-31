import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    updateToken: (state, payload) => {
      const { token, isAuthenticated } = payload;
      state.token = token;
      state.isAuthenticated = isAuthenticated;
    },
  },
});

export const { updateToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
