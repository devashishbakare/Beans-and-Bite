import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import navBarReducer from "./slices/NavbarSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonSliceReducer from "./slices/commonSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  navbarSelection: navBarReducer,
  commonSlice: commonSliceReducer,
});

const persistReducters = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducters,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
