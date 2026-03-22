// // // hoc/withAuth.tsx
// import { useEffect, useState, type ComponentType } from "react";
// import { useNavigate } from "react-router-dom";

// const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
//   const Wrapper = (props: P) => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const checkAuth = async () => {
//         const authToken = localStorage.getItem("token");
//         // const authToken = true;
//         if (!authToken) {
//           navigate("/"); // Redirect to login or home page
//         } else {
//           setLoading(false); // User is authenticated, set loading to false
//         }
//       };

//       checkAuth();
//     }, [navigate]);

//     // Render null or a basic loading component while checking auth
//     if (loading) {
//       return null; // Or a minimal skeleton screen or placeholder
//     }

//     return <WrappedComponent {...props} />;
//   };

//   return Wrapper;
// };

// export default withAuth;

import { useEffect, useState, useCallback, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";

// Re-bind tab on refresh (sessionStorage is wiped on refresh but localStorage survives)
function rebindTabIfNeeded() {
  const token = localStorage.getItem("token");
  const activeTabId = localStorage.getItem("active_tab_id");
  const myTabId = sessionStorage.getItem("tab_id");

  if (token && activeTabId && !myTabId) {
    sessionStorage.setItem("tab_id", activeTabId);
  }
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const checkTabAuth = useCallback(() => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        navigate("/");
        return;
      }

      const myTabId = sessionStorage.getItem("tab_id");
      const activeTabId = localStorage.getItem("active_tab_id");
      const isAuthorizedTab = myTabId && myTabId === activeTabId;

      if (!isAuthorizedTab) {
        navigate("/");
        return;
      }

      setLoading(false);
    }, [navigate]);

    useEffect(() => {
      rebindTabIfNeeded(); // 👈 runs before checkTabAuth so tab_id is ready
      checkTabAuth();

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "active_tab_id") {
          checkTabAuth();
        }
      };

      const handleUnauthorizedTab = () => navigate("/");

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("unauthorized-tab", handleUnauthorizedTab);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("unauthorized-tab", handleUnauthorizedTab);
      };
    }, [checkTabAuth, navigate]);

    if (loading) return null;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
