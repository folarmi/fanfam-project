// hooks/useKyc.ts
import { fetchKycStatus, initiateKycVerification } from "@/kyc/Kycservice";
import { useState } from "react";

export type KycStatus =
  | "idle"
  | "loading"
  | "pending"
  | "accepted"
  | "declined"
  | "error";

type KycState = {
  status: KycStatus;
  verificationUrl: string | null;
  reference: string | null;
  error: string | null;
};

export const useKyc = () => {
  const [state, setState] = useState<KycState>({
    status: "idle",
    verificationUrl: null,
    reference: null,
    error: null,
  });

  const initiateKyc = async (userId: string, email: string) => {
    setState((s) => ({ ...s, status: "loading", error: null }));
    try {
      const data = await initiateKycVerification(userId, email);
      setState({
        status: "pending",
        verificationUrl: data.verificationUrl,
        reference: data.reference,
        error: null,
      });
    } catch (err) {
      setState({
        status: "error",
        verificationUrl: null,
        reference: null,
        error:
          err instanceof Error ? err.message : "Failed to start verification",
      });
    }
  };

  const checkStatus = async (reference: string) => {
    try {
      const data = await fetchKycStatus(reference);
      if (data.event === "verification.accepted") {
        setState((s) => ({ ...s, status: "accepted" }));
      } else if (data.event === "verification.declined") {
        setState((s) => ({ ...s, status: "declined" }));
      }
    } catch {
      // silently fail — webhook is the source of truth
    }
  };

  const reset = () =>
    setState({
      status: "idle",
      verificationUrl: null,
      reference: null,
      error: null,
    });

  return { ...state, initiateKyc, checkStatus, reset };
};
