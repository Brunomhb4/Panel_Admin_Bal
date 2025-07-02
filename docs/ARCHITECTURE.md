# 🏗️ Arquitectura del Proyecto

## 📋 Visión General

El Panel de Administración de Balnearios está construido con una arquitectura moderna de React que prioriza la escalabilidad, mantenibilidad y experiencia de usuario. Utiliza un enfoque component-driven con gestión de estado centralizada y diseño responsivo ultra granular.

## 🎯 Principios Arquitectónicos

### 1. **Separation of Concerns**
- **Presentación**: Componentes React puros
- **Lógica de Negocio**: Custom hooks y stores
- **Estado**: Zustand stores centralizados
- **Estilos**: Tailwind CSS con sistema de diseño

### 2. **Component-Driven Development**
- Componentes reutilizables y modulares
- Props tipadas con TypeScript
- Composición sobre herencia
- Single Responsibility Principle

### 3. **Mobile-First Responsive Design**
- Breakpoints ultra granulares
- Touch-friendly interfaces
- Progressive enhancement
- Adaptive layouts

### 4. **Type Safety**
- TypeScript estricto en toda la aplicación
- Interfaces bien definidas
- Type guards para validación
- Autocompletado y refactoring seguro

---

## 🗂️ Estructura de Directorios

```
src/
├── components/              # Componentes reutilizables
│   ├── charts/             # Gráficos y visualizaciones
│   │   ├── DailyChart.tsx
│   │   └── MonthlyChart.tsx
│   ├── dashboards/         # Componentes específicos del dashboard
│   │   ├── SummaryCards.tsx
│   │   └── WaterParksTable.tsx
│   ├── layout/             # Componentes de layout
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── tables/             # Componentes de tablas
│   │   └── CheckersTable.tsx
│   └── ProtectedRoute.tsx  # HOC para protección de rutas
├── pages/                  # Páginas principales
│   ├── LoginPage.tsx
│   ├── AdminDashboard.tsx
│   ├── SuperAdminDashboard.tsx
│   ├── WaterParkDetail.tsx
│   ├── UserManagement.tsx
│   └── WaterParkManagement.tsx
├── stores/                 # Estado global (Zustand)
│   ├── authStore.ts
│   └── waterParksStore.ts
├── types/                  # Definiciones de tipos TypeScript
├── utils/                  # Utilidades y helpers
├── hooks/                  # Custom hooks
├── constants/              # Constantes de la aplicación
├── styles/                 # Estilos globales
├── main.tsx               # Punto de entrada
├── App.tsx                # Componente raíz
└── index.css              # Estilos base
```

---

## 🔄 Flujo de Datos

### Arquitectura Unidireccional

```mermaid
graph TD
    A[User Interaction] --> B[Component]
    B --> C[Store Action]
    C --> D[State Update]
    D --> E[Component Re-render]
    E --> F[UI Update]
```

### Gestión de Estado

#### 1. **Local State** (useState)
```typescript
// Para estado específico del componente
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState(initialData);
```

#### 2. **Global State** (Zustand)
```typescript
// Para estado compartido entre componentes
const { user, isAuthenticated } = useAuthStore();
const { waterParks, loading } = useWaterParksStore();
```

#### 3. **URL State** (React Router)
```typescript
// Para estado derivado de la URL
const { id } = useParams();
const location = useLocation();
```

---

## 🧩 Patrones de Diseño Implementados

### 1. **Container/Presentational Pattern**

#### Container Components
```typescript
// Lógica de negocio y estado
const WaterParkDetail: React.FC = () => {
  const { id } = useParams();
  const { fetchWaterParkDetails } = useWaterParksStore();
  
  const [waterPark, setWaterPark] = useState<WaterPark>();
  
  useEffect(() => {
    const details = fetchWaterParkDetails(id);
    setWaterPark(details);
  }, [id]);
  
  return <WaterParkDetailView waterPark={waterPark} />;
};
```

