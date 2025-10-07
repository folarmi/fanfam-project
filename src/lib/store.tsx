import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  whitelist: ["auth", "profile"], // Add the reducers you want to persist
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a single store instance
// const store = configureStore({
//   reducer: persistedReducer,
// });

// // Create a single persistor instance
// export const persistor = persistStore(store);

// // Export the store
// export default store;

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.MODE === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

// Define and export the store type
export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
