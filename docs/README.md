# 📋 Documentación Completa - Panel de Administración de Balnearios

## 🎯 Descripción del Proyecto

Sistema de administración integral para la gestión de balnearios con roles diferenciados (Admin y Super Admin), diseñado con una arquitectura moderna y completamente responsiva.

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── charts/         # Gráficos y visualizaciones
│   ├── dashboards/     # Componentes específicos del dashboard
│   ├── layout/         # Componentes de layout (Header, Sidebar, etc.)
│   ├── tables/         # Tablas de datos
│   └── ProtectedRoute.tsx
├── pages/              # Páginas principales
├── stores/             # Estado global (Zustand)
├── types/              # Definiciones de tipos TypeScript
└── styles/             # Estilos globales
```

## 📦 Dependencias del Proyecto

### Dependencias Principales
```json
{
  "react": "^18.3.1",                    // Framework principal
  "react-dom": "^18.3.1",               // DOM renderer
  "react-router-dom": "^6.22.3",        // Enrutamiento
  "zustand": "^4.5.2",                  // Gestión de estado
  "lucide-react": "^0.344.0",           // Iconos
  "recharts": "^2.12.2"                 // Gráficos y charts
}
```

### Dependencias de Desarrollo
```json
{
  "@vitejs/plugin-react": "^4.3.1",     // Plugin React para Vite
  "tailwindcss": "^3.4.13",             // Framework CSS
  "autoprefixer": "^10.4.20",           // PostCSS autoprefixer
  "postcss": "^8.4.47",                 // Procesador CSS
  "typescript": "^5.5.3",               // TypeScript
  "eslint": "^9.9.1",                   // Linter
  "vite": "^5.4.2"                      // Build tool
}
```

## 🧩 Componentes del Sistema

### 📊 Componentes de Gráficos (`/components/charts/`)

#### `DailyChart.tsx`
**Propósito**: Visualización de estadísticas diarias con gráfico de área
```typescript
interface DailyChartProps {
  data: DailyStats[];
}
```
**Características**:
- Gráfico de área responsivo con Recharts
- Configuración adaptativa según tamaño de pantalla
- Gradientes personalizados
- Tooltips interactivos
- Ejes duales (tickets y ingresos)

#### `MonthlyChart.tsx`
**Propósito**: Visualización de estadísticas mensuales con gráfico de barras
```typescript
interface MonthlyChartProps {
  data: MonthlyStats[];
}
```
**Características**:
- Gráfico de barras responsivo
- Leyenda adaptativa
- Colores temáticos del proyecto
- Configuración responsive automática

### 🏠 Componentes de Dashboard (`/components/dashboards/`)

#### `SummaryCards.tsx`
**Propósito**: Tarjetas de resumen con métricas principales
**Características**:
- 4 tarjetas principales: Tickets Activos, Ingresos, Balnearios, Tickets Vendidos
- Iconos de Lucide React
- Animaciones escalonadas
- Gradientes y efectos glass
- Completamente responsivo

#### `WaterParksTable.tsx`
**Propósito**: Tabla principal de balnearios con navegación
**Características**:
- Tabla responsiva con scroll horizontal
- Enlaces dinámicos según rol de usuario
- Avatares generados automáticamente
- Badges de estado
- Animaciones de entrada

### 🎨 Componentes de Layout (`/components/layout/`)

#### `DashboardLayout.tsx`
**Propósito**: Layout principal del dashboard
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}
```
**Características**:
- Sidebar colapsable
- Header responsivo
- Backdrop para móviles
- Gestión de estado del sidebar

#### `Header.tsx`
**Propósito**: Barra superior con información del usuario
```typescript
interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}
```
**Características**:
- Botón hamburguesa para móviles
- Avatar del usuario
- Notificaciones
- Título dinámico

#### `Sidebar.tsx`
**Propósito**: Navegación lateral
```typescript
interface SidebarProps {
  onClose: () => void;
}
```
**Características**:
- Navegación basada en roles
- Estados activos/inactivos
- Logo animado
- Botón de logout

### 📋 Componentes de Tablas (`/components/tables/`)

