import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Assuming you have a `reducers` file
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";

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
const store = configureStore({
  reducer: persistedReducer,
});

// Create a single persistor instance
export const persistor = persistStore(store);

// Export the store
export default store;

// Define and export the store type
export type AppStore = typeof store; // Add this to define the store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
