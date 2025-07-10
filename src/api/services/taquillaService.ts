import { httpClient } from '../httpClient';
import { ENDPOINTS, HTTP_METHODS } from '../config';

// Interfaces
export interface ResumenTaquillaResponse {
  success: boolean;
  message: string;
  data: {
    tickets_activos: number;
    tickets_vendidos: number;
    tickets_impresos: number | null;
    tickets_inactivos: number;
  };
}

/**
 * Servicio de taquilla
 */
export const taquillaService = {
  /**
   * Obtener resumen de taquilla
   */
  getResumenTaquilla: async (): Promise<ResumenTaquillaResponse> => {
    try {
      const response = await httpClient<ResumenTaquillaResponse>(
        ENDPOINTS.RESUMEN_TAQUILLA,
        HTTP_METHODS.GET,
        undefined,
        true // Requiere autenticación
      );

      return response;
    } catch (error) {
      console.error('Error al obtener resumen de taquilla:', error);
      throw error;
    }
  }
};