#### `CheckersTable.tsx`
**Propósito**: Tabla de checadores/empleados
```typescript
interface CheckersTableProps {
  checkers: Checker[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```
**Características**:
- Acciones opcionales (editar/eliminar)
- Avatares de empleados
- Información responsiva
- Badges de estadísticas

### 🔒 Componente de Protección

#### `ProtectedRoute.tsx`
**Propósito**: Protección de rutas basada en roles
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'superadmin';
}
```
**Características**:
- Verificación de autenticación
- Control de acceso por roles
- Redirecciones automáticas

## 📄 Páginas del Sistema

### 🔐 `LoginPage.tsx`
**Funcionalidades**:
- Formulario de login con validación
- Cuentas demo predefinidas
- Mostrar/ocultar contraseña
- Estados de carga
- Redirección automática

### 👑 `SuperAdminDashboard.tsx`
**Funcionalidades**:
- Vista general de todos los balnearios
- Tarjetas de resumen globales
- Tabla de balnearios
- Acceso a gestión de usuarios y balnearios

### 👤 `AdminDashboard.tsx`
**Funcionalidades**:
- Redirección automática al balneario asignado
- Vista específica del balneario del admin

### 🏊 `WaterParkDetail.tsx`
**Funcionalidades**:
- Estadísticas detalladas del balneario
- Gráficos diarios y mensuales
- Tabla de checadores
- Métricas de tickets

### 👥 `UserManagement.tsx`
**Funcionalidades**:
- CRUD completo de usuarios
- Modal de creación/edición
- Asignación de balnearios
- Gestión de roles

### 🏢 `WaterParkManagement.tsx`
**Funcionalidades**:
- CRUD completo de balnearios
- Modal de creación/edición
- Gestión de métricas
- Validaciones de formulario

## 🗄️ Gestión de Estado (Stores)

### `authStore.ts`
**Propósito**: Gestión de autenticación y usuarios
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```
**Características**:
- Persistencia con localStorage
- Usuarios demo predefinidos
- Gestión de roles
- Estados de autenticación

### `waterParksStore.ts`
**Propósito**: Gestión de datos de balnearios
```typescript
interface WaterParksState {
  waterParks: WaterPark[];
  checkers: Checker[];
  dailyStats: Record<string, DailyStats[]>;
  monthlyStats: Record<string, MonthlyStats[]>;
  // ... métodos CRUD
}
```
**Características**:
- Datos mock generados automáticamente
- CRUD completo para balnearios y checadores
- Estadísticas temporales
- Estados de carga

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
/* Colores principales */
'deep-navy': '#021024'      /* Azul muy oscuro */
'navy-blue': '#052659'      /* Azul marino profundo */
'midnight-blue': '#1B3B6F'  /* Azul medianoche */
'sky-muted': '#5483B3'      /* Azul cielo apagado */
'blue-soft': '#7DA0CA'      /* Azul grisáceo suave */
'sky-light': '#C1E8FF'      /* Azul muy claro */
```

### Breakpoints Responsivos
```css
'xs': '375px'        /* Teléfonos pequeños */
'sm': '640px'        /* Teléfonos grandes */
'md': '768px'        /* Tablets pequeñas */
'lg': '1024px'       /* Tablets grandes */
'xl': '1280px'       /* Laptops */
'2xl': '1536px'      /* Pantallas grandes */
```

### Componentes CSS Principales
- `.btn` - Sistema de botones responsivo
- `.card` - Tarjetas con efectos glass
- `.input` - Campos de formulario
- `.table` - Tablas responsivas
- `.badge` - Etiquetas de estado
- `.sidebar` - Navegación lateral
- `.header` - Barra superior

## 🚀 Características Técnicas

### Responsividad Ultra Granular
- **Breakpoints específicos**: Desde 280px hasta 4K
- **Orientación adaptativa**: Portrait/Landscape
- **Touch-friendly**: Áreas de toque optimizadas
- **Aspect ratio**: Soporte para pantallas inusuales

### Animaciones y Efectos
- **Fade-in**: Aparición suave de elementos
- **Slide-up**: Animaciones de entrada
- **Float**: Efectos flotantes
- **Scale**: Efectos de escala en hover
- **Glass effect**: Efectos de cristal con backdrop-blur

### Accesibilidad
- **Focus states**: Estados de foco visibles
- **ARIA labels**: Etiquetas para lectores de pantalla
- **Keyboard navigation**: Navegación por teclado
- **Color contrast**: Contraste adecuado en todos los elementos

## 🔧 Configuración del Proyecto

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Tailwind Configuration
- **Tema extendido** con colores personalizados
- **Breakpoints adicionales** para ultra responsividad
- **Animaciones personalizadas**
- **Espaciado granular**

### TypeScript Configuration
- **Strict mode** habilitado
- **Path mapping** configurado
- **Linting rules** estrictas

## 📱 Soporte de Dispositivos

### Móviles Soportados
- **iPhone SE** (375px)
- **iPhone 12/13/14** (390px)
- **iPhone 12/13/14 Pro Max** (428px)
- **Samsung Galaxy S20** (360px)
- **Samsung Galaxy S20+** (384px)
- **Google Pixel** (393px)

### Tablets Soportados
- **iPad** (768px)
- **iPad Pro** (1024px)
- **Samsung Galaxy Tab** (800px)

### Desktop Soportados
- **Laptop** (1366px)
- **Desktop** (1920px)
- **4K** (2560px+)

## 🔐 Sistema de Autenticación

### Cuentas Demo
```typescript
// Admin Balneario 1
email: 'admin1@example.com'
password: 'password'

