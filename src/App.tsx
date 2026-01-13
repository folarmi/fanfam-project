import "./App.css";

// import "react-tooltip/dist/react-tooltip.css";

import { BrowserRouter as Router } from "react-router-dom";
import { RoutePage } from "./utils/RoutePage";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";
import { Bounce, ToastContainer } from "react-toastify";
// import { AuthProvider } from "./context/AuthContext";
import StoreProvider from "./lib/StoreProvider";
import { NotificationsProvider } from "./context/NotificationsContext";
import NotificationToast from "./components/atoms/NotificationsToast";
import { WebSocketProvider } from "./context/WebSocketContext";

function App() {
  return (
    <StoreProvider>
      <QueryClientContextProvider>
        <NotificationsProvider>
          <WebSocketProvider>
            <Router>
              <RoutePage />
            </Router>
            <NotificationToast />
            <ToastContainer
              position="top-center"
              pauseOnHover
              hideProgressBar
              transition={Bounce}
              closeButton={false}
              closeOnClick
              autoClose={5000}
            />
            {/* </AuthProvider> */}
          </WebSocketProvider>
        </NotificationsProvider>
      </QueryClientContextProvider>
    </StoreProvider>
  );
}

export default App;
