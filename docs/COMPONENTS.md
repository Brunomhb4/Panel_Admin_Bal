# 🧩 Documentación de Componentes

## 📊 Componentes de Gráficos

### DailyChart
**Ubicación**: `src/components/charts/DailyChart.tsx`

#### Props
```typescript
interface DailyChartProps {
  data: DailyStats[];
}

interface DailyStats {
  date: string;
  tickets: number;
  revenue: number;
}
```

#### Características
- **Tipo**: Gráfico de área (AreaChart)
- **Biblioteca**: Recharts
- **Responsividad**: Ultra responsivo con configuraciones específicas por breakpoint
- **Ejes**: Dual (tickets a la izquierda, ingresos a la derecha)
- **Gradientes**: Personalizados para tickets e ingresos
- **Tooltips**: Interactivos con estilo personalizado

#### Configuración Responsiva
```typescript
const getResponsiveConfig = () => {
  const width = window.innerWidth;
  
  if (width < 375) return {
    margin: { top: 5, right: 5, left: 0, bottom: 0 },
    fontSize: 8,
    strokeWidth: 1.5,
    hideYAxis: true
  };
  // ... más configuraciones
};
```

#### Uso
```jsx
<DailyChart data={dailyStats} />
```

---

### MonthlyChart
**Ubicación**: `src/components/charts/MonthlyChart.tsx`

#### Props
```typescript
interface MonthlyChartProps {
  data: MonthlyStats[];
}

interface MonthlyStats {
  month: string;
  tickets: number;
  revenue: number;
}
```

#### Características
- **Tipo**: Gráfico de barras (BarChart)
- **Biblioteca**: Recharts
- **Barras**: Redondeadas con radius personalizado
- **Leyenda**: Adaptativa (se oculta en pantallas pequeñas)
- **Colores**: Temáticos del proyecto

#### Uso
```jsx
<MonthlyChart data={monthlyStats} />
```

---

## 🏠 Componentes de Dashboard

### SummaryCards
**Ubicación**: `src/components/dashboards/SummaryCards.tsx`

#### Características
- **Datos**: Calculados automáticamente desde el store
- **Tarjetas**: 4 métricas principales
- **Animaciones**: Escalonadas con delay
- **Iconos**: Lucide React
- **Gradientes**: Únicos por tarjeta

#### Estructura de Tarjetas
```typescript
const cards = [
  {
    title: 'Tickets Activos',
    value: totalActiveTickets,
    icon: Ticket,
    gradient: 'from-midnight-blue to-navy-blue'
  },
  // ... más tarjetas
];
```

#### Uso
```jsx
<SummaryCards />
```

---

### WaterParksTable
**Ubicación**: `src/components/dashboards/WaterParksTable.tsx`

#### Características
- **Datos**: Desde waterParksStore
- **Navegación**: Enlaces dinámicos según rol
- **Avatares**: Generados con primera letra del nombre
- **Responsive**: Columnas que se ocultan en móviles
- **Animaciones**: Entrada escalonada de filas

#### Columnas
- Nombre del Balneario (siempre visible)
- Tickets Activos (siempre visible)
- Tickets Vendidos (oculta en xs)
- Ingresos (oculta en md-)
- Acciones (siempre visible)

#### Uso
```jsx
<WaterParksTable />
```

---

## 🎨 Componentes de Layout

### DashboardLayout
**Ubicación**: `src/components/layout/DashboardLayout.tsx`

#### Props
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}
```

#### Características
- **Sidebar**: Colapsable en móviles
- **Header**: Responsivo con título dinámico
- **Backdrop**: Para cerrar sidebar en móviles
- **Scroll**: Personalizado en área principal

#### Estado
```typescript
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
```

#### Uso
```jsx
<DashboardLayout title="Mi Dashboard">
  <div>Contenido del dashboard</div>
