import axios, { type AxiosInstance } from "axios";
// import https from "https";
// const https = require("https");
// const fs = require("fs");

// const cert = new (require("fs").Agent)({});

// console.log(cert);

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
});

const EAONCREDENTIALVALUE = import.meta.env.VITE_PUBLIC_EAONCREDENTIALVALUE;
const EAONCREDENTIALKEY = import.meta.env.VITE_PUBLIC_EAONCREDENTIALKEY;

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

api.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const newConfig = { ...config };

        newConfig.headers.Authorization = `Bearer ${token}`;
        newConfig.headers.EAONCREDENTIALKEY =
          "K1T2U3V4W5X6Y7Z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T4U5V6W7X8Y9Z0g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S4Y5Z6a7b8c9d0e1f2";
        newConfig.headers.EAONCREDENTIALVALUE =
          "V1T2bR3yL4FpU5qZvS6xC7dG8hIoJ9kApLbQcM1uN2vXwO3xY4zU5hV6mB7nC8oD9pE0qF1rG2sH3tI4uJ5vK6wL7xM8yN9zA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kK0lL1mM2nN3oO4pP5qQ6rR7sS8tT9uU0vV1wW2xX3yY4zZ50A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X";
        return newConfig;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          // Make a request to refresh the token
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
            { token: refreshToken }
          );

          const newToken = data.accessToken;

          // Store new tokens
          localStorage.setItem("token", newToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Notify all subscribers
          refreshSubscribers.forEach((callback) => callback(newToken));
          refreshSubscribers = []; // Clear the queue

          return api(originalRequest); // Retry the original request
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          // Redirect to login
          window.location.href = "/";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue the request until the token is refreshed
      return new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest)); // Retry the original request
        });
      });
    }

    return Promise.reject(error); // For other errors, reject the promise
  }
);

export default api;

// // Any status codes that falls outside the range of 2xx causes this function to trigger
// if (error?.response?.status === 401) {
//   // Handle unauthorized errors (e.g., redirect to login)
//   localStorage.removeItem("token");
//   // window.location.href = "/sign-in";
// }
// return Promise.reject(error);
// }

// const axios = require('axios');
// const https = require('https');
// const fs = require('fs');

// // Load the .pem certificate
// const cert = fs.readFileSync('path/to/your_cert.pem'); // Replace with your .pem file path

// // Create an HTTPS agent with the certificate
// const httpsAgent = new https.Agent({
//   cert: cert,
//   key: cert,  // Use this if your key is in the same .pem file
//   rejectUnauthorized: false // Set to true if you want to verify the certificate
// });
