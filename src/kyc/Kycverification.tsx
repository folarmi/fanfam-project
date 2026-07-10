/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { useQueryClient } from "@tanstack/react-query";
// import {
//   CheckCircle2,
//   Clock,
//   FileCheck2,
//   Loader2,
//   ScanFace,
//   ShieldCheck,
//   XCircle,
// } from "lucide-react";

// import CustomInput from "@/components/forms/CustomInput";
// import { useFetchProfile } from "@/hooks/apiHooks";
// import { useDidit } from "@/hooks/useDidit";
// import { useCustomMutation } from "@/hooks/apiCalls";
// import { useAppSelector } from "@/lib/hook";
// import type { RootState } from "@/lib/store";
// import { showErrorToast } from "@/utils/toastUtils";

// type KycFormValues = {
//   email: string;
//   firstname: string;
//   lastname: string;
// };

// type PageState = "idle" | "pending_review" | "verified" | "failed";

// const EDIT_PROFILE_ROUTE = "/dashboard/profile/edit-profile";
// const DASHBOARD_ROUTE = "/dashboard";
// const REDIRECT_DELAY_MS = 3000;
// // How often to re-check profile after submission, in ms.
// // Stop after MAX_POLL_ATTEMPTS to avoid infinite polling if webhook is slow.
// const POLL_INTERVAL_MS = 3000;
// const MAX_POLL_ATTEMPTS = 10;

// const KycVerification = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { userObject } = useAppSelector((state: RootState) => state.auth);

//   const myProfileQuery = useFetchProfile(userObject, Boolean(userObject));
//   const profile = myProfileQuery.data?.data;

//   const [pageState, setPageState] = useState<PageState>("idle");
//   const pollAttemptsRef = useRef(0);
//   const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const isVerified = profile?.kycVerified === true;

//   const fullName = profile?.fullName?.trim() ?? "";
//   const nameParts = fullName.split(/\s+/).filter(Boolean);
//   const firstname = nameParts[0] ?? "";
//   const lastname = nameParts.slice(1).join(" ");

//   const isProfileComplete =
//     Boolean(profile?.email?.trim()) &&
//     nameParts.length >= 2 &&
//     Boolean(profile?.username?.trim()) &&
//     Boolean(profile?.gender) &&
//     Boolean(profile?.location?.trim());

//   // If profile flips to verified while we're in pending_review state
//   // (webhook came back, profile refetched), advance to verified state
//   // and redirect.
//   useEffect(() => {
//     if (isVerified && pageState === "pending_review") {
//       setPageState("verified");
//       setTimeout(() => navigate(DASHBOARD_ROUTE), REDIRECT_DELAY_MS);
//     }
//   }, [isVerified, pageState, navigate]);

//   // Cleanup poll timer on unmount.
//   useEffect(() => {
//     return () => {
//       if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
//     };
//   }, []);

//   const verifyCreatorMutation = useCustomMutation({
//     endpoint: "profile/verify",
//     successMessage: () => "Verification complete",
//     onSuccessCallback: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["viewProfile"],
//         exact: false,
//       });
//     },
//     onError: () => {
//       // Don't show a scary error — polling is still running and the
//       // webhook may still flip kycVerified independently. Just log it.
//       console.warn(
//         "profile/verify did not confirm approval yet — relying on webhook polling.",
//       );
//     },
//   });

//   // Poll profile until kycVerified flips or we hit the attempt limit.
//   const startPollingProfile = () => {
//     pollAttemptsRef.current = 0;

//     const poll = () => {
//       if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) return;

//       pollAttemptsRef.current += 1;

//       queryClient.invalidateQueries({
//         queryKey: ["viewProfile"],
//         exact: false,
//       });

//       pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
//     };

//     pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
//   };

