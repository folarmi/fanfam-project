// AuthGate.tsx
import { Loader } from "@/components/molecules/Loader";
import { auth } from "@/oauth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
      setChecking(false);
    });
    return () => unsub();
  }, [navigate]);

  if (checking) return <Loader />; // or a spinner
  return <>{children}</>;
}