</DashboardLayout>
```

---

### Header
**Ubicación**: `src/components/layout/Header.tsx`

#### Props
```typescript
interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}
```

#### Elementos
- **Botón hamburguesa**: Solo visible en móviles
- **Título**: Dinámico y responsivo
- **Notificaciones**: Botón con badge animado
- **Avatar**: Usuario con información de rol

#### Uso
```jsx
<Header title="Dashboard" toggleSidebar={toggleSidebar} />
```

---

### Sidebar
**Ubicación**: `src/components/layout/Sidebar.tsx`

#### Props
```typescript
interface SidebarProps {
  onClose: () => void;
}
```

#### Navegación Basada en Roles
```typescript
const navItems = [
  {
    path: userRole === 'admin' ? '/admin' : '/superadmin',
    icon: LayoutDashboard,
    label: 'Dashboard',
    show: true
  },
  {
    path: '/superadmin/waterparks',
    icon: Waves,
    label: 'Gestión de Balnearios',
    show: userRole === 'superadmin'
  }
];
```

#### Uso
```jsx
<Sidebar onClose={() => setIsSidebarOpen(false)} />
```

---

## 📋 Componentes de Tablas

### CheckersTable
**Ubicación**: `src/components/tables/CheckersTable.tsx`

#### Props
```typescript
interface CheckersTableProps {
  checkers: Checker[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

interface Checker {
  id: string;
  name: string;
  email: string;
  soldTickets: number;
}
```

#### Características
- **Acciones**: Opcionales (editar/eliminar)
- **Responsive**: Email se oculta en xs, se muestra bajo el nombre
- **Avatares**: Generados automáticamente
- **Badges**: Para tickets vendidos

#### Uso
```jsx
<CheckersTable 
  checkers={checkers}
  showActions={true}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

## 🔒 Componente de Protección

### ProtectedRoute
**Ubicación**: `src/components/ProtectedRoute.tsx`

#### Props
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'superadmin';
}
```

#### Lógica de Protección
```typescript
// Verificar autenticación
if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}

// SuperAdmin puede acceder a todo
if (userRole === 'superadmin') {
  return <>{children}</>;
}

// Admin solo a rutas de admin
if (userRole === 'admin' && requiredRole === 'admin') {
  return <>{children}</>;
}

// Redireccionar si no tiene permisos
return <Navigate to="/admin" replace />;
```

#### Uso
```jsx
<ProtectedRoute requiredRole="superadmin">
  <SuperAdminDashboard />
</ProtectedRoute>
```

---

## 🎨 Clases CSS Personalizadas

### Botones
```css
.btn {
  /* Base responsiva */
  @apply px-2 py-1.5 text-xs rounded-lg;
  @apply xs:px-3 xs:py-2 xs:text-xs xs:rounded-xl;
  @apply sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl;
  /* ... más breakpoints */
}

.btn-primary {
  @apply bg-gradient-to-r from-midnight-blue to-navy-blue;
  @apply text-white hover:shadow-medium hover:scale-105;
}
```

### Tarjetas
```css
.card {
  @apply bg-white/90 backdrop-blur-md shadow-soft;
  @apply border border-sky-light/50 hover:shadow-medium;
  @apply p-2 rounded-lg;
  @apply xs:p-3 xs:rounded-xl;
  /* ... más breakpoints */
}

.card-compact {
  /* Versión más compacta para elementos pequeños */
}

.floating-card {
  @apply hover:-translate-y-1 transition-all duration-300;
}
```

### Inputs
```css
.input {
  @apply w-full border-2 border-sky-light/60;
  @apply bg-white/80 backdrop-blur-sm;
  @apply px-2 py-2 text-xs rounded-lg;
  @apply xs:px-2.5 xs:py-2.5 xs:text-xs xs:rounded-xl;
  /* ... más breakpoints */
}
```

### Tablas
```css
.table-container {
  @apply overflow-hidden shadow-medium;
  @apply bg-white/60 backdrop-blur-md;
  @apply border border-sky-light/40;
  @apply rounded-lg xs:rounded-xl sm:rounded-2xl;
}

.table-header-cell {
  @apply text-left font-bold text-midnight-blue;
  @apply uppercase tracking-wider;
  @apply px-1 py-2 text-xs;
  @apply xs:px-2 xs:py-2.5 xs:text-xs;
  /* ... más breakpoints */
}
```

### Badges
```css
.badge {
  @apply inline-flex items-center rounded-full;
  @apply font-semibold backdrop-blur-sm border;
  @apply px-1.5 py-0.5 text-xs;
  @apply xs:px-2 xs:py-1 xs:text-xs;
  /* ... más breakpoints */
}

