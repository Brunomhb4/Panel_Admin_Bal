import { useState } from 'react';
import { authService, LoginRequest } from '../api';

/**
 * Hook personalizado para manejar la autenticación
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Iniciar sesión
   */
  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.logout();
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    isAuthenticated: authService.isAuthenticated(),
    getAccessToken: authService.getAccessToken,
    getUserName: authService.getUserName,
    loading,
    error
  };
};