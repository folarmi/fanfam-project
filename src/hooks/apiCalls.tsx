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
// import { da } from "date-fns/locale";

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
  useQueryParams?: boolean;
  queryParamsKey?: string; // Key for query params in variables object
  bodyKey?: string; // Key for body data in variables object
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
    useQueryParams = false,
    queryParamsKey = "params", // Default key for query params
    bodyKey = "body", // Default key for body data
    ...mutationOptions
  } = options;

  return useMutation<TData, TError, TVariables, TContext>({
    // mutationFn: async (variables: TVariables) => {
    //   let finalEndpoint = endpoint;
    //   let requestData = variables;

    //   // If useQueryParams is true, append variables as query parameters
    //   if (useQueryParams && variables) {
    //     const params = new URLSearchParams(
    //       variables as Record<string, string>
    //     ).toString();
    //     finalEndpoint = `${endpoint}?${params}`;
    //     requestData = undefined as any; // No body for query params
    //   }

    //   // Handle different HTTP methods
    //   let response;
    //   if (method === "get" || method === "delete") {
    //     // GET and DELETE typically don't have a body
    //     response = await api[method]<TData>(finalEndpoint, {
    //       headers: {
    //         "Content-Type": contentType,
    //       },
    //     });
    //   } else {
    //     // POST, PUT, PATCH have a body
    //     response = await api[method]<TData>(
    //       finalEndpoint,
    //       useQueryParams ? undefined : requestData,
    //       {
    //         headers: {
    //           "Content-Type": contentType,
    //         },
    //       }
    //     );
    //   }

    //   return response.data;
    // },

    mutationFn: async (variables: TVariables) => {
      let finalEndpoint = endpoint;
      let requestData: any = variables;

      // If useQueryParams is true, extract and append query parameters
      if (useQueryParams && variables) {
        const varsObject = variables as Record<string, any>;

        // Extract query params from the specified key
        const queryParamsData = varsObject[queryParamsKey];

        if (queryParamsData) {
          const params = new URLSearchParams(
            queryParamsData as Record<string, string>
          ).toString();
          finalEndpoint = `${endpoint}?${params}`;
        }

        // Extract body data from the specified key (if exists)
        requestData =
          varsObject[bodyKey] !== undefined ? varsObject[bodyKey] : undefined;
      }

      // Handle different HTTP methods
      let response;
      if (method === "get" || method === "delete") {
        // GET and DELETE typically don't have a body
        response = await api[method]<TData>(finalEndpoint, {
          headers: {
            "Content-Type": contentType,
          },
        });
      } else {
        // POST, PUT, PATCH with body
        response = await api[method]<TData>(finalEndpoint, requestData, {
          headers: {
            "Content-Type": contentType,
          },
        });
      }

      return response.data;
    },

    onSuccess: (data: any) => {
      if (
        data === undefined ||
        data === null ||
        Object.keys(data || {}).length === 0
      ) {
        if (successMessage) showSuccessToast("Logout successfully");
        if (onSuccessCallback) onSuccessCallback(data);
        return;
      }

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
