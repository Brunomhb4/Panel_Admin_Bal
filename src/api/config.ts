// API Configuration
export const API_BASE_URL = 'https://api-dashboard.ftgo.com.mx/v1/api';

// Endpoints
export const ENDPOINTS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  RESUMEN_TAQUILLA: '/ResumenTaquilla'
};

// Token Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_NAME: 'user_name'
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// Default Headers
export const getDefaultHeaders = (includeAuth = false) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (includeAuth) {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};