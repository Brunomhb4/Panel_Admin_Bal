import { API_BASE_URL, getDefaultHeaders, HTTP_METHODS } from './config';

/**
 * Opciones para las peticiones HTTP
 */
interface RequestOptions {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

/**
 * Clase personalizada para errores HTTP
 * Extiende Error para incluir el código de estado y los datos de respuesta
 */
class HttpError extends Error {
  status: number;
  data: any;

  /**
   * Constructor para HttpError
   * @param status Código de estado HTTP
   * @param message Mensaje de error
   * @param data Datos adicionales de la respuesta
   */
  constructor(status: number, message: string, data: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'HttpError';
  }
}

/**
 * Cliente HTTP genérico para realizar peticiones a la API
 * @param endpoint Ruta del endpoint (sin la URL base)
 * @param method Método HTTP (GET, POST, PUT, DELETE)
 * @param data Datos a enviar en el cuerpo de la petición (para POST y PUT)
 * @param requiresAuth Indica si la petición requiere autenticación
 * @returns Promesa con la respuesta de la API
 */
export const httpClient = async <T>(
  endpoint: string,
  method: string = HTTP_METHODS.GET,
  data?: any,
  requiresAuth: boolean = false
): Promise<T> => {
  // Construir la URL completa
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Configurar las opciones de la petición
  const options: RequestOptions = {
    method,
    headers: getDefaultHeaders(requiresAuth)
  };

  // Añadir el cuerpo de la petición si es necesario
  if (data && (method === HTTP_METHODS.POST || method === HTTP_METHODS.PUT)) {
    options.body = JSON.stringify(data);
  }

  try {
    // Realizar la petición fetch
    const response = await fetch(url, options);
    const responseData = await response.json();

    // Manejar errores HTTP
    if (!response.ok) {
      throw new HttpError(
        response.status,
        responseData.message || 'Error en la petición',
        responseData
      );
    }

    return responseData as T;
  } catch (error) {
    // Re-lanzar HttpError si ya es de ese tipo
    if (error instanceof HttpError) {
      throw error;
    }
    
    // Convertir otros errores a un formato estándar
    throw new Error(
      error instanceof Error ? error.message : 'Error desconocido en la petición'
    );
  }
};