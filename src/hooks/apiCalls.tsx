// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   useMutation,
//   // UseMutationOptions,
//   // UseMutationResult,
//   useQuery,
//   type UseMutationOptions,
//   type UseMutationResult,
// } from "@tanstack/react-query";
// import api from "../lib/axios";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";

// interface UseDataOptions {
//   url: string;
//   queryKey: string[];
//   enabled?: any;
// }
// interface UseGetDataByIdOptions {
//   url: string;
//   queryKey: string[];
//   enabled?: any;
//   // onError?: (error: any) => void;
//   onSettled?: any;
// }

// export interface UploadResponse {
//   data: {
//     remark: string;
//     filePath: string;
//   };
//   status: number;
// }

// export interface UploadError {
//   response: {
//     data: {
//       errors: {
//         CreatedBy: string[];
//         UploadFile: string[];
//       };
//     };
//   };
// }

// type SuccessHandler = (data: UploadResponse) => void;
// type ErrorHandler = (error: UploadError) => void;

// interface MutationResponse {
//   status: number;
//   data: {
//     remark: string;
//     [key: string]: any;
//   };
// }

// interface CustomMutationOptions<TData, TError, TVariables, TContext>
//   extends UseMutationOptions<TData, TError, TVariables, TContext> {
//   endpoint: string;
//   method?: "get" | "post" | "put" | "delete";
//   successMessage?: (data: TData) => void | string;
//   errorMessage?: (error: TError) => void | string;
//   onSuccessCallback?: (data: TData) => void;
//   contentType?: "multipart/form-data" | "application/json";
//   mutationOptions?: Omit<
//     UseMutationOptions<TData, TError, TVariables, TContext>,
//     "mutationFn"
//   >;
// }

// export const useGetData = ({ url, queryKey, enabled }: UseDataOptions) => {
//   return useQuery<any>({
//     queryKey,
//     queryFn: async () => {
//       const response = await api.get(url);
//       return response?.data;
//     },
//     retry: false,
//     // retry: true,
//     refetchOnMount: true,
//     refetchOnWindowFocus: false,
//     staleTime: 0,
//     enabled,
//   });
// };

// export const useGetDataById = ({
//   url,
//   queryKey,
//   enabled,
// }: UseGetDataByIdOptions) => {
//   return useQuery<any>({
//     queryKey,
//     queryFn: async () => {
//       const response = await api.get(url);
//       return response?.data;
//     },
//     retry: false,
//     refetchOnMount: true,
//     refetchOnWindowFocus: false,
//     staleTime: 0,
//     enabled,
//   });
// };

// export const useCustomMutation = <
//   TData = MutationResponse,
//   TError = AxiosError,
//   TVariables = unknown,
//   TContext = unknown
// >(
//   options: CustomMutationOptions<TData, TError, TVariables, TContext>
// ): UseMutationResult<TData, TError, TVariables, TContext> => {
//   const {
//     endpoint,
//     successMessage,
//     errorMessage,
//     onSuccessCallback,
//     method = "post",
//     contentType = "application/json",
//     ...mutationOptions
//   } = options;

//   return useMutation<TData, TError, TVariables, TContext>({
//     mutationFn: async (variables: TVariables) => {
//       if (contentType === "multipart/form-data") {
//         const response = await api[method]<TData>(endpoint, variables, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         return response.data;
//       } else {
//         const response = await api[method]<TData>(endpoint, variables, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         return response.data;
//       }
//     },

//     onSuccess: (data: any) => {
//       // Custom handling based on statusCode
//       if (data?.statusCode === -991) {
//         // Treat as an error based on business logic
//         const message =
//           errorMessage?.(data?.message) ||
//           data?.message ||
//           "An unexpected error occurred";
//         toast.error(message);
//         //   Using the condition data === " for when a user logs out"
//       } else if (data?.statusCode === 991 || data === "") {
//         // Standard success logic
//         if (successMessage) {
//           toast.success(successMessage(data) ?? "Operation successful");
//         }
//         if (onSuccessCallback) {
//           onSuccessCallback(data);
//         }
//       }
//     },
//     onError: (error: any) => {
//       const message = errorMessage
//         ? errorMessage(
//             error?.response?.data?.data?.message || error?.response || error
//           )
//         : error?.response?.data?.data?.message ||
//           "An unexpected error occurred";
//       toast.error(message);
//     },
//     ...mutationOptions,
//   });
// };

// export const useUploadMutation = (
//   onSuccessHandler?: SuccessHandler,
//   onErrorHandler?: ErrorHandler
// ): UseMutationResult<UploadResponse, UploadError, FormData> => {
//   return useMutation<UploadResponse, UploadError, FormData>({
//     mutationFn: async (data: FormData) => {
//       const response = await api.post("profile/upload-picture", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     },
//     onSuccess: (data: any) => {
//       toast(data?.remark);
//       if (onSuccessHandler) {
//         onSuccessHandler(data);
//       }
//     },
//     onError: (error) => {
//       const { CreatedBy, UploadFile } = error?.response?.data?.errors || {};
//       if (CreatedBy) toast.error(CreatedBy[0]);
//       if (UploadFile) toast.error(UploadFile[0]);
//       if (onErrorHandler) {
//         onErrorHandler(error);
//       }
//     },
//   });
// };

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // UseMutationOptions,
  // UseMutationResult,
  // UseQueryOptions,
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "../lib/axios";
import {
  getApiErrors,
  showErrorToast,
  showSuccessToast,
} from "@/utils/toastUtils";

