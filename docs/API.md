# 🔌 Documentación de API y Datos

## 📋 Visión General

El proyecto actualmente utiliza datos mock para simular una API real. Esta documentación describe la estructura de datos, endpoints simulados y cómo integrar con una API real en el futuro.

## 🗄️ Estructura de Datos

### Tipos de Datos Principales

#### User (Usuario)
```typescript
interface User {
  id: string;                    // Identificador único
  email: string;                 // Email de login
  name: string;                  // Nombre completo
  role: 'admin' | 'superadmin';  // Rol del usuario
  waterParkId?: string;          // ID del balneario (solo admin)
  waterParkName?: string;        // Nombre del balneario (solo admin)
}
```

**Ejemplo**:
```json
{
  "id": "1",
  "email": "admin1@example.com",
  "name": "Admin Acuático Paradise",
  "role": "admin",
  "waterParkId": "1",
  "waterParkName": "Acuático Paradise"
}
```

#### WaterPark (Balneario)
```typescript
interface WaterPark {
  id: string;              // Identificador único
  name: string;            // Nombre del balneario
  activeTickets: number;   // Tickets activos
  soldTickets: number;     // Tickets vendidos
  printedTickets: number;  // Tickets impresos
  inactiveTickets: number; // Tickets inactivos
  totalRevenue: number;    // Ingresos totales
}
```

**Ejemplo**:
```json
{
  "id": "1",
  "name": "Acuático Paradise",
  "activeTickets": 342,
  "soldTickets": 1250,
  "printedTickets": 1400,
  "inactiveTickets": 150,
  "totalRevenue": 187500
}
```

#### Checker (Checador/Empleado)
```typescript
interface Checker {
  id: string;           // Identificador único
  name: string;         // Nombre completo
  email: string;        // Email del empleado
  waterParkId: string;  // ID del balneario asignado
  soldTickets: number;  // Tickets vendidos por el empleado
}
```

**Ejemplo**:
```json
{
  "id": "1",
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "waterParkId": "1",
  "soldTickets": 410
}
```

#### DailyStats (Estadísticas Diarias)
```typescript
interface DailyStats {
  date: string;      // Fecha en formato ISO (YYYY-MM-DD)
  tickets: number;   // Tickets vendidos en el día
  revenue: number;   // Ingresos del día
}
```

**Ejemplo**:
```json
{
  "date": "2025-01-15",
  "tickets": 85,
  "revenue": 12750
}
```

#### MonthlyStats (Estadísticas Mensuales)
```typescript
interface MonthlyStats {
  month: string;     // Mes abreviado (Ene, Feb, etc.)
  tickets: number;   // Tickets vendidos en el mes
  revenue: number;   // Ingresos del mes
}
```

**Ejemplo**:
```json
{
  "month": "Ene",
  "tickets": 1250,
  "revenue": 187500
}
```

---

## 🔐 Endpoints de Autenticación

### POST /auth/login
Autenticar usuario con email y contraseña.

**Request**:
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Response**:
```typescript
interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
  expiresIn: number;
}
```

**Ejemplo de Request**:
```json
{
  "email": "admin1@example.com",
  "password": "password"
}
```

**Ejemplo de Response**:
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "admin1@example.com",
    "name": "Admin Acuático Paradise",
    "role": "admin",
    "waterParkId": "1"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### POST /auth/logout
Cerrar sesión del usuario.

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

### GET /auth/me
Obtener información del usuario autenticado.

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "admin1@example.com",
    "name": "Admin Acuático Paradise",
    "role": "admin",
    "waterParkId": "1"
  }
}
```

---

## 🏊 Endpoints de Balnearios

### GET /waterparks
Obtener lista de balnearios (SuperAdmin) o balneario específico (Admin).

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
```typescript
interface WaterParksQuery {
  page?: number;        // Página (default: 1)
  limit?: number;       // Límite por página (default: 10)
  search?: string;      // Búsqueda por nombre
  sortBy?: string;      // Campo para ordenar
  sortOrder?: 'asc' | 'desc'; // Orden
}
```

**Response**:
```typescript
interface WaterParksResponse {
  success: boolean;
  data: WaterPark[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### GET /waterparks/:id
Obtener detalles de un balneario específico.

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Acuático Paradise",
    "activeTickets": 342,
    "soldTickets": 1250,
    "printedTickets": 1400,
    "inactiveTickets": 150,
    "totalRevenue": 187500
  }
}
```

### POST /waterparks
Crear nuevo balneario (Solo SuperAdmin).

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```typescript
interface CreateWaterParkRequest {
  name: string;
  activeTickets: number;
  soldTickets: number;
  printedTickets: number;
  inactiveTickets: number;
  totalRevenue: number;
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "4",
    "name": "Nuevo Balneario",
    "activeTickets": 0,
    "soldTickets": 0,
    "printedTickets": 0,
    "inactiveTickets": 0,
    "totalRevenue": 0
  }
}
```

### PUT /waterparks/:id
Actualizar balneario existente.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```typescript
interface UpdateWaterParkRequest {
  name?: string;
  activeTickets?: number;
  soldTickets?: number;
  printedTickets?: number;
  inactiveTickets?: number;
  totalRevenue?: number;
}
```

### DELETE /waterparks/:id
Eliminar balneario (Solo SuperAdmin).

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "message": "Balneario eliminado exitosamente"
}
```

