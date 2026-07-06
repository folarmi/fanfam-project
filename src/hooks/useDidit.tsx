// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
// import { DiditSdk } from "@didit-protocol/sdk-web";
// import { toast } from "react-toastify";
// import { useCustomMutation } from "./apiCalls";

// type StartDiditKycPayload = {
//   email: string;
//   firstname: string;
//   lastname: string;
//   cbUrl: string;
// };

// export const useDidit = () => {
//   useEffect(() => {
//     DiditSdk.shared.onComplete = (result) => {
//       if (result.type === "completed") {
//         toast.success("Verification submitted successfully");
//       }

//       if (result.type === "cancelled") {
//         toast.info("Verification was cancelled");
//       }

//       if (result.type === "failed") {
//         toast.error(result.error?.message || "Verification failed");
//       }
//     };

//     DiditSdk.shared.onStateChange = (sdkState, error) => {
//       if (sdkState === "error") {
//         toast.error(error || "Something went wrong with verification");
//       }
//     };
//   }, []);

//   const diditKycMutation = useCustomMutation({
//     endpoint: "kyc/init",

//     onSuccessCallback: (response: any) => {
//       // adjust this single line based on what you confirm below
//       const responseData = response?.body ?? response?.data?.body;

//       const verificationUrl = responseData?.url;

//       if (!verificationUrl) {
//         console.log("Didit response:", response);
//         toast.error("Verification link was not returned");
//         return;
//       }

//       DiditSdk.shared.startVerification({
//         url: verificationUrl,
//         configuration: {
//           loggingEnabled: true,
//           zIndex: 99999,
//           showCloseButton: true,
//           showExitConfirmation: true,
//           closeModalOnComplete: false,
//         },
//       });
//     },
//   });

//   const startDiditKyc = (payload: StartDiditKycPayload) => {
//     diditKycMutation.mutate(payload);
//   };

//   return {
//     startDiditKyc,
//     isStartingDiditKyc: diditKycMutation.isPending,
//     diditKycMutation,
//   };
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
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

export const useDidit = () => {
  useEffect(() => {
    DiditSdk.shared.onComplete = (result) => {
      if (result.type === "completed") {
        toast.success("Verification submitted successfully");
      }

      if (result.type === "cancelled") {
        toast.info("Verification was cancelled");
      }

      if (result.type === "failed") {
        toast.error(result.error?.message || "Verification failed");
      }
    };

    DiditSdk.shared.onStateChange = (sdkState, error) => {
      if (sdkState === "error") {
        toast.error(error || "Something went wrong with verification");
      }
    };
  }, []);

  const diditKycMutation = useMutation({
    mutationFn: async (payload: StartDiditKycPayload) => {
      const response = await api.post("kyc/init", payload);
      return response.data;
    },
    onSuccess: (data: any) => {
      const verificationUrl = data?.body?.url;

      if (!verificationUrl) {
        console.log("Didit response:", data);
        toast.error("Verification link was not returned");
        return;
      }

      DiditSdk.shared.startVerification({
        url: verificationUrl,
        configuration: {
          loggingEnabled: true,
          zIndex: 99999,
          showCloseButton: true,
          showExitConfirmation: true,
          closeModalOnComplete: false,
        },
      });
    },
    onError: (error: any) => {
      console.log("Didit init error:", error);
      toast.error("Failed to start verification");
    },
  });

  const startDiditKyc = (payload: StartDiditKycPayload) => {
    diditKycMutation.mutate(payload);
  };

  return {
    startDiditKyc,
    isStartingDiditKyc: diditKycMutation.isPending,
    diditKycMutation,
  };
};
