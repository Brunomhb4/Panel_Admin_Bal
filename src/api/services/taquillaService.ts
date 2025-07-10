import { httpClient } from '../httpClient';
import { ENDPOINTS, HTTP_METHODS } from '../config';

// Interfaces
export interface ResumenTaquillaResponse {
  success: boolean;
  message: string;
  data: {
    tickets_activos: number | string;
    tickets_vendidos: number | string;
    tickets_impresos: number | string | null;
    tickets_inactivos: number | string;
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

      console.log('Respuesta API taquilla:', response);
      return response;
    } catch (error) {
      console.error('Error al obtener resumen de taquilla:', error);
      throw error;
    }
  }
};