---

## 👥 Endpoints de Usuarios

### GET /users
Obtener lista de usuarios (Solo SuperAdmin).

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```typescript
interface UsersResponse {
  success: boolean;
  data: User[];
}
```

### POST /users
Crear nuevo usuario (Solo SuperAdmin).

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```typescript
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'superadmin';
  waterParkId?: string; // Requerido para role 'admin'
}
```

### PUT /users/:id
Actualizar usuario existente (Solo SuperAdmin).

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```typescript
interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'superadmin';
  waterParkId?: string;
}
```

### DELETE /users/:id
Eliminar usuario (Solo SuperAdmin).

**Headers**:
```
Authorization: Bearer <token>
```

---

## 👨‍💼 Endpoints de Checadores

### GET /waterparks/:waterParkId/checkers
Obtener checadores de un balneario.

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```typescript
interface CheckersResponse {
  success: boolean;
  data: Checker[];
}
```

### POST /waterparks/:waterParkId/checkers
Crear nuevo checador.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```typescript
interface CreateCheckerRequest {
  name: string;
  email: string;
  soldTickets: number;
}
```

### PUT /checkers/:id
Actualizar checador existente.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```typescript
interface UpdateCheckerRequest {
  name?: string;
  email?: string;
  soldTickets?: number;
}
```

### DELETE /checkers/:id
Eliminar checador.

**Headers**:
```
Authorization: Bearer <token>
```

---

## 📊 Endpoints de Estadísticas

### GET /waterparks/:waterParkId/stats/daily
Obtener estadísticas diarias de un balneario.

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
```typescript
interface DailyStatsQuery {
  startDate?: string;  // Fecha inicio (YYYY-MM-DD)
  endDate?: string;    // Fecha fin (YYYY-MM-DD)
  days?: number;       // Últimos N días (default: 7)
}
```

**Response**:
```typescript
interface DailyStatsResponse {
  success: boolean;
  data: DailyStats[];
}
```

### GET /waterparks/:waterParkId/stats/monthly
Obtener estadísticas mensuales de un balneario.

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
```typescript
interface MonthlyStatsQuery {
  year?: number;       // Año específico
  months?: number;     // Últimos N meses (default: 6)
}
```

**Response**:
```typescript
interface MonthlyStatsResponse {
  success: boolean;
  data: MonthlyStats[];
}
```

---

## 🔧 Implementación Actual (Mock)

### AuthStore
```typescript
// src/stores/authStore.ts
const login = async (email: string, password: string) => {
  // Simulación de API call
  if (email === 'admin1@example.com' && password === 'password') {
    const user = {
      id: '1',
      email: 'admin1@example.com',
      name: 'Admin Acuático Paradise',
      role: 'admin' as UserRole,
      waterParkId: '1',
      waterParkName: 'Acuático Paradise'
    };
    set({ user, isAuthenticated: true, userRole: user.role });
  } else {
    throw new Error('Credenciales inválidas');
  }
};
```

### WaterParksStore
```typescript
// src/stores/waterParksStore.ts
const fetchWaterParks = () => {
  set({ loading: true });
  
  // Simulación de API call
  setTimeout(() => {
    set({ 
      waterParks: mockData.waterParks,
      loading: false 
    });
  }, 500);
};
```

---

## 🚀 Migración a API Real

### 1. Crear Cliente API
```typescript
// src/api/client.ts
interface ApiClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  delete(url: string, config?: RequestConfig): Promise<void>;
}

class HttpClient implements ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...config?.headers,
    };

    const response = await fetch(`${this.baseURL}${url}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async delete(url: string, config?: RequestConfig): Promise<void> {
    await this.request('DELETE', url, undefined, config);
  }
}

