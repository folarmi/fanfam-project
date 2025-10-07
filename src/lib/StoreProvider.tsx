// import React from "react";
// import { Provider } from "react-redux";
// import store, { persistor } from "../lib/store";
// import { PersistGate } from "redux-persist/integration/react";
// // import { PersistGate } from "redux-persist/integration/react";

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<ReturnType<typeof makeStore> | undefined>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  const store = storeRef.current.store;

  return <Provider store={store}>{children}</Provider>;
}
