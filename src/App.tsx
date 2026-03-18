import "./App.css";

// import "react-tooltip/dist/react-tooltip.css";

import { BrowserRouter as Router } from "react-router-dom";
import { RoutePage } from "./utils/RoutePage";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";
import { ToastContainer } from "react-toastify";
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
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable={false}
              style={{ top: 16, right: 16, width: "auto" }}
            />
            {/* </AuthProvider> */}
          </WebSocketProvider>
        </NotificationsProvider>
      </QueryClientContextProvider>
    </StoreProvider>
  );
}

export default App;