#### Presentational Components
```typescript
// Solo presentación, sin lógica de negocio
interface WaterParkDetailViewProps {
  waterPark: WaterPark;
}

const WaterParkDetailView: React.FC<WaterParkDetailViewProps> = ({ waterPark }) => {
  return (
    <div>
      <h1>{waterPark.name}</h1>
      {/* Solo UI */}
    </div>
  );
};
```

### 2. **Higher-Order Component (HOC) Pattern**

```typescript
// ProtectedRoute como HOC
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, userRole } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== requiredRole && userRole !== 'superadmin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};
```

### 3. **Compound Component Pattern**

```typescript
// DashboardLayout como compound component
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        <main>{children}</main>
      </div>
    </div>
  );
};
```

### 4. **Render Props Pattern**

```typescript
// Para componentes de datos reutilizables
interface DataFetcherProps<T> {
  fetchData: () => Promise<T>;
  children: (data: T | null, loading: boolean, error: string | null) => React.ReactNode;
}

const DataFetcher = <T,>({ fetchData, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Lógica de fetch...
  
  return <>{children(data, loading, error)}</>;
};
```

---

## 🔐 Arquitectura de Autenticación

### Flujo de Autenticación

```mermaid
sequenceDiagram
    participant U as User
    participant L as LoginPage
    participant A as AuthStore
    participant R as Router
    participant P as ProtectedRoute
    
    U->>L: Enter credentials
    L->>A: login(email, password)
    A->>A: Validate credentials
    A->>A: Set user state
    A->>R: Navigate to dashboard
    R->>P: Check authentication
    P->>A: Get user role
    P->>R: Render appropriate dashboard
```

### Roles y Permisos

```typescript
type UserRole = 'admin' | 'superadmin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  waterParkId?: string; // Solo para admins
}

// Matriz de permisos
const PERMISSIONS = {
  admin: {
    canViewOwnWaterPark: true,
    canEditOwnWaterPark: true,
    canViewAllWaterParks: false,
    canManageUsers: false,
  },
  superadmin: {
    canViewOwnWaterPark: true,
    canEditOwnWaterPark: true,
    canViewAllWaterParks: true,
    canManageUsers: true,
    canManageWaterParks: true,
  }
};
```

---

## 📱 Arquitectura Responsiva

### Sistema de Breakpoints

```typescript
const BREAKPOINTS = {
  'mobile-s': '320px',    // Móviles muy pequeños
  'mobile-m': '375px',    // Móviles medianos
  'mobile-l': '425px',    // Móviles grandes
  'tablet': '768px',      // Tablets
  'laptop': '1024px',     // Laptops
  'laptop-l': '1440px',   // Laptops grandes
  '4k': '2560px',         // Pantallas 4K
} as const;
```

### Configuración Responsiva Adaptativa

```typescript
const getResponsiveConfig = () => {
  const width = window.innerWidth;
  
  if (width < 375) return MOBILE_SMALL_CONFIG;
  if (width < 640) return MOBILE_CONFIG;
  if (width < 768) return TABLET_CONFIG;
  if (width < 1024) return LAPTOP_CONFIG;
  return DESKTOP_CONFIG;
};
```

### Componentes Adaptativos

```typescript
// Componente que se adapta automáticamente
const ResponsiveCard: React.FC<CardProps> = ({ children }) => {
  const [config, setConfig] = useState(getResponsiveConfig());
  
  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className={`card ${config.cardClass}`}>
      {children}
    </div>
  );
};
```

---

## 🎨 Arquitectura de Estilos

### Sistema de Diseño en Capas

```css
/* 1. Base Layer - Reset y variables */
@layer base {
  html { font-family: 'Inter', sans-serif; }
  body { @apply bg-gradient-to-br from-sky-light via-white to-blue-soft/20; }
}

/* 2. Components Layer - Componentes reutilizables */
@layer components {
  .btn { @apply inline-flex items-center justify-center transition-all; }
  .card { @apply bg-white/90 backdrop-blur-md shadow-soft; }
}

/* 3. Utilities Layer - Utilidades específicas */
@layer utilities {
  .gradient-text { @apply bg-gradient-to-r from-midnight-blue to-sky-muted bg-clip-text text-transparent; }
}
```

### Tokens de Diseño