.badge-primary {
  @apply bg-midnight-blue/10 text-midnight-blue;
  @apply border-midnight-blue/20;
}
```

---

## 🎯 Patrones de Uso Comunes

### Responsive Grid
```jsx
<div className="responsive-grid">
  {/* 1 col en móvil, 2 en tablet, 4 en desktop */}
</div>

<div className="responsive-grid-2">
  {/* 1 col en móvil, 2 en desktop */}
</div>
```

### Animaciones
```jsx
<div className="animate-fade-in">
  <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
    {/* Contenido con animación escalonada */}
  </div>
</div>
```

### Efectos Glass
```jsx
<div className="bg-white/90 backdrop-blur-md border border-sky-light/50">
  {/* Contenido con efecto cristal */}
</div>
```

### Gradientes de Texto
```jsx
<h1 className="gradient-text">
  {/* Texto con gradiente azul */}
</h1>
```

---

## 📱 Consideraciones Móviles

### Touch Targets
- Mínimo 44px de altura en elementos interactivos
- Espaciado adecuado entre elementos clickeables
- Áreas de toque extendidas en iconos pequeños

### Performance
- Lazy loading de componentes pesados
- Optimización de re-renders con React.memo
- Debounce en inputs de búsqueda

### UX Móvil
- Feedback visual inmediato en interacciones
- Estados de carga claros
- Navegación intuitiva con gestos
- Scroll suave y natural

---

Esta documentación cubre todos los componentes del sistema con ejemplos de uso, props, y consideraciones especiales para cada uno.

## 🍽️ Componentes de Servicios de Alimentación

### SnacksManagement
**Ubicación**: `src/pages/SnacksManagement.tsx`

#### Características
- **Panel de totales**: Ventas del día actual y ventas históricas
- **Gráficas de visualización**:
  - Gráfica de ventas por hora (AreaChart)
  - Gráfica comparativa semanal (BarChart)
  - Productos más vendidos (PieChart)
- **Métricas en tiempo real**: Actualización automática de datos
- **Interfaz cristalina**: Diseño con efectos glass y gradientes

#### Estructura de Datos
```typescript
interface SnackSale {
  id: string;
  product: string;
  quantity: number;
  price: number;
  timestamp: string;
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

#### Uso
```jsx
<SnacksManagement />
```

---

### StoreManagement
**Ubicación**: `src/pages/StoreManagement.tsx`

#### Características
- **Panel de métricas**: Total de ventas del día, semanal y productos vendidos
- **Datos numéricos y porcentuales**: Crecimiento y tendencias
- **Gráficas avanzadas**:
  - Ventas diarias (LineChart)
  - Tendencia semanal (BarChart)
- **Resumen de rendimiento**: Ticket promedio, productos por venta, crecimiento
- **Actualización en tiempo real**: Datos dinámicos con animaciones

#### Estructura de Datos
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
  dailyGrowth: number;
  weeklyGrowth: number;
}
```

#### Uso
```jsx
<StoreManagement />
```

---

### RestaurantManagement (Mejorado)
**Ubicación**: `src/pages/RestaurantManagement.tsx`

#### Nuevas Características
- **Etiquetas de identificación**: Cada mosaico muestra etiquetas identificativas
- **Interfaz mejorada**: Mejor organización visual de métricas
- **Nombre actualizado**: Cambio de "Restaurante Cristal" a "Restaurante Dios Padre"

#### Etiquetas Implementadas
```jsx
{/* Etiqueta de identificación */}
<div className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm border">
  {metric.title.split(' ')[0]}
