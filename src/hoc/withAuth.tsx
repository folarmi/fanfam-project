// hoc/withAuth.tsx
import { useEffect, useState, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const authToken = localStorage.getItem("token");
        // const authToken = true;
        if (!authToken) {
          navigate("/"); // Redirect to login or home page
        } else {
          setLoading(false); // User is authenticated, set loading to false
        }
      };

      checkAuth();
    }, [navigate]);

    // Render null or a basic loading component while checking auth
    if (loading) {
      return null; // Or a minimal skeleton screen or placeholder
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