// Admin Balneario 2  
email: 'admin2@example.com'
password: 'password'

// Super Admin
email: 'superadmin@example.com'
password: 'password'
```

### Roles y Permisos
- **Admin**: Acceso solo a su balneario asignado
- **SuperAdmin**: Acceso completo a todos los balnearios y gestión de usuarios

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📊 Estructura de Datos

### Interfaces Principales
```typescript
interface WaterPark {
  id: string;
  name: string;
  activeTickets: number;
  soldTickets: number;
  printedTickets: number;
  inactiveTickets: number;
  totalRevenue: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  waterParkId?: string;
  waterParkName?: string;
}

interface Checker {
  id: string;
  name: string;
  email: string;
  waterParkId: string;
  soldTickets: number;
}
```

## 🎯 Próximas Mejoras Sugeridas

1. **Backend Integration**: Conectar con API real
2. **Real-time Updates**: WebSockets para actualizaciones en tiempo real
3. **Advanced Analytics**: Más gráficos y métricas
4. **Export Features**: Exportar datos a PDF/Excel
5. **Notifications**: Sistema de notificaciones push
6. **Dark Mode**: Tema oscuro
7. **Multi-language**: Soporte para múltiples idiomas

---

**Versión**: 1.0.0  
**Última actualización**: 2025  
**Tecnologías**: React 18, TypeScript, Tailwind CSS, Vite, Zustand

---

## 🍽️ Nuevos Módulos de Servicios de Alimentación

### Módulo de Snacks
**Ubicación**: `/superadmin/snacks`

#### Funcionalidades Implementadas
- **Panel de totales**: Ventas del día actual y ventas históricas
- **Gráfica de ventas por hora**: Visualización de picos de venta durante el día
- **Gráfica comparativa semanal**: Análisis de tendencias semanales
- **Productos más vendidos**: Ranking con gráfica de pastel (pie chart)
- **Métricas en tiempo real**: Actualización automática de datos
- **Interfaz cristalina**: Diseño con efectos glass y gradientes temáticos

#### Datos Mostrados
```typescript
interface SnacksMetrics {
  dailySales: number;           // Ventas del día
  historicalSales: number;      // Total histórico
  dailyRevenue: number;         // Ingresos del día
  historicalRevenue: number;    // Ingresos históricos
  totalProducts: number;        // Productos vendidos hoy
  averageTicket: number;        // Ticket promedio
}
```

#### Gráficas Incluidas
1. **Ventas por Hora** (AreaChart): Muestra picos de venta durante el día
2. **Comparativa Semanal** (BarChart): Tendencias de los últimos 7 días
3. **Productos Más Vendidos** (PieChart): Top 5 productos con porcentajes

---

### Módulo de Tienda
**Ubicación**: `/superadmin/store`

#### Funcionalidades Implementadas
- **Panel de métricas**: Ventas diarias, semanales y productos vendidos
- **Datos numéricos y porcentuales**: Indicadores de crecimiento
- **Gráficas de tendencias**: Análisis temporal de ventas
- **Resumen de rendimiento**: KPIs clave del negocio
- **Actualización en tiempo real**: Datos dinámicos con animaciones

#### Métricas Avanzadas
```typescript
interface StoreMetrics {
  dailySales: number;           // Ventas del día
  weeklySales: number;          // Ventas semanales
  dailyRevenue: number;         // Ingresos diarios
  weeklyRevenue: number;        // Ingresos semanales
  productsCount: number;        // Productos vendidos
  dailyGrowth: number;          // % crecimiento diario
  weeklyGrowth: number;         // % crecimiento semanal
}
```

#### Gráficas Incluidas
1. **Ventas Diarias** (LineChart): Tendencia de la última semana
2. **Tendencia Semanal** (BarChart): Comparativa de las últimas 4 semanas
3. **Resumen de Rendimiento**: Métricas con barras de progreso animadas

---

### Módulo de Restaurante (Mejorado)
**Ubicación**: `/superadmin/restaurant`

#### Mejoras Implementadas
- **Etiquetas de identificación**: Cada mosaico muestra etiquetas identificativas
- **Interfaz mejorada**: Mejor organización visual de métricas
- **Nombre actualizado**: Cambio de "Restaurante Cristal" a "Restaurante Dios Padre"
- **Diseño consistente**: Alineado con los nuevos módulos

#### Etiquetas Agregadas
- Cada tarjeta de métrica incluye una etiqueta en la esquina superior derecha
- Las etiquetas muestran la primera palabra del título de la métrica
- Diseño con backdrop-blur y bordes temáticos

---

## 🎨 Nuevas Características de Diseño

### Sistema de Temas por Módulo
Cada módulo de servicios de alimentación tiene su propia identidad visual:

```css
/* Restaurante - Azules profundos */
--restaurant-primary: #1B3B6F;
--restaurant-secondary: #5483B3;
--restaurant-accent: #7DA0CA;

