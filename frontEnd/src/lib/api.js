import axios from "axios";

const fallbackApiUrl = import.meta.env.DEV ? "http://localhost:3000/api" : "";

export const apiBaseUrl = (
  import.meta.env.VITE_API_URL?.trim() || fallbackApiUrl
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.headers?.token) {
    config.headers.token = token;
  }

  return config;
});

export const getApiErrorMessage = (
  error,
  fallbackMessage = "Something went wrong. Please try again."
) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.msg ||
    error?.message ||
    fallbackMessage
  );
};

export default api;
