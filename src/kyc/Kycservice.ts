// services/kycService.ts
// ─────────────────────────────────────────────────────────────────────────────
// MOCK — replace the function bodies with real API calls once backend is ready.
// The hook and component code never needs to change, only this file.
// ─────────────────────────────────────────────────────────────────────────────

export type KycInitiateResponse = {
  verificationUrl: string;
  reference: string;
};

export type KycStatusResponse = {
  event:
    | "verification.accepted"
    | "verification.declined"
    | "request.timeout"
    | string;
  reference: string;
};

/**
 * Asks the backend to create a Shufti Pro verification session.
 * Returns the hosted verification URL to embed in an iframe.
 *
 * MOCK: simulates a 1s network delay then returns a fake URL.
 * REAL: replace with → fetch("/api/kyc/initiate", { method: "POST", ... })
 */
export async function initiateKycVerification(
  userId: string,
  email: string,
): Promise<KycInitiateResponse> {
  // ── MOCK ──────────────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 1000)); // fake latency
  return {
    verificationUrl: "https://app.shuftipro.com/process/verification", // replace with real URL from backend
    reference: `daf61c614f0037639e84b30a603f8a13e943f5c2cc232eecda618af1a3584b45`,
  };
  // ── REAL (uncomment when backend is ready) ────────────────────────
  // const res = await fetch("/api/kyc/initiate", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ userId, email }),
  // });
  // if (!res.ok) throw new Error("Failed to initiate KYC");
  // return res.json();
}

/**
 * Checks the current KYC status for a verification reference.
 *
 * MOCK: always returns "verification.accepted" after 500ms.
 * REAL: replace with → fetch("/api/kyc/status", { method: "POST", ... })
 */
export async function fetchKycStatus(
  reference: string,
): Promise<KycStatusResponse> {
  // ── MOCK ──────────────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 500));
  return { event: "verification.accepted", reference };
  // ── REAL (uncomment when backend is ready) ────────────────────────
  // const res = await fetch("/api/kyc/status", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ reference }),
  // });
  // if (!res.ok) throw new Error("Failed to fetch KYC status");
  // return res.json();
}
