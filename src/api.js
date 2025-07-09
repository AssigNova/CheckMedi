// src/api.js

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function apiUrl(path) {
  // Ensure no double slashes
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
