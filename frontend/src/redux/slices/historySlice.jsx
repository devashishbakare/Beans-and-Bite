import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  history: [],
  isOrderCategoryChange: false,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetHistory: (state) => {
      let newHistory = ["Home"];
      state.history = newHistory;
      state.isOrderCategoryChange = false;
    },
    addToHistory: (state, action) => {
      const { sectionName } = action.payload;
      const categoryList = [
        "Bestseller",
        "Drinks",
        "Food",
        "Merchandise",
        "Coffee At Home",
        "Ready To Eat",
      ];
      state.history.push(sectionName);
      if (categoryList.includes(sectionName)) {
        state.isOrderCategoryChange = true;
      } else {
        state.isOrderCategoryChange = false;
      }
    },
    removeFromHistory: (state, action) => {
      const { index, sectionName } = action.payload;
      if (index == 0) {
        state.history = ["Home"];
      } else {
        state.history = state.history.slice(0, index + 1);
        console.log(state.history);
      }
      const categoryList = [
        "Bestseller",
        "Drinks",
        "Food",
        "Merchandise",
        "Coffee At Home",
        "Ready To Eat",
      ];
      if (categoryList.includes(sectionName)) {
        state.isOrderCategoryChange = true;
      } else {
        state.isOrderCategoryChange = false;
      }
    },
    addFromNavbar: (state, action) => {
      const { sectionName } = action.payload;
      state.history = ["Home"];
      state.history.push(sectionName);
    },
  },
});

export const { resetHistory, addToHistory, removeFromHistory, addFromNavbar } =
  historySlice.actions;
export default historySlice.reducer;
