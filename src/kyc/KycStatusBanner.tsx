// components/kyc/KycStatusBanner.tsx
import { useNavigate } from "react-router";
import { ShieldCheck, Clock, XCircle } from "lucide-react";
import { useKycSession } from "@/hooks/useKycSession";

type KycStatusBannerProps = {
  email: string | undefined;
  kycVerified: boolean;
};

export const KycStatusBanner = ({
  email,
  kycVerified,
}: KycStatusBannerProps) => {
  const navigate = useNavigate();
  const { data: latestSession, isLoading } = useKycSession({
    email,
    enabled: !kycVerified && Boolean(email),
  });

  if (kycVerified || isLoading) return null;

  const status = latestSession?.status;

  if (status === "IN_REVIEW" || status === "In Review") {
    return (
      <div className="flex items-start justify-between gap-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-yellow-900">
              Verification under review
            </p>
            <p className="mt-0.5 text-xs text-yellow-700">
              Our team is reviewing your identity check. You'll be notified once
              it's done.
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
          Pending
        </span>
      </div>
    );
  }

  if (status === "DECLINED") {
    return (
      <div className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-900">
              Verification declined
            </p>
            <p className="mt-0.5 text-xs text-red-700">
              Your identity check did not pass. Please try again with a valid ID
              and ensure your face is clearly visible.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/kyc-verification")}
          className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Not Started, no session yet, or any other status — default CTA banner
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Verify your identity to unlock full access
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            Join the verified community to post freely, grow your audience
            faster, and stay protected from platform risks.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate("/dashboard/kyc-verification")}
        className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
      >
        Complete Verification
      </button>
    </div>
  );
};