//   const { startDiditKyc, isStartingDiditKyc } = useDidit({
//     onVerificationCompleted: () => {
//       setPageState("pending_review");
//       // Call profile/verify to notify backend the user completed the flow.
//       // The backend should also receive Didit's webhook independently —
//       // this is belt-and-suspenders until webhook handling is confirmed.
//       verifyCreatorMutation.mutate({});
//       // Poll profile so UI advances to "verified" automatically once
//       // the backend updates kycVerified via webhook.
//       startPollingProfile();
//     },
//     onVerificationCancelled: () => {
//       // User backed out — stay on page, allow retry.
//       setPageState("idle");
//     },
//     onVerificationFailed: () => {
//       setPageState("failed");
//     },
//   });

//   const { control, getValues, reset } = useForm<KycFormValues>({
//     defaultValues: { email: "", firstname: "", lastname: "" },
//   });

//   useEffect(() => {
//     if (!myProfileQuery.isSuccess || isProfileComplete) return;

//     showErrorToast(
//       "Please complete your profile before starting identity verification.",
//     );

//     navigate(EDIT_PROFILE_ROUTE, { replace: true });
//   }, [myProfileQuery.isSuccess, isProfileComplete, navigate]);

//   useEffect(() => {
//     if (!profile || !isProfileComplete) return;

//     reset({ email: profile.email ?? "", firstname, lastname });
//   }, [profile, firstname, lastname, isProfileComplete, reset]);

//   const handleStartVerification = () => {
//     if (pageState === "pending_review" || isVerified || isStartingDiditKyc)
//       return;

//     if (!isProfileComplete) {
//       navigate(EDIT_PROFILE_ROUTE, {
//         state: {
//           message:
//             "Please complete your profile before starting identity verification.",
//         },
//       });
//       return;
//     }

//     const { email, firstname: fn, lastname: ln } = getValues();
//     if (!email || !fn || !ln) return;

//     // cbUrl must be a publicly reachable URL — Didit loads it inside its
//     // iframe as a redirect target. Using just the origin avoids rendering
//     // your full app inside the modal. On localhost this will still hit the
//     // PNA block; test on a deployed/ngrok URL.
//     startDiditKyc({
//       email,
//       firstname: fn,
//       lastname: ln,
//       cbUrl: window.location.origin,
//     });
//   };

//   if (myProfileQuery.isLoading) {
//     return (
//       <div className="flex min-h-64 items-center justify-center">
//         <Loader2 className="h-7 w-7 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (myProfileQuery.isError) {
//     return (
//       <div className="mx-auto max-w-lg rounded-lg border border-red-200 bg-red-50 p-5 text-center">
//         <p className="text-sm text-red-700">
//           We could not retrieve your profile. Please refresh the page and try
//           again.
//         </p>
//       </div>
//     );
//   }

//   if (!isProfileComplete) {
//     return (
//       <div className="flex min-h-64 items-center justify-center">
//         <Loader2 className="h-7 w-7 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (isVerified || pageState === "verified") {
//     return (
//       <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white">
//         <div className="px-6 py-10 text-center sm:px-8">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
//             <CheckCircle2 className="h-7 w-7" />
//           </div>

//           <h2 className="mt-4 text-xl font-semibold text-gray-900">
//             Identity verified
//           </h2>

//           <p className="mt-2 text-sm text-gray-600">
//             Your identity has been verified. You now have full access to your
//             account.
//           </p>

//           <p className="mt-1 text-xs text-gray-400">
//             Redirecting you to the dashboard…
//           </p>

//           <button
//             type="button"
//             onClick={() => navigate(DASHBOARD_ROUTE)}
//             className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//           >
//             Go to dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (pageState === "pending_review") {
//     return (
//       <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//         <div className="px-6 py-10 text-center sm:px-8">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-primary">
//             <Clock className="h-7 w-7 animate-pulse" />
//           </div>

//           <h2 className="mt-4 text-xl font-semibold text-gray-900">
//             Verification submitted
//           </h2>

//           <p className="mt-2 text-sm text-gray-600">
//             Your identity check is being processed. This usually takes just a
//             moment. You will be redirected automatically once confirmed.
//           </p>

//           <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
//             <Loader2 className="h-3.5 w-3.5 animate-spin" />
//             <span>Waiting for confirmation…</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (pageState === "failed") {
//     return (
//       <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
//         <div className="px-6 py-10 text-center sm:px-8">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
//             <XCircle className="h-7 w-7" />
//           </div>

