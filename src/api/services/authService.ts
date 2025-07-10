import { httpClient } from '../httpClient';
import { ENDPOINTS, HTTP_METHODS, STORAGE_KEYS } from '../config';

// Interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    name: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

/**
 * Servicio de autenticación
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param credentials Credenciales de usuario
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await httpClient<LoginResponse>(
        ENDPOINTS.LOGIN,
        HTTP_METHODS.POST,
        credentials
      );

      // Guardar token y nombre de usuario en localStorage
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
   * Cerrar sesión
   */
  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await httpClient<LogoutResponse>(
        ENDPOINTS.LOGOUT,
        HTTP_METHODS.POST,
        undefined,
        true // Requiere autenticación
      );

      // Limpiar localStorage al cerrar sesión
      if (response.success) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_NAME);
      }

      return response;
    } catch (error) {
      console.error('Error en logout:', error);
      
      // Limpiar localStorage incluso si hay error
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_NAME);
      
      throw error;
    }
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Obtener token de acceso
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Obtener nombre de usuario
   */
  getUserName: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME);
  }
};