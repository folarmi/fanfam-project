import { useDidit } from "@/hooks/useDidit";
import { ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { KycStatusBadge } from "./KycStatusBadge";

type KycStatus =
  | "Not Started"
  | "In Progress"
  | "In Review"
  | "Approved"
  | "Declined"
  | "Abandoned"
  | "Expired";

type KycVerificationCardProps = {
  kycStatus?: KycStatus;
  isVerified?: boolean;
  email: string;
  firstname: string;
  lastname: string;
};

export const KycVerificationCard = ({
  kycStatus = "Not Started",
  isVerified = false,
  email,
  firstname,
  lastname,
}: KycVerificationCardProps) => {
  const { startDiditKyc, isStartingDiditKyc } = useDidit();

  const isApproved = isVerified || kycStatus === "Approved";
  const isPending = kycStatus === "In Progress" || kycStatus === "In Review";
  const isDeclined = kycStatus === "Declined";

  const canStartKyc =
    kycStatus === "Not Started" ||
    kycStatus === "Declined" ||
    kycStatus === "Abandoned" ||
    kycStatus === "Expired";

  const handleStartVerification = () => {
    startDiditKyc({
      email,
      firstname,
      lastname,
      cbUrl: `${window.location.origin}/dashboard/kyc`,
    });
  };

  if (isApproved) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white p-3 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-900">
              Identity Verified
            </h3>

            <p className="mt-1 text-sm text-green-700">
              Your identity verification has been approved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Identity Verification
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Complete your KYC verification to unlock full account access.
          </p>

          <div className="mt-4">
            <KycStatusBadge status={kycStatus} />
          </div>

          {isPending && (
            <p className="mt-3 text-sm text-yellow-700">
              Your verification is currently being reviewed. You do not need to
              start another verification.
            </p>
          )}

          {isDeclined && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

              <p>
                Your verification was declined. Please start again and make sure
                your document and face are clearly visible.
              </p>
            </div>
          )}

          {canStartKyc && (
            <button
              type="button"
              onClick={handleStartVerification}
              disabled={isStartingDiditKyc}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isStartingDiditKyc && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {isStartingDiditKyc
                ? "Starting verification..."
                : "Start Verification"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