//           <h2 className="mt-4 text-xl font-semibold text-gray-900">
//             Verification failed
//           </h2>

//           <p className="mt-2 text-sm text-gray-600">
//             Something went wrong during verification. Please try again and make
//             sure your document and face are clearly visible.
//           </p>

//           <button
//             type="button"
//             onClick={() => setPageState("idle")}
//             className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//           >
//             Try again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//       <div className="border-b border-gray-100 bg-blue-50 px-6 py-6 sm:px-8">
//         <div className="flex items-start gap-4">
//           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
//             <ShieldCheck className="h-6 w-6" />
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Identity Verification
//             </h2>

//             <p className="mt-1 text-sm leading-6 text-gray-600">
//               Confirm your details and complete a secure identity check to
//               unlock all account features.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-7 px-6 py-7 sm:px-8">
//         <div>
//           <h3 className="text-sm font-semibold text-gray-900">
//             Personal information
//           </h3>

//           <p className="mt-1 text-sm text-gray-500">
//             These details were retrieved from your profile and cannot be edited
//             here.
//           </p>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2">
//           <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
//             <CustomInput
//               label="First name"
//               name="firstname"
//               control={control}
//               readOnly
//             />
//           </div>

//           <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
//             <CustomInput
//               label="Last name"
//               name="lastname"
//               control={control}
//               readOnly
//             />
//           </div>

//           <div className="sm:col-span-2 [&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
//             <CustomInput
//               label="Email address"
//               name="email"
//               control={control}
//               readOnly
//             />
//           </div>
//         </div>

//         <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
//           <h3 className="text-sm font-semibold text-gray-900">
//             What you will need
//           </h3>

//           <div className="mt-4 space-y-4">
//             <div className="flex items-start gap-3">
//               <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   A valid government-issued ID
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-500">
//                   Passport, national ID card, or driving licence.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <ScanFace className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   A facial verification check
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-500">
//                   Make sure your face is visible in a well-lit area.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   A camera-enabled device
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-500">
//                   You will be asked to allow camera access.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={handleStartVerification}
//           disabled={isStartingDiditKyc}
//           className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {isStartingDiditKyc && <Loader2 className="h-4 w-4 animate-spin" />}
//           {isStartingDiditKyc
//             ? "Preparing verification..."
//             : "Start identity verification"}
//         </button>

//         <p className="text-center text-xs text-gray-400">
//           Your verification is securely processed by Didit.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default KycVerification;

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileCheck2,
  Loader2,
  RefreshCw,
  ScanFace,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import CustomInput from "@/components/forms/CustomInput";
import { useFetchProfile } from "@/hooks/apiHooks";
import { useDidit } from "@/hooks/useDidit";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useKycSession } from "@/hooks/useKycSession";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { showErrorToast } from "@/utils/toastUtils";
import api from "@/lib/axios";

type KycFormValues = {
  email: string;
  firstname: string;
  lastname: string;
};

type PageState =
  | "idle"
  | "pending_review"
  | "in_review"
  | "verified"
  | "declined"
  | "failed"
  | "poll_exhausted";

const EDIT_PROFILE_ROUTE = "/dashboard/profile/edit-profile";
const DASHBOARD_ROUTE = "/dashboard";
const REDIRECT_DELAY_MS = 3000;
const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 10;

const statusToPageState = (status: string): PageState | null => {
  switch (status) {
    case "APPROVED":
      return "verified";
    case "DECLINED":
      return "declined";
    case "IN_REVIEW":
    case "In Review":
      return "in_review";
    case "In Progress":
    case "Not Started":
      return null; // no session yet or still initialising
    default:
      return null;
  }
};

