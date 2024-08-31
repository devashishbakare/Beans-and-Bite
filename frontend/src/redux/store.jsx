import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import navBarReducer from "./slices/NavbarSlice";
const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    navbarSelection: navBarReducer,
  },
});

export default store;
