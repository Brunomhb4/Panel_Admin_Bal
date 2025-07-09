# 📦 Documentación de Dependencias

## 🚀 Dependencias de Producción

### React Ecosystem
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

#### React 18.3.1
- **Propósito**: Framework principal de la aplicación
- **Características utilizadas**:
  - Hooks (useState, useEffect, useMemo, useCallback)
  - Concurrent Features
  - Automatic Batching
  - Suspense (preparado para uso futuro)
- **Justificación**: Versión estable más reciente con mejoras de performance

#### React DOM 18.3.1
- **Propósito**: Renderizado en el DOM
- **Características utilizadas**:
  - createRoot API
  - Hydration mejorada
  - Streaming SSR (preparado para futuro)

---

### Routing
```json
{
  "react-router-dom": "^6.22.3"
}
```

#### React Router DOM 6.22.3
- **Propósito**: Enrutamiento del lado del cliente
- **Características utilizadas**:
  - `BrowserRouter` - Enrutamiento basado en historial
  - `Routes` y `Route` - Definición de rutas
  - `Navigate` - Redirecciones programáticas
  - `Link` - Navegación declarativa
  - `useLocation` - Hook para ubicación actual
  - `useParams` - Extracción de parámetros de URL

**Rutas implementadas**:
```typescript
// Rutas públicas
/login

// Rutas protegidas - Admin
/admin
/admin/waterpark/:id

// Rutas protegidas - SuperAdmin
/superadmin
/superadmin/waterpark/:id
/superadmin/users
/superadmin/waterparks
```

---

### State Management
```json
{
  "zustand": "^4.5.2"
}
```

#### Zustand 4.5.2
- **Propósito**: Gestión de estado global
- **Ventajas sobre Redux**:
  - Menos boilerplate
  - TypeScript nativo
  - Bundle size menor
  - API más simple
- **Stores implementados**:
  - `authStore` - Autenticación y usuario
  - `waterParksStore` - Datos de balnearios

**Características utilizadas**:
```typescript
// Persistencia automática
persist(
  (set) => ({
    // estado
  }),
  { name: 'auth-storage' }
)

// Subscripciones selectivas
const { user } = useAuthStore();
const { waterParks, loading } = useWaterParksStore();
```

---

### Icons
```json
{
  "lucide-react": "^0.344.0"
}
```

#### Lucide React 0.344.0
- **Propósito**: Biblioteca de iconos
- **Ventajas**:
  - Tree-shaking automático
  - Consistencia visual
  - Tamaño optimizado
  - Personalización fácil

**Iconos utilizados**:
```typescript
// Navegación
import { Home, LayoutDashboard, Users, Waves, LogOut } from 'lucide-react';

// Acciones
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

// UI
import { Menu, Bell, User, Eye, EyeOff } from 'lucide-react';

// Métricas
import { Ticket, DollarSign, Store, TrendingUp } from 'lucide-react';
```

---

### Charts & Visualization
```json
{
  "recharts": "^2.12.2"
}
```

#### Recharts 2.12.2
- **Propósito**: Gráficos y visualizaciones
- **Ventajas**:
  - Componentes React nativos
  - Responsivo por defecto
  - Personalización completa
  - Performance optimizada

**Componentes utilizados**:
```typescript
// Gráfico de área para estadísticas diarias
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Gráfico de barras para estadísticas mensuales
import { BarChart, Bar, Legend } from 'recharts';
```

**Configuraciones implementadas**:
- Gradientes personalizados
- Tooltips con estilo del proyecto
- Ejes duales (tickets/ingresos)
- Responsividad granular
- Animaciones suaves

---

## 🛠️ Dependencias de Desarrollo

### Build Tool
```json
{
  "vite": "^5.4.2",
  "@vitejs/plugin-react": "^4.3.1"
}
```

#### Vite 5.4.2
- **Propósito**: Build tool y dev server
- **Ventajas**:
  - Hot Module Replacement (HMR) ultra rápido
  - Build optimizado con Rollup
  - Soporte nativo para TypeScript
  - Tree-shaking automático
- **Configuración**:
```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Optimización específica
  },
});
```

#### Vite Plugin React 4.3.1
- **Propósito**: Integración React con Vite
- **Características**:
  - Fast Refresh
  - JSX automático
  - Optimizaciones de desarrollo

---

### Styling
```json
{
  "tailwindcss": "^3.4.13",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47"
}
```

