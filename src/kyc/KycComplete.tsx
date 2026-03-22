/* eslint-disable react-hooks/exhaustive-deps */
// pages/KycComplete.tsx
// Shufti redirects the user here after they complete (or close) the verification.
// URL will contain ?reference=...&event=verification.accepted etc.
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchKycStatus } from "./Kycservice";

const KycComplete = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) {
      navigate("/", { replace: true });
      return;
    }

    fetchKycStatus(reference).then((data) => {
      if (data.event === "verification.accepted") {
        navigate("/kyc/success", { replace: true });
      } else if (data.event === "verification.declined") {
        navigate("/kyc/failed", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Processing your verification...</p>
      </div>
    </div>
  );
};

export default KycComplete;