/* Snacks - Azules medios */
--snacks-primary: #5483B3;
--snacks-secondary: #7DA0CA;
--snacks-accent: #C1E8FF;

/* Tienda - Azules claros */
--store-primary: #7DA0CA;
--store-secondary: #C1E8FF;
--store-accent: #FFFFFF;
```

### Efectos Visuales Mejorados
- **Shimmer Effect**: Animaciones de brillo en barras de progreso
- **Glass Morphism**: Efectos de cristal con backdrop-blur
- **Gradientes Dinámicos**: Fondos que cambian según el módulo
- **Animaciones Escalonadas**: Elementos que aparecen con delay
- **Hover States Avanzados**: Transformaciones y efectos de escala

### Iconografía Temática
- **Restaurante**: ChefHat (Gorro de chef)
- **Snacks**: Coffee (Taza de café)
- **Tienda**: ShoppingBag (Bolsa de compras)

---

## 📊 Sistema de Gráficas Avanzado

### Tipos de Gráficas Implementadas

#### AreaChart (Gráfica de Área)
- **Uso**: Ventas por hora en Snacks
- **Características**: Gradientes personalizados, tooltips interactivos
- **Datos**: Ventas agrupadas por hora (8 AM - 8 PM)

#### BarChart (Gráfica de Barras)
- **Uso**: Comparativas semanales y tendencias
- **Características**: Barras redondeadas, colores temáticos
- **Datos**: Ventas agrupadas por día/semana

#### LineChart (Gráfica de Línea)
- **Uso**: Tendencias diarias en Tienda
- **Características**: Puntos interactivos, líneas suaves
- **Datos**: Evolución temporal de ventas

#### PieChart (Gráfica de Pastel)
- **Uso**: Productos más vendidos en Snacks
- **Características**: Colores diferenciados, etiquetas con porcentajes
- **Datos**: Top 5 productos con participación porcentual

### Configuración Responsiva
Todas las gráficas se adaptan automáticamente al tamaño de pantalla:
- **Móvil**: Tooltips simplificados, ejes ocultos
- **Tablet**: Configuración intermedia
- **Desktop**: Funcionalidad completa

---

## 🔧 Nuevas Utilidades y Helpers

### Generadores de Datos Mock
```typescript
// Generación realista de datos para desarrollo
const generateSnacksData = () => {
  // Productos típicos de snacks
  const products = ['Papas', 'Refrescos', 'Helados', 'Dulces', 'Nachos'];
  // Lógica de generación con patrones realistas
};

