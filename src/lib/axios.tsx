/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Extra credentials headers (from original code)
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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = config.headers ?? {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Apply extra headers
    Object.assign(config.headers, EAON_HEADERS);

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Check if this is an auth failure
    const isAuthFailure =
      status === 401 ||
      (status === 400 &&
        typeof message === "string" &&
        message.toLowerCase().includes("missing authorization"));

    // Don't retry if it's not an auth failure or if we already retried
    if (!isAuthFailure || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    // Don't retry login/refresh endpoints themselves to avoid loops
    if (originalRequest.url?.includes("/auth/login") || originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // If already refreshing, queue this request
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Use a basic axios instance to avoid interceptors and default headers (like the expired Auth header)
      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { token: refreshToken }, {
        headers: { "Content-Type": "application/json" }
      });

      const newToken = data?.accessToken;
      const newRefreshToken = data?.refreshToken;

      if (!newToken) {
        throw new Error("Failed to retrieve new access token");
      }

      // Update storage
      localStorage.setItem("token", newToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      // Update defaults for subsequent requests
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      // Notify queue
      onTokenRefreshed(newToken);

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);

    } catch (refreshError) {
      // If refresh fails, clear auth state
      console.error("Token refresh failed:", refreshError);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      
      // Optionally redirect to login
      // window.location.href = "/auth/login"; 
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
