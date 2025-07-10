// Exportar todos los servicios desde un punto central
import { httpClient } from './httpClient';
import { authService } from './services/authService';
import { taquillaService } from './services/taquillaService';

// Exportar configuración
export * from './config';

// Exportar cliente HTTP
export { httpClient };

// Exportar servicios
export const apiServices = {
  auth: authService,
  taquilla: taquillaService
};

// Exportar tipos
export type { 
  LoginRequest, 
  LoginResponse,
  LogoutResponse 
} from './services/authService';

export type {
  ResumenTaquillaResponse
} from './services/taquillaService';

// Exportar por defecto
export default apiServices;