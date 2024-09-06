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
    resetNavbarSlice: () => initialState,
  },
});

export const { updateNavbarOptionSelection, resetNavbarSlice } =
  navbarSlice.actions;
export default navbarSlice.reducer;
