/**
 * URL base de la API
 * Todas las peticiones se realizarán a esta URL + el endpoint específico
 */
export const API_BASE_URL = 'https://api-dashboard.ftgo.com.mx/v1/api';

/**
 * Endpoints disponibles en la API
 * Cada constante representa una ruta relativa a la URL base
 */
export const ENDPOINTS = {
  // Autenticación
  LOGIN: '/login',
  LOGOUT: '/logout',
  
  // Datos de taquilla
  RESUMEN_TAQUILLA: '/ResumenTaquilla'
};

/**
 * Claves para almacenar datos en localStorage
 * Se utilizan para guardar el token de acceso y el nombre de usuario
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_NAME: 'user_name'
};

/**
 * Métodos HTTP soportados por la API
 * Se utilizan para especificar el tipo de petición
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

/**
 * Genera los headers por defecto para las peticiones HTTP
 * @param includeAuth Indica si se debe incluir el token de autenticación
 * @returns Objeto con los headers
 */
export const getDefaultHeaders = (includeAuth = false) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  // Añadir el token de autenticación si es necesario
  if (includeAuth) {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};