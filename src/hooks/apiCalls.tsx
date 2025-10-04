/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  // UseMutationOptions,
  // UseMutationResult,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface UseDataOptions {
  url: string;
  queryKey: string[];
  enabled?: any;
}
interface UseGetDataByIdOptions {
  url: string;
  queryKey: string[];
  enabled?: any;
  // onError?: (error: any) => void;
  onSettled?: any;
}

export interface UploadResponse {
  data: {
    remark: string;
    filePath: string;
  };
  status: number;
}

export interface UploadError {
  response: {
    data: {
      errors: {
        CreatedBy: string[];
        UploadFile: string[];
      };
    };
  };
}

type SuccessHandler = (data: UploadResponse) => void;
type ErrorHandler = (error: UploadError) => void;

interface MutationResponse {
  status: number;
  data: {
    remark: string;
    [key: string]: any;
  };
}

interface CustomMutationOptions<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  endpoint: string;
  method?: "get" | "post" | "put" | "delete";
  successMessage?: (data: TData) => void | string;
  errorMessage?: (error: TError) => void | string;
  onSuccessCallback?: (data: TData) => void;
  contentType?: "multipart/form-data" | "application/json";
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >;
}

export const useGetData = ({ url, queryKey, enabled }: UseDataOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
    retry: false,
    // retry: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
};

export const useGetDataById = ({
  url,
  queryKey,
  enabled,
}: UseGetDataByIdOptions) => {
  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url);
      return response?.data;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled,
  });
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
    method = "post",
    contentType = "application/json",
    ...mutationOptions
  } = options;

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      if (contentType === "multipart/form-data") {
        const response = await api[method]<TData>(endpoint, variables, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } else {
        const response = await api[method]<TData>(endpoint, variables, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      }
    },

    onSuccess: (data: any) => {
      // Custom handling based on statusCode
      if (data?.statusCode === -991) {
        // Treat as an error based on business logic
        const message =
          errorMessage?.(data?.message) ||
          data?.message ||
          "An unexpected error occurred";
        toast.error(message);
        //   Using the condition data === " for when a user logs out"
      } else if (data?.statusCode === 991 || data === "") {
        // Standard success logic
        if (successMessage) {
          toast.success(successMessage(data));
        }
        if (onSuccessCallback) {
          onSuccessCallback(data);
        }
      }
    },
    onError: (error: any) => {
      const message = errorMessage
        ? errorMessage(
            error?.response?.data?.data?.message || error?.response || error
          )
        : error?.response?.data?.data?.message ||
          "An unexpected error occurred";
      toast.error(message);
    },
    ...mutationOptions,
  });
};

export const useUploadMutation = (
  onSuccessHandler?: SuccessHandler,
  onErrorHandler?: ErrorHandler
): UseMutationResult<UploadResponse, UploadError, FormData> => {
  return useMutation<UploadResponse, UploadError, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await api.post("profile/upload-picture", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      toast(data?.remark);
      if (onSuccessHandler) {
        onSuccessHandler(data);
      }
    },
    onError: (error) => {
      const { CreatedBy, UploadFile } = error?.response?.data?.errors || {};
      if (CreatedBy) toast.error(CreatedBy[0]);
      if (UploadFile) toast.error(UploadFile[0]);
      if (onErrorHandler) {
        onErrorHandler(error);
      }
    },
  });
};
