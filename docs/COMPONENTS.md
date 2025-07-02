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