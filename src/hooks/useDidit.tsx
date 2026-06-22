// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
// import { DiditSdk } from "@didit-protocol/sdk-web";
// import { toast } from "react-toastify";
// import { useCustomMutation } from "./apiCalls";

// export const useDidit = () => {
//   useEffect(() => {
//     DiditSdk.shared.onComplete = (result) => {
//       if (result.type === "completed")
//         toast.success("Verification submitted successfully");
//       if (result.type === "cancelled") toast.info("Verification was cancelled");
//       if (result.type === "failed")
//         toast.error(result.error?.message || "Verification failed");
//     };

//     DiditSdk.shared.onStateChange = (sdkState, error) => {
//       if (sdkState === "error")
//         toast.error(error || "Something went wrong with verification");
//     };
//   }, []);

//   const diditKycMutation = useCustomMutation({
//     endpoint: "kyc/create-session",
//     successMessage: (data: any) => data?.data?.message,
//     onSuccessCallback: (data) => {
//       const verificationUrl =
//         data?.data?.verificationUrl ||
//         data?.data?.verification_url ||
//         data?.data?.url;

//       if (!verificationUrl) {
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

//   return {
//     startDiditKyc: () => diditKycMutation.mutate({}),
//     isStartingDiditKyc: diditKycMutation.isPending,
//     diditKycMutation,
//   };
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { DiditSdk } from "@didit-protocol/sdk-web";
import { toast } from "react-toastify";
import { useCustomMutation } from "./apiCalls";

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

  const diditKycMutation = useCustomMutation({
    endpoint: "kyc/init",
    onSuccessCallback: (response: any) => {
      const responseData = response?.data?.data ?? response?.data ?? response;

      const verificationUrl =
        responseData?.verificationUrl ||
        responseData?.verification_url ||
        responseData?.url;

      if (!verificationUrl) {
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