```typescript
const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: '#C1E8FF',
      500: '#1B3B6F',
      900: '#021024',
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
    }
  }
} as const;
```

---

## 🔄 Arquitectura de Estado

### Zustand Store Pattern

```typescript
interface StoreState {
  // Estado
  data: DataType[];
  loading: boolean;
  error: string | null;
  
  // Acciones síncronas
  setData: (data: DataType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Acciones asíncronas
  fetchData: () => Promise<void>;
  createItem: (item: Omit<DataType, 'id'>) => Promise<void>;
  updateItem: (id: string, data: Partial<DataType>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

const useDataStore = create<StoreState>()((set, get) => ({
  data: [],
  loading: false,
  error: null,
  
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api.fetchData();
      set({ data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // ... más acciones
}));
```

### Persistencia de Estado

```typescript
// AuthStore con persistencia
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Lógica de login
        set({ user, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
```

---

## 🚀 Arquitectura de Performance

### Code Splitting

```typescript
// Lazy loading de páginas
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SuperAdminDashboard = lazy(() => import('./pages/SuperAdminDashboard'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/superadmin" element={<SuperAdminDashboard />} />
  </Routes>
</Suspense>
```

### Memoización Estratégica

```typescript
// Componentes memoizados
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveTransformation(item));
  }, [data]);
  
  const handleClick = useCallback((id: string) => {
    // Lógica del click
  }, []);
  
  return <div>{/* Render */}</div>;
});
```

### Optimización de Re-renders

```typescript
// Selectores específicos para evitar re-renders innecesarios
const useUserName = () => useAuthStore(state => state.user?.name);
const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);

// En lugar de
const { user, isAuthenticated } = useAuthStore(); // Re-render en cualquier cambio
```

---

## 🧪 Arquitectura de Testing (Preparada)

### Estructura de Tests

```
src/
├── components/
│   ├── __tests__/
│   │   ├── DailyChart.test.tsx
│   │   └── SummaryCards.test.tsx
├── pages/
│   ├── __tests__/
│   │   ├── LoginPage.test.tsx
│   │   └── AdminDashboard.test.tsx
├── stores/
│   ├── __tests__/
│   │   ├── authStore.test.ts
│   │   └── waterParksStore.test.ts
└── utils/
    └── __tests__/
        └── testUtils.tsx
```

### Testing Patterns

```typescript
// Test utilities
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <BrowserRouter>
      <QueryClient>
        {children}
      </QueryClient>
    </BrowserRouter>
  );
  
  return render(ui, { wrapper: Wrapper, ...options });
};

// Component tests
describe('SummaryCards', () => {
  it('should display correct metrics', () => {
    renderWithProviders(<SummaryCards />);
    expect(screen.getByText('Tickets Activos')).toBeInTheDocument();
  });
});

// Store tests
describe('authStore', () => {
  it('should authenticate user correctly', async () => {
    const { login } = useAuthStore.getState();
    await login('admin@example.com', 'password');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});
```

---

## 🔮 Arquitectura Futura

### Preparación para Escalabilidad

#### 1. **Micro-frontends Ready**
```typescript
// Estructura preparada para micro-frontends
const ModuleLoader = lazy(() => import('@waterparks/user-management'));
const AnotherModule = lazy(() => import('@waterparks/analytics'));
```

#### 2. **API Integration Ready**
```typescript
// Capa de abstracción para APIs
interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  put<T>(url: string, data: unknown): Promise<T>;
  delete(url: string): Promise<void>;
}

const apiClient: ApiClient = {
  // Implementación con fetch/axios
};
```

#### 3. **Real-time Updates Ready**
```typescript
// WebSocket integration preparada
const useRealTimeData = (endpoint: string) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const ws = new WebSocket(`ws://api.example.com/${endpoint}`);
    ws.onmessage = (event) => setData(JSON.parse(event.data));
    return () => ws.close();
  }, [endpoint]);
  
  return data;
};
```

---

Esta arquitectura proporciona una base sólida, escalable y mantenible para el crecimiento futuro del proyecto, manteniendo la flexibilidad para adaptarse a nuevos requerimientos y tecnologías.