#### Tailwind CSS 3.4.13
- **Propósito**: Framework CSS utility-first
- **Configuración personalizada**:
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Breakpoints ultra responsivos
      screens: {
        'xs': '375px',
        'mobile-s': '320px',
        'mobile-m': '375px',
        'mobile-l': '425px',
        // ... más breakpoints
      },
      // Paleta de colores personalizada
      colors: {
        'deep-navy': '#021024',
        'navy-blue': '#052659',
        // ... más colores
      }
    }
  }
}
```

#### PostCSS 8.4.47 & Autoprefixer 10.4.20
- **Propósito**: Procesamiento CSS
- **Características**:
  - Prefijos automáticos para compatibilidad
  - Optimización CSS
  - Soporte para CSS moderno

---

### TypeScript
```json
{
  "typescript": "^5.5.3",
  "@types/react": "^18.3.5",
  "@types/react-dom": "^18.3.0"
}
```

#### TypeScript 5.5.3
- **Propósito**: Tipado estático
- **Configuración estricta**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Tipos personalizados implementados**:
```typescript
// Tipos de usuario y roles
type UserRole = 'admin' | 'superadmin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  waterParkId?: string;
}

// Tipos de datos de balnearios
interface WaterPark {
  id: string;
  name: string;
  activeTickets: number;
  soldTickets: number;
  printedTickets: number;
  inactiveTickets: number;
  totalRevenue: number;
}
```

---

### Linting & Code Quality
```json
{
  "eslint": "^9.9.1",
  "@eslint/js": "^9.9.1",
  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
  "eslint-plugin-react-refresh": "^0.4.11",
  "typescript-eslint": "^8.3.0",
  "globals": "^15.9.0"
}
```

#### ESLint 9.9.1
- **Propósito**: Linting y calidad de código
- **Configuración**:
```javascript
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
```

**Reglas implementadas**:
- Reglas recomendadas de TypeScript
- Reglas de React Hooks
- Validación de React Refresh
- Detección de variables no utilizadas

---

## 📊 Análisis de Bundle Size

### Dependencias por Tamaño (estimado)
```
react + react-dom: ~45KB gzipped
react-router-dom: ~12KB gzipped
zustand: ~3KB gzipped
lucide-react: ~5KB gzipped (tree-shaken)
recharts: ~25KB gzipped
tailwindcss: ~10KB gzipped (purged)
```

### Optimizaciones Implementadas
1. **Tree Shaking**: Solo se importan iconos utilizados
2. **Code Splitting**: Rutas lazy-loaded (preparado)
3. **CSS Purging**: Tailwind elimina clases no utilizadas
4. **Bundle Analysis**: Vite optimiza automáticamente

---

## 🔄 Gestión de Dependencias

### Actualización de Dependencias
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores (con cuidado)
npm install package@latest
```

### Dependencias Críticas
- **React**: Core del proyecto, actualizar con precaución
- **TypeScript**: Puede requerir ajustes de tipos
- **Tailwind**: Cambios pueden afectar estilos

### Dependencias Seguras para Actualizar
- **Lucide React**: Actualizaciones frecuentes, compatibles
- **Zustand**: API estable, actualizaciones seguras
- **Vite**: Mejoras de performance constantes

---

## 🚀 Dependencias Futuras Sugeridas

### Para Funcionalidades Adicionales
```json
{
  // Animaciones avanzadas
  "framer-motion": "^10.x.x",
  
  // Formularios complejos
  "react-hook-form": "^7.x.x",
  
  // Validación
  "zod": "^3.x.x",
  
  // Fechas
  "date-fns": "^2.x.x",
  
  // Notificaciones
  "react-hot-toast": "^2.x.x",
  
  // Drag & Drop
  "@dnd-kit/core": "^6.x.x",
  
  // Tablas avanzadas
  "@tanstack/react-table": "^8.x.x"
}
```

### Para Backend Integration
```json
{
  // HTTP Client
  "axios": "^1.x.x",
  
  // WebSockets
  "socket.io-client": "^4.x.x",
  
  // Autenticación
  "@auth0/auth0-react": "^2.x.x",
  
  // Queries
  "@tanstack/react-query": "^4.x.x"
}
```

---

## ⚠️ Consideraciones de Seguridad

### Dependencias Auditadas
```bash
# Auditoría de seguridad
npm audit

# Corrección automática
npm audit fix
```

### Políticas de Actualización
1. **Parches de seguridad**: Aplicar inmediatamente
2. **Versiones menores**: Revisar changelog
3. **Versiones mayores**: Testing exhaustivo
4. **Dependencias dev**: Más flexibles para actualizar

### Monitoreo Continuo
- Dependabot configurado (recomendado)
- Snyk para vulnerabilidades
- Renovate para actualizaciones automáticas

---

