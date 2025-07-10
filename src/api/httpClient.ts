import { API_BASE_URL, getDefaultHeaders, HTTP_METHODS } from './config';

interface RequestOptions {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

class HttpError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'HttpError';
  }
}

/**
 * Función para hacer peticiones HTTP
 */
export const httpClient = async <T>(
  endpoint: string,
  method: string = HTTP_METHODS.GET,
  data?: any,
  requiresAuth: boolean = false
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const options: RequestOptions = {
    method,
    headers: getDefaultHeaders(requiresAuth)
  };

  if (data && (method === HTTP_METHODS.POST || method === HTTP_METHODS.PUT)) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new HttpError(
        response.status,
        responseData.message || 'Error en la petición',
        responseData
      );
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    
    throw new Error(
      error instanceof Error ? error.message : 'Error desconocido en la petición'
    );
  }
};