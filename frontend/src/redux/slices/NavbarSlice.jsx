import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarOpationSelection: "Home",
  extraData: {},
};

const navbarSlice = createSlice({
  name: "navbarSelection",
  initialState,
  reducers: {
    updateNavbarOptionSelection: (state, action) => {
      const { extraData = null, option } = action.payload;
      state.navbarOpationSelection = option;
      state.extraData = extraData;
    },
    resetNavbarSlice: () => initialState,
  },
});

export const { updateNavbarOptionSelection, resetNavbarSlice } =
  navbarSlice.actions;
export default navbarSlice.reducer;
