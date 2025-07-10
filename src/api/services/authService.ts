import { httpClient } from '../httpClient';
import { ENDPOINTS, HTTP_METHODS, STORAGE_KEYS } from '../config';

/**
 * Interfaz para la petición de login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Interfaz para la respuesta de login
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    name: string;
  };
}

/**
 * Interfaz para la respuesta de logout
 */
export interface LogoutResponse {
  success: boolean;
  message: string;
}

/**
 * Servicio para manejar la autenticación con la API
 * Proporciona métodos para iniciar sesión, cerrar sesión y gestionar tokens
 */
export const authService = {
  /**
   * Inicia sesión en la API con las credenciales proporcionadas
   * @param credentials Credenciales de usuario
   * @returns Promesa con la respuesta de login
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      // Realiza la petición POST al endpoint de login
      const response = await httpClient<LoginResponse>(
        ENDPOINTS.LOGIN,
        HTTP_METHODS.POST,
        credentials
      );

      // Si la respuesta es exitosa, guarda el token y nombre de usuario en localStorage
      if (response.success && response.data) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.access_token);
        localStorage.setItem(STORAGE_KEYS.USER_NAME, response.data.name);
      }

      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  /**
   * Cierra la sesión actual y elimina el token de acceso
   * @returns Promesa con la respuesta de logout
   */
  logout: async (): Promise<LogoutResponse> => {
    try {
      // Realiza la petición GET al endpoint de logout
      const response = await httpClient<LogoutResponse>(
        ENDPOINTS.LOGOUT,
        HTTP_METHODS.GET,
        undefined,
        true // Requiere autenticación
      );

      // Si la respuesta es exitosa, elimina el token y nombre de usuario del localStorage
      if (response.success) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_NAME);
      }

      return response;
    } catch (error) {
      console.error('Error en logout:', error);
      
      // Limpiar localStorage incluso si hay error para evitar problemas de sesión
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_NAME);
      
      throw error;
    }
  },

  /**
   * Verifica si el usuario está autenticado comprobando si existe un token
   * @returns true si el usuario está autenticado, false en caso contrario
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Obtiene el token de acceso almacenado
   * @returns El token de acceso o null si no existe
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Obtiene el nombre de usuario almacenado
   * @returns El nombre de usuario o null si no existe
   */
  getUserName: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME);
  }
};