const KycVerification = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const myProfileQuery = useFetchProfile(userObject, Boolean(userObject));
  const profile = myProfileQuery.data?.data;

  const kycSessionQuery = useKycSession({
    email: profile?.email,
    enabled: Boolean(profile?.email),
  });
  const latestSession = kycSessionQuery.data;

  // Derive initial page state from the existing session on mount.
  // Local state takes over once the user starts a new flow this visit.
  const [pageState, setPageState] = useState<PageState>("idle");
  const [initialisedFromSession, setInitialisedFromSession] = useState(false);

  useEffect(() => {
    if (initialisedFromSession || kycSessionQuery.isLoading) return;
    if (!latestSession) {
      setInitialisedFromSession(true);
      return;
    }

    const derived = statusToPageState(latestSession.status);
    if (derived) setPageState(derived);
    setInitialisedFromSession(true);
  }, [latestSession, kycSessionQuery.isLoading, initialisedFromSession]);

  const pollAttemptsRef = useRef(0);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isVerified = profile?.kycVerified === true;

  const fullName = profile?.fullName?.trim() ?? "";
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const firstname = nameParts[0] ?? "";
  const lastname = nameParts.slice(1).join(" ");

  const isProfileComplete =
    Boolean(profile?.email?.trim()) &&
    nameParts.length >= 2 &&
    Boolean(profile?.username?.trim()) &&
    Boolean(profile?.gender) &&
    Boolean(profile?.location?.trim());

  const stopPolling = () => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const verifyCreatorMutation = useCustomMutation({
    endpoint: "profile/verify",
    successMessage: () => "Verification complete",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });
      stopPolling();
      setPageState("verified");
      setTimeout(() => navigate(DASHBOARD_ROUTE), REDIRECT_DELAY_MS);
    },
    onError: (error: any) => {
      console.warn("profile/verify failed:", error);
    },
  });

  const startPollingStatus = (sessionId: string) => {
    pollAttemptsRef.current = 0;

    const poll = async () => {
      if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
        setPageState("poll_exhausted");
        return;
      }

      pollAttemptsRef.current += 1;

      try {
        const response = await api.get(`kyc/${sessionId}/status`);
        const status = response.data?.body?.status as string | undefined;

        if (!status) {
          pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
          return;
        }

        if (status === "APPROVED") {
          verifyCreatorMutation.mutate({});
          return;
        }

        if (status === "DECLINED") {
          stopPolling();
          setPageState("declined");
          return;
        }

        if (status === "IN_REVIEW" || status === "In Review") {
          stopPolling();
          setPageState("in_review");
          return;
        }

        pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (err) {
        console.warn("Status poll error:", err);
        pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
  };

  const { startDiditKyc, isStartingDiditKyc } = useDidit({
    onVerificationCompleted: (sessionId) => {
      setPageState("pending_review");
      startPollingStatus(sessionId);
    },
    onVerificationCancelled: () => setPageState("idle"),
    onVerificationFailed: () => setPageState("failed"),
  });

  const { control, getValues, reset } = useForm<KycFormValues>({
    defaultValues: { email: "", firstname: "", lastname: "" },
  });

  useEffect(() => {
    if (!myProfileQuery.isSuccess || isProfileComplete) return;
    showErrorToast(
      "Please complete your profile before starting identity verification.",
    );
    navigate(EDIT_PROFILE_ROUTE, { replace: true });
  }, [myProfileQuery.isSuccess, isProfileComplete, navigate]);

  useEffect(() => {
    if (!profile || !isProfileComplete) return;
    reset({ email: profile.email ?? "", firstname, lastname });
  }, [profile, firstname, lastname, isProfileComplete, reset]);

  const handleStartVerification = () => {
    if (pageState === "pending_review" || isVerified || isStartingDiditKyc)
      return;

    if (!isProfileComplete) {
      navigate(EDIT_PROFILE_ROUTE, {
        state: {
          message:
            "Please complete your profile before starting identity verification.",
        },
      });
      return;
    }

    const { email, firstname: fn, lastname: ln } = getValues();
    if (!email || !fn || !ln) return;

    startDiditKyc({
      email,
      firstname: fn,
      lastname: ln,
      cbUrl: window.location.origin,
    });
  };

  // Loading — wait for both profile and session before deciding state
  if (
    myProfileQuery.isLoading ||
    kycSessionQuery.isLoading ||
    !initialisedFromSession
  ) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  if (myProfileQuery.isError) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-red-200 bg-red-50 p-5 text-center">
        <p className="text-sm text-red-700">
          We could not retrieve your profile. Please refresh the page and try
          again.
        </p>
      </div>
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  if (isVerified || pageState === "verified") {
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white">
        <div className="px-6 py-10 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Identity verified
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your identity has been verified. You now have full access to your
            account.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Redirecting you to the dashboard…
          </p>
          <button
            type="button"
            onClick={() => navigate(DASHBOARD_ROUTE)}
            className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (pageState === "pending_review") {
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-10 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-primary">
            <Clock className="h-7 w-7 animate-pulse" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Verification submitted
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your identity check is being processed. This usually takes just a
            moment. You will be redirected automatically once confirmed.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Waiting for confirmation…</span>
          </div>
          <button
            type="button"
            onClick={() => navigate(DASHBOARD_ROUTE)}
            className="mt-6 text-sm font-medium text-primary hover:underline"
          >
            Continue to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (pageState === "in_review") {
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-yellow-200 bg-white shadow-sm">
        <div className="px-6 py-10 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <Clock className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Under manual review
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your verification has been flagged for a manual review by our team.
            This can take up to 24 hours. We'll notify you once it's done — you
            don't need to do anything right now.
          </p>
          <button
            type="button"
            onClick={() => navigate(DASHBOARD_ROUTE)}
            className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (pageState === "declined") {
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="px-6 py-10 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <XCircle className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Verification declined
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your identity check did not pass. This is usually due to a name
            mismatch or the document or face not being clearly visible. Please
            try again with a valid government-issued ID.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setPageState("idle")}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => navigate(DASHBOARD_ROUTE)}
              className="text-sm font-medium text-gray-500 hover:underline"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === "failed") {
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="px-6 py-10 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            The verification could not be completed. Please check your camera
            permissions and try again.
          </p>
          <button
            type="button"
            onClick={() => setPageState("idle")}
            className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (pageState === "poll_exhausted") {
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-10 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <RefreshCw className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Still processing
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your verification was submitted but we haven't received a
            confirmation yet. This can occasionally take a few minutes.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={async () => {
                // Re-fetch the latest session to get current sessionId,
                // then resume polling against it.
                const result = await kycSessionQuery.refetch();
                const session = result.data;
                if (session?.sessionId) {
                  pollAttemptsRef.current = 0;
                  setPageState("pending_review");
                  startPollingStatus(session.sessionId);
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Check again
            </button>
            <button
              type="button"
              onClick={() => navigate(DASHBOARD_ROUTE)}
              className="text-sm font-medium text-gray-500 hover:underline"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-blue-50 px-6 py-6 sm:px-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Identity Verification
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Confirm your details and complete a secure identity check to
              unlock all account features.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-7 px-6 py-7 sm:px-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Personal information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            These details were retrieved from your profile and cannot be edited
            here.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
            <CustomInput
              label="First name"
              name="firstname"
              control={control}
              readOnly
            />
          </div>
          <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
            <CustomInput
              label="Last name"
              name="lastname"
              control={control}
              readOnly
            />
          </div>
          <div className="sm:col-span-2 [&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
            <CustomInput
              label="Email address"
              name="email"
              control={control}
              readOnly
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-sm font-semibold text-gray-900">
            What you will need
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  A valid government-issued ID
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Passport, national ID card, or driving licence.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ScanFace className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  A facial verification check
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Make sure your face is visible in a well-lit area.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  A camera-enabled device
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  You will be asked to allow camera access.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartVerification}
          disabled={isStartingDiditKyc}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isStartingDiditKyc && <Loader2 className="h-4 w-4 animate-spin" />}
          {isStartingDiditKyc
            ? "Preparing verification..."
            : "Start identity verification"}
        </button>

        <p className="text-center text-xs text-gray-400">
          Your verification is securely processed by Didit.
        </p>
      </div>
    </div>
  );
};

export default KycVerification;