export const apiClient = new HttpClient(import.meta.env.VITE_API_URL);
```

### 2. Servicios API
```typescript
// src/api/services/authService.ts
export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', { email, password });
  },

  async logout(): Promise<void> {
    return apiClient.post('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },
};

// src/api/services/waterParksService.ts
export const waterParksService = {
  async getWaterParks(query?: WaterParksQuery): Promise<WaterParksResponse> {
    const params = new URLSearchParams(query as Record<string, string>);
    return apiClient.get<WaterParksResponse>(`/waterparks?${params}`);
  },

  async getWaterPark(id: string): Promise<WaterPark> {
    return apiClient.get<WaterPark>(`/waterparks/${id}`);
  },

  async createWaterPark(data: CreateWaterParkRequest): Promise<WaterPark> {
    return apiClient.post<WaterPark>('/waterparks', data);
  },

  async updateWaterPark(id: string, data: UpdateWaterParkRequest): Promise<WaterPark> {
    return apiClient.put<WaterPark>(`/waterparks/${id}`, data);
  },

  async deleteWaterPark(id: string): Promise<void> {
    return apiClient.delete(`/waterparks/${id}`);
  },
};
```

### 3. Actualizar Stores
```typescript
// src/stores/authStore.ts (versión con API real)
const login = async (email: string, password: string) => {
  try {
    const response = await authService.login(email, password);
    apiClient.setToken(response.token);
    set({ 
      user: response.user, 
      isAuthenticated: true, 
      userRole: response.user.role 
    });
  } catch (error) {
    throw new Error('Credenciales inválidas');
  }
};

// src/stores/waterParksStore.ts (versión con API real)
const fetchWaterParks = async () => {
  set({ loading: true, error: null });
  try {
    const response = await waterParksService.getWaterParks();
    set({ waterParks: response.data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};
```

---

## 🔒 Autenticación y Seguridad

### JWT Token Management
```typescript
// src/utils/tokenManager.ts
export const tokenManager = {
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    apiClient.setToken(token);
  },

  removeToken(): void {
    localStorage.removeItem('auth_token');
    apiClient.setToken('');
  },

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};
```

### Interceptores de Request/Response
```typescript
// src/api/interceptors.ts
export const setupInterceptors = () => {
  // Request interceptor
  apiClient.interceptRequest((config) => {
    const token = tokenManager.getToken();
    if (token && !tokenManager.isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor
  apiClient.interceptResponse(
    (response) => response,
    (error) => {
      if (error.status === 401) {
        tokenManager.removeToken();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};
```

---

## 📝 Validación de Datos

### Esquemas de Validación
```typescript
// src/schemas/waterParkSchema.ts
import { z } from 'zod';

export const waterParkSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido').max(100, 'Nombre muy largo'),
  activeTickets: z.number().min(0, 'No puede ser negativo'),
  soldTickets: z.number().min(0, 'No puede ser negativo'),
  printedTickets: z.number().min(0, 'No puede ser negativo'),
  inactiveTickets: z.number().min(0, 'No puede ser negativo'),
  totalRevenue: z.number().min(0, 'No puede ser negativo'),
});

export type WaterParkFormData = z.infer<typeof waterParkSchema>;
```

### Validación en Formularios
```typescript
// src/hooks/useFormValidation.ts
export const useFormValidation = <T>(schema: z.ZodSchema<T>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: unknown): data is T => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path.join('.')] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  return { validate, errors };
};
```

---

Esta documentación proporciona una base sólida para entender la estructura de datos actual y cómo migrar a una API real cuando sea necesario.

---

## 🍽️ Endpoints de Servicios de Alimentación

### Snacks Management

#### GET /snacks/sales
Obtener ventas de snacks con filtros opcionales.

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
```typescript
interface SnacksSalesQuery {
  startDate?: string;    // Fecha inicio (YYYY-MM-DD)
  endDate?: string;      // Fecha fin (YYYY-MM-DD)
  product?: string;      // Filtrar por producto específico
  hourly?: boolean;      // Agrupar por horas
  daily?: boolean;       // Agrupar por días
}
```

**Response**:
```typescript
interface SnacksSalesResponse {
  success: boolean;
  data: {
    sales: SnackSale[];
    stats: SnacksStats;
    hourlyData?: HourlySales[];
    topProducts?: TopProduct[];
  };
}
```

#### POST /snacks/sale
Registrar nueva venta de snack.

**Request**:
```typescript
interface CreateSnackSaleRequest {
  product: string;
  quantity: number;
  price: number;
  timestamp?: string;   // Default: now()
}
```

---

### Store Management

#### GET /store/sales
Obtener ventas de tienda con métricas avanzadas.

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
```typescript
interface StoreSalesQuery {
  period?: 'daily' | 'weekly' | 'monthly';
  category?: string;     // Filtrar por categoría
  includeGrowth?: boolean; // Incluir cálculos de crecimiento
}
```

**Response**:
```typescript
interface StoreSalesResponse {
  success: boolean;
  data: {
    sales: StoreSale[];
    stats: StoreStats;
    dailyData?: DailySalesData[];
    weeklyData?: WeeklySalesData[];
    categories?: CategoryStats[];
  };
}
```

#### GET /store/products
Obtener catálogo de productos de tienda.

**Response**:
```typescript
interface StoreProductsResponse {
  success: boolean;
  data: {
    products: StoreProduct[];
    categories: string[];
    totalProducts: number;
  };
}

interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
}
```

---

### Restaurant Management (Actualizado)

#### GET /restaurant/notes
Obtener notas de restaurante con etiquetas mejoradas.

**Response actualizada**:
```typescript
interface RestaurantNote {
  id: string;
  tableNumber: number;
  customerCount: number;
  total: number;
  timestamp: string;
  items: string[];
  tags?: string[];        // NUEVO: Etiquetas de identificación
  category?: string;      // NUEVO: Categoría de servicio
}
```

---

## 📊 Nuevos Tipos de Datos

### Snacks Data Types
```typescript
interface SnackSale {
  id: string;
  product: string;
  quantity: number;
  price: number;
  timestamp: string;
}

interface HourlySales {
  hour: string;           // "08:00", "09:00", etc.
  sales: number;
  revenue: number;
}

interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
  percentage: number;     // Porcentaje del total
}

interface SnacksStats {
  dailySales: number;
  historicalSales: number;
  dailyRevenue: number;
  historicalRevenue: number;
  totalProducts: number;
  averageTicket: number;
}
```

### Store Data Types
```typescript
interface StoreSale {
  id: string;
  product: string;
  category: string;
  quantity: number;
  price: number;
  timestamp: string;
}

interface StoreStats {
  dailySales: number;
  weeklySales: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  productsCount: number;
  dailyGrowth: number;    // Porcentaje de crecimiento diario
  weeklyGrowth: number;   // Porcentaje de crecimiento semanal
}

interface DailySalesData {
  date: string;
  sales: number;
  revenue: number;
  products: number;
}

interface WeeklySalesData {
  week: string;           // "Sem 1", "Sem 2", etc.
  sales: number;
  revenue: number;
  growth: number;         // Crecimiento vs semana anterior
}
```

---

## 🔧 Nuevas Utilidades de API

### Calculadores de Métricas
```typescript
// Utilidades para cálculos de métricas
export const metricsUtils = {
  calculateGrowth: (current: number, previous: number): number => {
    return previous > 0 ? ((current - previous) / previous) * 100 : 0;
  },
  
  calculateAverageTicket: (revenue: number, sales: number): number => {
    return sales > 0 ? revenue / sales : 0;
  },
  
  groupSalesByHour: (sales: SnackSale[]): HourlySales[] => {
    // Lógica de agrupación por hora
  },
  
  getTopProducts: (sales: SnackSale[], limit: number = 5): TopProduct[] => {
    // Lógica para obtener productos más vendidos
  }
};
```

### Filtros y Ordenamiento
```typescript
// Filtros avanzados para servicios de alimentación
export const filterUtils = {
  filterByDateRange: (sales: Sale[], startDate: string, endDate: string) => {
    // Filtrar por rango de fechas
  },
  
  filterByProduct: (sales: Sale[], product: string) => {
    // Filtrar por producto específico
  },
  
  sortByRevenue: (products: TopProduct[]) => {
    return products.sort((a, b) => b.revenue - a.revenue);
  }
};
```

---

## 🚀 Migración de Datos Mock a API Real

### Servicios de Snacks
```typescript
// src/api/services/snacksService.ts
export const snacksService = {
  async getSales(query?: SnacksSalesQuery): Promise<SnacksSalesResponse> {
    const params = new URLSearchParams(query as Record<string, string>);
    return apiClient.get<SnacksSalesResponse>(`/snacks/sales?${params}`);
  },

  async createSale(data: CreateSnackSaleRequest): Promise<SnackSale> {
    return apiClient.post<SnackSale>('/snacks/sale', data);
  },

  async getHourlySales(date?: string): Promise<HourlySales[]> {
    return apiClient.get<HourlySales[]>(`/snacks/hourly-sales?date=${date}`);
  },

  async getTopProducts(limit: number = 5): Promise<TopProduct[]> {
    return apiClient.get<TopProduct[]>(`/snacks/top-products?limit=${limit}`);
  }
};
```

### Servicios de Tienda
```typescript
// src/api/services/storeService.ts
export const storeService = {
  async getSales(query?: StoreSalesQuery): Promise<StoreSalesResponse> {
    const params = new URLSearchParams(query as Record<string, string>);
    return apiClient.get<StoreSalesResponse>(`/store/sales?${params}`);
  },

  async getProducts(): Promise<StoreProductsResponse> {
    return apiClient.get<StoreProductsResponse>('/store/products');
  },

  async getDailyTrends(days: number = 7): Promise<DailySalesData[]> {
    return apiClient.get<DailySalesData[]>(`/store/daily-trends?days=${days}`);
  },

  async getWeeklyTrends(weeks: number = 4): Promise<WeeklySalesData[]> {
    return apiClient.get<WeeklySalesData[]>(`/store/weekly-trends?weeks=${weeks}`);
  }
};
```