Esta documentación proporciona una visión completa de todas las dependencias del proyecto, su propósito, configuración y consideraciones para el mantenimiento futuro.

---

## 📊 Nuevas Dependencias para Servicios de Alimentación

### Recharts - Gráficas Avanzadas
```json
{
  "recharts": "^2.12.2"
}
```

#### Uso Extendido en Nuevos Módulos
Los nuevos módulos de servicios de alimentación hacen uso extensivo de Recharts:

**Componentes Utilizados**:
```typescript
// Gráficas de área para ventas por hora
import { AreaChart, Area } from 'recharts';

// Gráficas de barras para comparativas
import { BarChart, Bar } from 'recharts';

// Gráficas de línea para tendencias
import { LineChart, Line } from 'recharts';

// Gráficas de pastel para productos más vendidos
import { PieChart, Pie, Cell } from 'recharts';

// Componentes de soporte
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
```

**Configuraciones Implementadas**:
- **Gradientes personalizados** para áreas de gráficas
- **Tooltips temáticos** con estilos del proyecto
- **Responsividad granular** para diferentes dispositivos
- **Animaciones suaves** con duraciones personalizadas
- **Colores adaptativos** según el tema (claro/oscuro)

**Optimizaciones**:
```typescript
// Configuración responsiva automática
const getResponsiveConfig = (width: number) => {
  if (width < 640) return MOBILE_CONFIG;
  if (width < 1024) return TABLET_CONFIG;
  return DESKTOP_CONFIG;
};

// Memoización de datos de gráficas
const chartData = useMemo(() => {
  return processChartData(rawData);
}, [rawData]);
```

---

## 🎨 Dependencias de Iconos Expandidas

### Lucide React - Iconos Adicionales
```json
{
  "lucide-react": "^0.344.0"
}
```

#### Nuevos Iconos Utilizados
```typescript
// Iconos para servicios de alimentación
import { 
  ChefHat,           // Restaurante
  Coffee,            // Snacks
  ShoppingBag,       // Tienda
  Cookie,            // Productos de snacks
  UtensilsCrossed,   // Servicios de comida
  Wine,              // Bebidas
  Dessert            // Postres
} from 'lucide-react';

// Iconos para métricas y análisis
import {
  BarChart3,         // Gráficas de barras
  TrendingUp,        // Tendencias positivas
  Activity,          // Actividad en tiempo real
  Calendar,          // Filtros temporales
  Clock,             // Horarios
  Sparkles,          // Efectos especiales
  Zap                // Indicadores de velocidad
} from 'lucide-react';

// Iconos para acciones
import {
  Package,           // Productos
  Users,             // Clientes
  DollarSign,        // Ingresos
  Receipt            // Notas/tickets
} from 'lucide-react';
```

**Optimización de Bundle**:
- Tree-shaking automático mantiene el bundle pequeño
- Solo se importan los iconos utilizados
- Iconos vectoriales escalables para todas las resoluciones

---

## 🔧 Nuevas Utilidades de Desarrollo

### Generadores de Datos Mock

#### Implementación Personalizada
```typescript
// No requiere dependencias adicionales
// Implementado directamente en cada módulo

// src/pages/SnacksManagement.tsx
const generateSnacksData = () => {
  // Generación de datos realistas para snacks
};

// src/pages/StoreManagement.tsx  
const generateStoreData = () => {
  // Generación de datos realistas para tienda
};

// src/pages/RestaurantManagement.tsx
const generateMockData = () => {
  // Datos existentes mejorados
};
```

**Ventajas del Enfoque Actual**:
- ✅ Sin dependencias adicionales
- ✅ Datos específicos por módulo
- ✅ Patrones realistas de negocio
- ✅ Fácil personalización
- ✅ Performance optimizada

---

## 📊 Análisis de Bundle Size Actualizado

### Impacto de Nuevos Módulos
```
Dependencias principales (sin cambios):
react + react-dom: ~45KB gzipped
react-router-dom: ~12KB gzipped
zustand: ~3KB gzipped
lucide-react: ~8KB gzipped (iconos adicionales)
recharts: ~25KB gzipped (sin cambios)
tailwindcss: ~12KB gzipped (estilos adicionales)

Total estimado: ~105KB gzipped
```

### Optimizaciones Implementadas
1. **Lazy Loading de Gráficas**: Carga diferida de componentes pesados
2. **Memoización Inteligente**: React.memo en componentes de métricas
3. **Tree Shaking Mejorado**: Solo iconos y componentes utilizados
4. **Code Splitting por Módulo**: Cada servicio se carga independientemente

