/* eslint-disable react-hooks/exhaustive-deps */
// components/KycVerification.tsx
import { useEffect, useRef, useState } from "react";
import { useKyc } from "@/hooks/useKyc";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";

type Props = {
  onSuccess?: () => void;
  onDeclined?: () => void;
};

const KycVerification = ({ onSuccess, onDeclined }: Props) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const {
    status,
    verificationUrl,
    // reference,
    error,
    initiateKyc,
    checkStatus,
    reset,
  } = useKyc();

  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for postMessage events from the Shufti iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "object" || !event.data?.type) return;
      const { type, reference: ref } = event.data;

      if (type === "verification.accepted") {
        onSuccess?.();
      } else if (type === "verification.declined") {
        onDeclined?.();
      } else if (type === "request.timeout") {
        reset();
      }

      if (ref) checkStatus(ref);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleStart = () => {
    if (!userObject) return;
    initiateKyc(userObject.usid ?? userObject.publicId, userObject.email);
  };

  // ── Accepted ──────────────────────────────────────────────────────
  if (status === "accepted") {
    return (
      <div className="flex flex-col items-center py-10 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Verification Successful
        </h3>
        <p className="text-sm text-gray-500">
          Your identity has been verified.
        </p>
      </div>
    );
  }

  // ── Declined ──────────────────────────────────────────────────────
  if (status === "declined") {
    return (
      <div className="flex flex-col items-center py-10 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Verification Failed
        </h3>
        <p className="text-sm text-gray-500">
          We couldn't verify your identity. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Pending — iframe ──────────────────────────────────────────────
  if (status === "pending" && verificationUrl) {
    return (
      <div className="w-full">
        <div className="relative w-full" style={{ height: 600 }}>
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Loading verification...</p>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={verificationUrl}
            allow="camera; microphone"
            onLoad={() => setIframeLoaded(true)}
            className="w-full h-full rounded-xl border border-gray-200"
            title="Identity Verification"
          />
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Secured by Shufti Pro · Your data is encrypted
        </p>
      </div>
    );
  }

  // ── Idle / error — start prompt ───────────────────────────────────
  return (
    <div className="flex flex-col items-center py-10 gap-5 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"
          />
        </svg>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Identity Verification
        </h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          Verify your identity to unlock all features. Takes about 2 minutes.
        </p>
      </div>

      <ul className="text-left text-sm text-gray-600 space-y-1.5">
        <li>✓ Government-issued ID (passport, ID card, driving license)</li>
        <li>✓ Facial recognition check</li>
        <li>✓ Results in under 60 seconds</li>
      </ul>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        onClick={handleStart}
        disabled={status === "loading"}
        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Preparing...
          </>
        ) : (
          "Start Verification"
        )}
      </button>
    </div>
  );
};

export default KycVerification;
