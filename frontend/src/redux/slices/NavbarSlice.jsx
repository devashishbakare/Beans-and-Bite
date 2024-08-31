import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarOpationSelection: "home",
};

const navbarSlice = createSlice({
  name: "navbarSelection",
  initialState,
  reducers: {
    updateNavbarOptionSelection: (state, action) => {
      state.navbarOpationSelection = action.payload;
    },
  },
});

export const { updateNavbarOptionSelection } = navbarSlice.actions;
export default navbarSlice.reducer;