</div>
```

---

## 🎨 Nuevos Estilos y Efectos

### Efectos Glass Mejorados
- **Backdrop blur**: Efectos de desenfoque de fondo más pronunciados
- **Gradientes cristalinos**: Nuevos gradientes con transparencias
- **Animaciones de brillo**: Efectos shimmer en barras de progreso
- **Bordes luminosos**: Bordes con efectos de luz y sombra

### Sistema de Colores Actualizado
```css
/* Nuevos colores para servicios de alimentación */
--snacks-primary: #C1E8FF;
--snacks-secondary: #7DA0CA;
--store-primary: #5483B3;
--store-secondary: #1B3B6F;
```

### Animaciones Avanzadas
- **Shimmer effect**: Animación de brillo en elementos interactivos
- **Pulse glow**: Efectos de pulso luminoso
- **Scale bounce**: Animaciones de escala con rebote
- **Staggered animations**: Animaciones escalonadas con delay

---

## 📊 Nuevos Componentes de Gráficas

### Gráfica de Ventas por Hora
```jsx
<AreaChart data={hourlySales}>
  <defs>
    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#5483B3" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#5483B3" stopOpacity={0.1} />
    </linearGradient>
  </defs>
  <Area 
    type="monotone" 
    dataKey="sales" 
    stroke="#5483B3" 
    strokeWidth={3}
    fillOpacity={1} 
    fill="url(#salesGradient)" 
  />
</AreaChart>
```

### Gráfica de Productos Más Vendidos
```jsx
<PieChart>
  <Pie
    data={topProducts}
    cx="50%"
    cy="50%"
    outerRadius={80}
    dataKey="quantity"
    label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
  >
    {topProducts.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
</PieChart>
```

### Gráfica de Tendencias Semanales
```jsx
<LineChart data={dailySalesData}>
  <Line 
    type="monotone" 
    dataKey="revenue" 
    stroke="#5483B3" 
    strokeWidth={3}
    dot={{ fill: '#5483B3', strokeWidth: 2, r: 4 }}
    activeDot={{ r: 6, fill: '#7DA0CA', stroke: '#5483B3', strokeWidth: 2 }}
  />
</LineChart>
```

---

## 🔧 Nuevas Utilidades y Helpers

### Generadores de Datos Mock
```typescript
// Generador de datos para snacks
const generateSnacksData = () => {
  const products = ['Papas', 'Refrescos', 'Helados', 'Dulces', 'Nachos'];
  // Lógica de generación...
};

// Generador de datos para tienda
const generateStoreData = () => {
  const products = [
    { name: 'Protector Solar', category: 'Cuidado Personal', price: 150 },
    { name: 'Toalla', category: 'Accesorios', price: 200 }
  ];
  // Lógica de generación...
};
```

### Calculadores de Métricas
```typescript
// Cálculo de crecimiento porcentual
const calculateGrowth = (current: number, previous: number): number => {
  return previous > 0 ? ((current - previous) / previous) * 100 : 0;
};

// Cálculo de ticket promedio
const calculateAverageTicket = (revenue: number, sales: number): number => {
  return sales > 0 ? revenue / sales : 0;
};
```

---

## 🎯 Mejoras de UX/UI

### Indicadores de Rendimiento
- **Badges de crecimiento**: Indicadores visuales de crecimiento positivo/negativo
- **Barras de progreso animadas**: Con efectos shimmer
- **Tooltips informativos**: Información contextual en gráficas
- **Estados de carga mejorados**: Spinners temáticos por módulo

### Responsive Design Mejorado
- **Grids adaptativos**: Layouts que se ajustan según el contenido
- **Tipografía escalable**: Tamaños de fuente que se adaptan al viewport
- **Espaciado inteligente**: Márgenes y padding que responden al dispositivo
- **Interacciones táctiles**: Elementos optimizados para touch

---

## 📱 Consideraciones Móviles Actualizadas

### Nuevos Breakpoints
```css
/* Breakpoints específicos para servicios de alimentación */
@media (max-width: 480px) {
  .snacks-card { padding: 1rem; }
  .store-metrics { grid-template-columns: 1fr; }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .restaurant-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### Optimizaciones Táctiles
- **Áreas de toque ampliadas**: Mínimo 44px en elementos interactivos
- **Feedback visual inmediato**: Respuesta instantánea a toques
- **Gestos intuitivos**: Soporte para swipe y pinch
- **Navegación simplificada**: Menos niveles de profundidad en móviles