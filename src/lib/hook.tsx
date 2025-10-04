// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
//   useStore,
// } from "react-redux";
// import type { RootState, AppDispatch, AppStore } from "./store";

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppStore = () => useStore<AppStore>();

import {
  useDispatch,
  useSelector,
  useStore,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

// Typed hooks for usage across your app
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppStore = () => useStore<AppStore>(); // Uses the `AppStore` type
