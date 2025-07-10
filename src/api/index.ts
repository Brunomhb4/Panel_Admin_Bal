/**
 * Punto central de exportación para la API
 * Proporciona acceso a todos los servicios y configuraciones
 */

// Importar el cliente HTTP y los servicios
import { httpClient } from './httpClient';
import { authService } from './services/authService';
import { taquillaService } from './services/taquillaService';

// Exportar toda la configuración de la API
export * from './config';

// Exportar el cliente HTTP para uso directo
export { httpClient };

// Exportar todos los servicios agrupados en un objeto
export const apiServices = {
  auth: authService,
  taquilla: taquillaService
};

// Exportar tipos para uso en componentes
export type { 
  LoginRequest, 
  LoginResponse,
  LogoutResponse 
} from './services/authService';

export type {
  ResumenTaquillaResponse
} from './services/taquillaService';

// Exportación por defecto para facilitar la importación
export default apiServices;