interface MutationResponse {
  [x: string]: any;
  status: number;
  data: {
    remark: string;
    [key: string]: any;
  };
}

interface UseDataOptions
  extends Omit<UseQueryOptions<any, any>, "queryKey" | "queryFn"> {
  url: string;
  queryKey: string[];
  enabled?: any;
}

interface CustomMutationOptions<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  endpoint: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  successMessage?: (data: TData) => string;
  errorMessage?: (error: TError) => string | void;
  onSuccessCallback?: (data: TData) => void;
  contentType?:
    | "application/x-www-form-urlencoded"
    | "application/json"
    | "multipart/form-data";
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >;
}

type FileUploadOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  successToast?: string | ((data: any) => string);
  errorToast?: string | ((error: AxiosError) => string);
  method?: "get" | "post" | "put" | "delete";
  url?: string;
};

export const useCustomMutation = <
  TData = MutationResponse,
  TError = AxiosError,
  TVariables = unknown,
  TContext = unknown
>(
  options: CustomMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const {
    endpoint,
    successMessage,
    errorMessage,
    onSuccessCallback,
    contentType = "application/json",
    method = "post",
    ...mutationOptions
  } = options;

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const response = await api[method]<TData>(endpoint, variables, {
        headers: {
          "Content-Type": contentType,
          // Accept: "application/json",
        },
      });
      return response.data;
    },

    onSuccess: (data: any) => {
      if (data?.success || data?.statusCode === 991) {
        if (successMessage) {
          showSuccessToast(successMessage(data));
        }
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      }
    },

    onError: (error: any) => {
      try {
        let message: string | string[] | Record<string, string[]>;

        if (options.errorMessage) {
          // Try custom error message first
          const customErrorMessage = options.errorMessage(error);
          message = customErrorMessage ?? getApiErrors(error);

          // If custom error message returns null/undefined, fallback to getApiErrors
          if (!message) {
            message = getApiErrors(error);
          }
        } else {
          message = getApiErrors(error);
        }

        // Enhanced safety check
        if (
          !message ||
          (typeof message === "string" && message.trim() === "") ||
          (Array.isArray(message) && message.length === 0) ||
          (typeof message === "object" &&
            message !== null &&
            Object.keys(message).length === 0)
        ) {
          message = "An unexpected error occurred"; // Fixed typo
        }

        showErrorToast(message);
      } catch (e) {
        console.error("Error processing error message:", e);
        showErrorToast("Failed to process error");
      }
    },
    ...mutationOptions,
  });
};

export const useGetData = ({
  url,
  queryKey,
  enabled,
  ...rest
}: UseDataOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
    enabled,
    retry: false,
    // retry: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    ...rest,
  });
};

// File uploader component
export const useFileUpload = ({
  errorToast,
  method = "post",
  onError,
  onSuccess,
  successToast,
  url = "appointment/api/files/upload",
}: FileUploadOptions) => {
  return useMutation<
    any,
    AxiosError,
    {
      file: File | File[] | null | undefined | any;
      extraData?: Record<string, any>;
    }
  >({
    mutationFn: async ({ file, extraData }) => {
      const formData = new FormData();

      // Handle both single file and array of files
      if (Array.isArray(file)) {
        file.forEach((file) => {
          formData.append(`files`, file);
        });
      } else {
        formData.append("file", file);
      }

      if (extraData) {
        Object.entries(extraData).forEach(([key, value]) => {
          // Handle nested objects by stringifying them
          if (typeof value === "object" && !(value instanceof File)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
      }

      const response = await api[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data?.isSuccess) {
        const message: any =
          typeof successToast === "function"
            ? successToast(data)
            : successToast;
        showSuccessToast(message);
      }
      onSuccess?.(data);
    },
    onError: (error: any) => {
      if (errorToast) {
        const message =
          typeof errorToast === "function" ? errorToast(error) : errorToast;
        showErrorToast(message);
      } else {
        showErrorToast(error.response?.data?.message || "File upload failed");
      }
      onError?.(error);
    },
  });
};

export const useGetDoctorProfile = (enabled: boolean = true) => {
  return useQuery<any>({
    queryKey: ["GetDoctorProfile"],
    queryFn: async () => {
      const response = await api.get("appointment/api/doctors/profile");
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetPatientProfile = (enabled: boolean = true) => {
  return useQuery<any>({
    queryKey: ["GetPatientProfile"],
    queryFn: async () => {
      const response = await api.get("appointment/api/patients/profile");
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetDoctorAvailableSessions = (
  doctorId: string | undefined,
  enabled: boolean = true
) => {
  return useQuery<any>({
    queryKey: ["GetDoctorAvailableSessions"],
    queryFn: async () => {
      const response = await api.get(
        `appointment/api/doctors/${doctorId}/available-sessions`
      );
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetSingleDoctorData = (enabled: boolean = true, id: string) => {
  return useQuery<any>({
    queryKey: ["GetSingleDoctor"],
    queryFn: async () => {
      const response = await api.get(`appointment/api/doctors/${id}`);
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};