```typescript
// Lazy loading implementado
const LazySnacksManagement = lazy(() => import('./pages/SnacksManagement'));
const LazyStoreManagement = lazy(() => import('./pages/StoreManagement'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/superadmin/snacks" element={<LazySnacksManagement />} />
    <Route path="/superadmin/store" element={<LazyStoreManagement />} />
  </Routes>
</Suspense>
```

---

## 🚀 Dependencias Futuras Recomendadas

### Para Funcionalidades Avanzadas de Alimentación
```json
{
  // Manejo de fechas avanzado
  "date-fns": "^2.x.x",
  
  // Validación de formularios para inventario
  "react-hook-form": "^7.x.x",
  "zod": "^3.x.x",
  
  // Exportación de reportes
  "jspdf": "^2.x.x",
  "xlsx": "^0.18.x",
  
  // Notificaciones para alertas de stock
  "react-hot-toast": "^2.x.x",
  
  // Drag & Drop para organización de productos
  "@dnd-kit/core": "^6.x.x",
  
  // Tablas avanzadas para inventario
  "@tanstack/react-table": "^8.x.x",
  
  // Animaciones avanzadas
  "framer-motion": "^10.x.x"
}
```

### Para Integración con APIs de Alimentación
```json
{
  // Cliente HTTP optimizado
  "axios": "^1.x.x",
  
  // WebSockets para actualizaciones en tiempo real
  "socket.io-client": "^4.x.x",
  
  // Gestión de caché para métricas
  "@tanstack/react-query": "^4.x.x",
  
  // Validación de esquemas de API
  "yup": "^1.x.x"
}
```

### Para Análisis Avanzado
```json
{
  // Análisis estadístico
  "simple-statistics": "^7.x.x",
  
  // Procesamiento de datos
  "lodash": "^4.x.x",
  
  // Formateo de números y monedas
  "numeral": "^2.x.x",
  
  // Gráficas 3D avanzadas
  "three": "^0.150.x",
  "@react-three/fiber": "^8.x.x"
}
```

---

## ⚡ Optimizaciones de Performance

### Estrategias Implementadas

#### 1. Memoización Inteligente
```typescript
// Componentes memoizados para métricas
const MemoizedMetricsCard = React.memo(({ metric }: { metric: Metric }) => {
  return <MetricsCard {...metric} />;
});

// Cálculos costosos memoizados
const processedData = useMemo(() => {
  return expensiveDataProcessing(rawData);
}, [rawData]);
```

#### 2. Debounce en Actualizaciones
```typescript
// Hook personalizado para debounce
const useDebouncedValue = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

#### 3. Lazy Loading de Gráficas
```typescript
// Carga diferida de componentes pesados
const LazyAreaChart = lazy(() => 
  import('recharts').then(module => ({ default: module.AreaChart }))
);

const LazyPieChart = lazy(() => 
  import('recharts').then(module => ({ default: module.PieChart }))
);
```

---

## 🔍 Monitoreo de Dependencias

### Scripts de Análisis
```json
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer dist/static/js/*.js",
    "deps:check": "npm outdated",
    "deps:audit": "npm audit",
    "deps:update": "npm update",
    "bundle:size": "npm run build && du -sh dist/",
    "perf:lighthouse": "lighthouse http://localhost:5173 --output=json --output-path=./lighthouse-report.json"
  }
}
```

### Métricas de Performance
```typescript
// Métricas implementadas en desarrollo
const performanceMetrics = {
  bundleSize: '~105KB gzipped',
  loadTime: '<2s on 3G',
  firstContentfulPaint: '<1.5s',
  largestContentfulPaint: '<2.5s',
  cumulativeLayoutShift: '<0.1',
  firstInputDelay: '<100ms'
};
```

---

## 🛡️ Seguridad de Dependencias

### Auditoría Continua
```bash
# Comandos de seguridad implementados
npm audit --audit-level moderate
npm audit fix --force

# Verificación de vulnerabilidades
npx audit-ci --moderate

# Actualización segura
npx npm-check-updates -u
```

### Políticas de Actualización para Nuevos Módulos
1. **Recharts**: Actualizar solo versiones menores (compatibilidad de API)
2. **Lucide React**: Actualizar frecuentemente (solo iconos nuevos)
3. **Dependencias de desarrollo**: Más flexibles para actualizar
4. **Dependencias críticas**: Testing exhaustivo antes de actualizar

---

Esta documentación actualizada refleja el estado actual del proyecto con los nuevos módulos de servicios de alimentación, manteniendo la compatibilidad y optimización del bundle size mientras se agregan funcionalidades avanzadas de análisis y visualización.