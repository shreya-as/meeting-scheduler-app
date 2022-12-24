import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage: storage,
  // which reducer you want to store
  whitelist: ["scheduler"],
};
//ensures your redux state is stored to persisted storage whenever it changes.
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: rootReducer,
  //  ignore all the action types it dispatches:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
//store your redux reducers using redux persist
export { store };
