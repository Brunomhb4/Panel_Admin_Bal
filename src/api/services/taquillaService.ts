import { httpClient } from '../httpClient';
import { ENDPOINTS, HTTP_METHODS } from '../config';

/**
 * Interfaz para la respuesta de la API de resumen de taquilla
 * La API devuelve un objeto con los siguientes campos:
 * - tickets_activos: Número de tickets activos
 * - tickets_vendidos: Número de tickets vendidos
 * - tickets_impresos: Número de tickets impresos (puede ser null)
 * - tickets_inactivos: Número de tickets inactivos
 */
export interface ResumenTaquillaResponse {
  success: boolean;
  message: string;
  data: {
    // Los campos vienen como números desde la API
    tickets_activos: number | string;
    tickets_vendidos: number | string;
    // tickets_impresos es un número válido en la API (900 en el ejemplo)
    tickets_impresos: number | string;
    tickets_inactivos: number | string;
  };
}

/***
 * Servicio para interactuar con los endpoints de taquilla de la API
 * Proporciona métodos para obtener información sobre tickets y ventas
 */
export const taquillaService = {
  /**
   * Obtiene el resumen de taquilla desde la API
   * Requiere autenticación (token de acceso)
   * @returns Promesa con los datos de resumen de taquilla
   */
  getResumenTaquilla: async (): Promise<ResumenTaquillaResponse> => {
    try {
      // Realiza la petición GET al endpoint de resumen de taquilla
      const response = await httpClient<ResumenTaquillaResponse>(
        ENDPOINTS.RESUMEN_TAQUILLA, 
        HTTP_METHODS.GET,
        undefined,
        true // Requiere autenticación
      );

      // Log para depuración
      console.log('Respuesta API taquilla:', response);
      return response;
    } catch (error) {
      // Manejo de errores
      console.error('Error al obtener resumen de taquilla:', error);
      throw error;
    }
  }
};