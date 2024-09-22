import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import navBarReducer from "./slices/NavbarSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonSliceReducer from "./slices/commonSlice";
import categoryReducer from "./slices/productSlice";
import productInfoReducer from "./slices/ProductInfoSlice";
import historyReducer from "./slices/historySlice";
import notificationReducer from "./slices/notificationSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  navbarSelection: navBarReducer,
  commonSlice: commonSliceReducer,
  category: categoryReducer,
  productInfo: productInfoReducer,
  history: historyReducer,
  notification: notificationReducer,
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
