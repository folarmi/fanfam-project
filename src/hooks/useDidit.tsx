// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { DiditSdk } from "@didit-protocol/sdk-web";
// import { toast } from "react-toastify";
// import api from "@/lib/axios";

// type StartDiditKycPayload = {
//   email: string;
//   firstname: string;
//   lastname: string;
//   cbUrl: string;
// };

// type UseDiditOptions = {
//   onVerificationCompleted?: () => void;
//   onVerificationCancelled?: () => void;
//   onVerificationFailed?: (message: string) => void;
// };

// export const useDidit = ({
//   onVerificationCompleted,
//   onVerificationCancelled,
//   onVerificationFailed,
// }: UseDiditOptions = {}) => {
//   useEffect(() => {
//     DiditSdk.shared.onComplete = (result) => {
//       if (result.type === "completed") {
//         onVerificationCompleted?.();
//       }

//       if (result.type === "cancelled") {
//         toast.info("Verification was cancelled");
//         onVerificationCancelled?.();
//       }

//       if (result.type === "failed") {
//         const message = result.error?.message || "Verification failed";
//         toast.error(message);
//         onVerificationFailed?.(message);
//       }
//     };

//     DiditSdk.shared.onStateChange = (sdkState, error) => {
//       if (sdkState === "error") {
//         toast.error(error || "Something went wrong with verification");
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const diditKycMutation = useMutation({
//     mutationFn: async (payload: StartDiditKycPayload) => {
//       const response = await api.post("kyc/init", payload);
//       return response.data;
//     },
//     onSuccess: (data: any) => {
//       const verificationUrl = data?.body?.url;

//       if (!verificationUrl) {
//         console.log("Didit response:", data);
//         toast.error("Verification link was not returned");
//         return;
//       }

//       DiditSdk.shared.startVerification({
//         url: verificationUrl,
//         configuration: {
//           loggingEnabled: true,
//           zIndex: 99999,
//           showCloseButton: true,
//           showExitConfirmation: false, // prevents double "are you sure" prompt
//           closeModalOnComplete: true, // closes modal cleanly after completion
//         },
//       });
//     },
//     onError: (error: any) => {
//       console.log("Didit init error:", error);
//       toast.error("Failed to start verification. Please try again.");
//     },
//   });

//   return {
//     startDiditKyc: (payload: StartDiditKycPayload) =>
//       diditKycMutation.mutate(payload),
//     isStartingDiditKyc: diditKycMutation.isPending,
//     diditKycMutation,
//   };
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { DiditSdk } from "@didit-protocol/sdk-web";
import { toast } from "react-toastify";
import api from "@/lib/axios";

type StartDiditKycPayload = {
  email: string;
  firstname: string;
  lastname: string;
  cbUrl: string;
};

type UseDiditOptions = {
  onVerificationCompleted?: (sessionId: string) => void;
  onVerificationCancelled?: () => void;
  onVerificationFailed?: (message: string) => void;
};

export const useDidit = ({
  onVerificationCompleted,
  onVerificationCancelled,
  onVerificationFailed,
}: UseDiditOptions = {}) => {
  // Hold sessionId so we can pass it to onVerificationCompleted
  // even though onComplete fires asynchronously after startVerification.
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    DiditSdk.shared.onComplete = (result) => {
      if (result.type === "completed") {
        onVerificationCompleted?.(sessionIdRef.current ?? "");
      }

      if (result.type === "cancelled") {
        toast.info("Verification was cancelled");
        onVerificationCancelled?.();
      }

      if (result.type === "failed") {
        const message = result.error?.message || "Verification failed";
        toast.error(message);
        onVerificationFailed?.(message);
      }
    };

    DiditSdk.shared.onStateChange = (sdkState, error) => {
      if (sdkState === "error") {
        toast.error(error || "Something went wrong with verification");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const diditKycMutation = useMutation({
    mutationFn: async (payload: StartDiditKycPayload) => {
      const response = await api.post("kyc/init", payload);
      return response.data;
    },
    onSuccess: (data: any) => {
      const verificationUrl = data?.body?.url;
      const sessionId = data?.body?.sessionId;

      if (!verificationUrl) {
        console.log("Didit response:", data);
        toast.error("Verification link was not returned");
        return;
      }

      // Store for onComplete to use
      sessionIdRef.current = sessionId ?? null;

      DiditSdk.shared.startVerification({
        url: verificationUrl,
        configuration: {
          loggingEnabled: true,
          zIndex: 99999,
          showCloseButton: true,
          showExitConfirmation: false,
          closeModalOnComplete: true,
        },
      });
    },
    onError: (error: any) => {
      console.log("Didit init error:", error);
      toast.error("Failed to start verification. Please try again.");
    },
  });

  return {
    startDiditKyc: (payload: StartDiditKycPayload) =>
      diditKycMutation.mutate(payload),
    isStartingDiditKyc: diditKycMutation.isPending,
    diditKycMutation,
  };
};