const generateStoreData = () => {
  // Productos de tienda con categorías
  const products = [
    { name: 'Protector Solar', category: 'Cuidado Personal' },
    { name: 'Toalla', category: 'Accesorios' }
  ];
  // Generación con precios y stock realistas
};
```

### Calculadores de Métricas
```typescript
// Utilidades para cálculos de negocio
const MetricsCalculator = {
  calculateGrowth: (current: number, previous: number): number => {
    return previous > 0 ? ((current - previous) / previous) * 100 : 0;
  },
  
  calculateAverageTicket: (revenue: number, sales: number): number => {
    return sales > 0 ? revenue / sales : 0;
  }
};
```

### Filtros de Datos
```typescript
// Filtros para análisis temporal
const filterTodaySales = (sales: Sale[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return sales.filter(sale => {
    const saleDate = new Date(sale.timestamp);
    saleDate.setHours(0, 0, 0, 0);
    return saleDate.getTime() === today.getTime();
  });
};
```

---

## 🚀 Mejoras de Performance

### Optimizaciones Implementadas
- **Lazy Loading**: Carga diferida de gráficas pesadas
- **Memoización**: React.memo en componentes de métricas
- **Debounce**: En actualizaciones de tiempo real
- **Virtual Scrolling**: Para listas grandes de datos

### Gestión de Estado Optimizada
```typescript
// Estados específicos por módulo para evitar re-renders innecesarios
const useSnacksData = () => useStore(state => state.snacks);
const useStoreData = () => useStore(state => state.store);
```

---

## 📱 Mejoras de Responsive Design

### Breakpoints Específicos
```css
/* Optimizaciones para servicios de alimentación */
@media (max-width: 480px) {
  .service-card { 
    padding: 1rem; 
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .service-grid { 
    grid-template-columns: repeat(2, 1fr); 
  }
}
```

### Adaptaciones Móviles
- **Gráficas simplificadas**: Menos elementos en pantallas pequeñas
- **Navegación optimizada**: Menús colapsables
- **Touch targets**: Áreas de toque ampliadas
- **Scroll horizontal**: Para tablas en móviles

---

## 🔮 Roadmap de Funcionalidades

### Próximas Mejoras Planificadas

#### Corto Plazo (1-2 meses)
- [ ] Integración con API real
- [ ] Notificaciones push para alertas
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Filtros avanzados por fecha/producto

#### Mediano Plazo (3-6 meses)
- [ ] Dashboard de comparación entre servicios
- [ ] Predicciones con IA
- [ ] Integración con sistemas de inventario
- [ ] App móvil nativa

#### Largo Plazo (6+ meses)
- [ ] Análisis de rentabilidad por producto
- [ ] Recomendaciones automáticas
- [ ] Integración con sistemas de punto de venta
- [ ] Multi-idioma

---

## 📈 Métricas de Éxito

### KPIs Implementados
- **Ventas por Hora**: Identificación de picos de demanda
- **Crecimiento Porcentual**: Comparación día a día y semana a semana
- **Ticket Promedio**: Valor promedio por transacción
- **Productos Top**: Ranking de productos más vendidos
- **Tendencias**: Análisis de patrones temporales

### Dashboards Disponibles
1. **Restaurante Dios Padre**: Gestión de mesas y notas
2. **Snacks Dios Padre**: Análisis de ventas por hora
3. **Tienda Dios Padre**: Métricas de productos y crecimiento

---

**Última actualización de funcionalidades**: Enero 2025  
**Módulos agregados**: 3 (Restaurante mejorado, Snacks, Tienda)  
**Gráficas implementadas**: 6 tipos diferentes  
**Métricas nuevas**: 15+ indicadores de rendimiento