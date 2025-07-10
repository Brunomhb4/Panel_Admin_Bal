import { useState, useEffect } from 'react';
import { taquillaService, ResumenTaquillaResponse } from '../api';

/**
 * Hook personalizado para manejar los datos de taquilla
 */
export const useTaquilla = () => {
  const [resumenTaquilla, setResumenTaquilla] = useState<ResumenTaquillaResponse['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtener resumen de taquilla
   */
  const fetchResumenTaquilla = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await taquillaService.getResumenTaquilla();
      setResumenTaquilla(response.data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener resumen de taquilla';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchResumenTaquilla();
  }, []);

  return {
    resumenTaquilla,
    fetchResumenTaquilla,
    loading,
    error
  };
};