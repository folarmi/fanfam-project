


/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const EAON_HEADERS = {
  EAONCREDENTIALKEY: "K1T2U3V4W5X6Y7Z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S4Y5Z6a7b8c9d0e1f2",
  EAONCREDENTIALVALUE: "V1T2bR3yL4FpU5qZvS6xC7dG8hIoJ9kApLbQcM1uN2vXwO3xY4zU5hV6mB7nC8oD9pE0qF1rG2sH3tI4uJ5vK6wL7xM8yN9zA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kK0lL1mM2nN3oO4pP5qQ6rR7sS8tT9uU0vV1wW2xX3yY4zZ50A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X"
};

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = config.headers ?? {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(`⚠️ [Axios Request] No token found for ${config.url}`);
    }

    // Apply extra headers
    Object.assign(config.headers, EAON_HEADERS);

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    const errorData = error.response?.data;

    // Enhanced logging for debugging
    if (status === 401) {
      console.error(`❌ [Axios Response] 401 Unauthorized for ${originalRequest?.url}`);
      console.log("📦 Response data:", errorData);
      console.log("🔑 Headers sent:", originalRequest?.headers);
    }

    // More specific check for authentication failures
    // Only treat as auth failure if it's actually a token issue, not a business logic error
    const isTokenExpired = 
      message?.toLowerCase().includes("token expired") ||
      message?.toLowerCase().includes("invalid token") ||
      message?.toLowerCase().includes("jwt expired") ||
      message?.toLowerCase().includes("token is invalid") ||
      message?.toLowerCase().includes("authentication failed");

    const isMissingAuth = 
      status === 400 &&
      typeof message === "string" &&
      message.toLowerCase().includes("missing authorization");

    const isAuthFailure = 
      (status === 401 && isTokenExpired) || 
      isMissingAuth;

    // Don't retry if:
    // 1. Not an auth failure
    // 2. Already retried
    // 3. Request is to an auth endpoint (to prevent loops)
    if (
      !isAuthFailure || 
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/verify") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If already refreshing, queue this request
    if (isRefreshing) {
      console.log(`⏳ [Token Refresh] Queueing request for ${originalRequest.url}`);
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;
    console.log("🔄 [Token Refresh] Starting token refresh...");

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        console.error("❌ [Token Refresh] No refresh token available");
        throw new Error("No refresh token available");
      }

      console.log("🔄 [Token Refresh] Calling refresh endpoint...");
      
      // Use a basic axios instance to avoid interceptors
      const refreshUrl = BASE_URL?.endsWith('/') 
        ? `${BASE_URL}auth/refresh` 
        : `${BASE_URL}/auth/refresh`;

      console.log("🔄 [Token Refresh] URL:", refreshUrl);

      const { data } = await axios.post(
        refreshUrl,
        { token: refreshToken },
        {
          headers: { 
            "Content-Type": "application/json",
            ...EAON_HEADERS // Include EAON headers in refresh request too
          }
        }
      );

      console.log("✅ [Token Refresh] Refresh response:", data);

      const newToken = data?.accessToken || data?.token || data?.data?.accessToken;
      const newRefreshToken = data?.refreshToken || data?.data?.refreshToken;

      if (!newToken) {
        console.error("❌ [Token Refresh] No access token in refresh response:", data);
        throw new Error("Failed to retrieve new access token from refresh response");
      }

      console.log("✅ [Token Refresh] New token received:", newToken.substring(0, 20) + "...");

      // Update storage
      localStorage.setItem("token", newToken);
      if (newRefreshToken) {
        console.log("✅ [Token Refresh] New refresh token received");
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      // Update defaults for subsequent requests
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      // Notify all queued requests
      onTokenRefreshed(newToken);
      console.log(`✅ [Token Refresh] Notified ${refreshSubscribers.length} queued requests`);

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      console.log(`🔄 [Token Refresh] Retrying original request to ${originalRequest.url}`);
      return api(originalRequest);

    } catch (refreshError) {
      console.error("❌ [Token Refresh] Refresh failed:", refreshError);
      
      const refreshStatus = (refreshError as AxiosError)?.response?.status;
      const refreshMessage = (refreshError as AxiosError)?.response?.data;
      
      console.log("📦 [Token Refresh] Error status:", refreshStatus);
      console.log("📦 [Token Refresh] Error data:", refreshMessage);

      // Only clear tokens if the refresh endpoint explicitly rejects the refresh token
      // Don't clear on 500 errors or network issues - these might be temporary
      if (refreshStatus === 401 || refreshStatus === 403) {
        console.warn("🧹 [Token Refresh] Clearing tokens due to invalid refresh token");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userObject");
        
        // Optionally redirect to login
        // window.location.href = "/auth/login";
      } else if (refreshStatus === 500) {
        console.error("⚠️ [Token Refresh] Server error (500) - tokens NOT cleared. This might be temporary.");
      } else {
        console.error("⚠️ [Token Refresh] Network or other error - tokens NOT cleared");
      }
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
      console.log("🏁 [Token Refresh] Refresh process completed");
    }
  },
);

export default api;