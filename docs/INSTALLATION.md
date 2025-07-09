# 🚀 Guía de Instalación y Configuración

## 📋 Requisitos Previos

### Requisitos del Sistema
- **Node.js**: v18.0.0 o superior
- **npm**: v8.0.0 o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio
- **Editor de código**: VS Code recomendado

### Verificación de Requisitos
```bash
# Verificar versión de Node.js
node --version
# Debe mostrar v18.0.0 o superior

# Verificar versión de npm
npm --version
# Debe mostrar v8.0.0 o superior

# Verificar Git
git --version
```

---

## 📦 Instalación

### 1. Clonar el Repositorio
```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/balnearios-admin.git

# Navegar al directorio
cd balnearios-admin
```

### 2. Instalar Dependencias
```bash
# Instalar todas las dependencias
npm install

# O usando yarn (alternativo)
yarn install
```

### 3. Verificar Instalación
```bash
# Verificar que las dependencias se instalaron correctamente
npm list --depth=0
```

---

## ⚙️ Configuración del Entorno

### Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:

```bash
# .env
VITE_APP_NAME="Panel de Administración de Balnearios"
VITE_APP_VERSION="1.0.0"
VITE_API_URL="http://localhost:3001/api"
VITE_ENVIRONMENT="development"
```

### Configuración de VS Code (Recomendada)
Crear `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Extensiones Recomendadas para VS Code
Crear `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

---

## 🏃‍♂️ Ejecutar el Proyecto

### Modo Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# El proyecto estará disponible en:
# http://localhost:5173
```

### Modo Producción
```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Linting y Calidad de Código
```bash
# Ejecutar ESLint
npm run lint

# Corregir errores automáticamente
npm run lint:fix

# Verificar tipos TypeScript
npx tsc --noEmit
```

---

## 🔐 Configuración de Autenticación

### Cuentas Demo Disponibles

#### Administrador de Balneario 1
```
Email: admin1@example.com
Contraseña: password
Acceso: Acuático Paradise
```

#### Administrador de Balneario 2
```
Email: admin2@example.com
Contraseña: password
Acceso: Aqua Fun
```

#### Super Administrador
```
Email: superadmin@example.com
Contraseña: password
Acceso: Todos los balnearios + gestión de usuarios
```

### Flujo de Autenticación
1. Navegar a `http://localhost:5173/login`
2. Usar una de las cuentas demo
3. El sistema redirigirá automáticamente según el rol

---

## 🗂️ Estructura del Proyecto

```
balnearios-admin/
├── public/                 # Archivos estáticos
│   └── favicon.svg
├── src/                    # Código fuente
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas principales
│   ├── stores/            # Estado global (Zustand)
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Utilidades
│   ├── App.tsx            # Componente raíz
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── docs/                  # Documentación
├── .env                   # Variables de entorno
├── .gitignore            # Archivos ignorados por Git
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración Tailwind
├── tsconfig.json         # Configuración TypeScript
├── vite.config.ts        # Configuración Vite
└── README.md             # Documentación principal
```

---

## 🛠️ Scripts Disponibles

### Scripts de Desarrollo
```bash
# Servidor de desarrollo con hot reload
npm run dev

# Servidor de desarrollo en puerto específico
npm run dev -- --port 3000

# Servidor de desarrollo con host específico
npm run dev -- --host 0.0.0.0
```

### Scripts de Build
```bash
# Build para producción
npm run build

# Build con análisis de bundle
npm run build:analyze

# Limpiar directorio dist
npm run clean
```

### Scripts de Calidad
```bash
# Linting
npm run lint
npm run lint:fix

# Formateo de código
npm run format

# Verificación de tipos
npm run type-check
```

### Scripts de Testing (Preparados)
```bash
# Ejecutar tests
npm run test

# Tests en modo watch
npm run test:watch

# Coverage de tests
npm run test:coverage
```

---

## 🔧 Configuración Avanzada

### Configuración de Tailwind CSS
El proyecto incluye una configuración personalizada de Tailwind:

```javascript
// tailwind.config.js
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
        'midnight-blue': '#1B3B6F',
        // ... más colores
      }
    }
  }
}
```

### Configuración de TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

### Configuración de Vite
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
```

---

## 🐛 Solución de Problemas

### Problemas Comunes

#### Error: "Cannot find module"
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Port already in use"
```bash
# Usar puerto diferente
npm run dev -- --port 3000

# O matar proceso en puerto 5173
npx kill-port 5173
```

#### Error de TypeScript
```bash
# Verificar configuración TypeScript
npx tsc --noEmit

# Reiniciar servidor TypeScript en VS Code
Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

#### Problemas de Estilos Tailwind
```bash
# Verificar que Tailwind está compilando
npm run build

# Verificar configuración PostCSS
cat postcss.config.js
```

### Logs de Depuración
```bash
# Ejecutar con logs detallados
DEBUG=vite:* npm run dev

# Verificar configuración de Vite
npx vite --debug
```

---

## 🚀 Despliegue

### Build para Producción
```bash
# Crear build optimizado
npm run build

# Verificar build
npm run preview
```

### Variables de Entorno para Producción
```bash
# .env.production
VITE_APP_NAME="Panel de Administración de Balnearios"
VITE_API_URL="https://api.tudominio.com"
VITE_ENVIRONMENT="production"
```

### Despliegue en Netlify
```bash
# Build command
npm run build

# Publish directory
dist

# Redirects (_redirects file)
/*    /index.html   200
```

### Despliegue en Vercel
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📱 Testing en Dispositivos

### Testing Local en Móviles
```bash
# Servidor accesible desde red local
npm run dev -- --host 0.0.0.0

# Acceder desde móvil usando IP local
# http://192.168.1.100:5173
```

### Herramientas de Testing Responsivo
- **Chrome DevTools**: F12 > Toggle Device Toolbar
- **Firefox Responsive Design**: F12 > Responsive Design Mode
- **Safari Web Inspector**: Develop > Responsive Design Mode

---

## 🔄 Actualizaciones

### Actualizar Dependencias
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias específicas
npm install package@latest
```

### Mantener el Proyecto Actualizado
```bash
# Verificar versión actual
npm list balnearios-admin

# Actualizar a última versión
git pull origin main
npm install
```

---

## 📞 Soporte

### Recursos de Ayuda
- **Documentación**: `/docs` folder
- **Issues**: GitHub Issues
- **Discusiones**: GitHub Discussions

### Información del Sistema
```bash
# Información del entorno
npm run info

# Versiones de dependencias
npm list --depth=0

# Información de Node.js
node --version
npm --version
```

---

¡El proyecto está listo para usar! 🎉

Navega a `http://localhost:5173` y comienza a explorar el Panel de Administración de Balnearios.

---

## 🍽️ Nuevos Módulos de Servicios de Alimentación

### Acceso a los Nuevos Módulos

Una vez que el proyecto esté ejecutándose, puedes acceder a los nuevos módulos de servicios de alimentación:

#### Para Super Administradores
```
http://localhost:5173/superadmin/restaurant  # Restaurante Dios Padre
http://localhost:5173/superadmin/snacks      # Snacks Dios Padre  
http://localhost:5173/superadmin/store       # Tienda Dios Padre
```

### Navegación en la Aplicación

1. **Inicia sesión** con la cuenta de Super Admin:
   ```
   Email: superadmin@example.com
   Contraseña: password
   ```

2. **Navega al menú lateral** y busca "Servicios de Comida"

3. **Expande el submenú** para ver las opciones:
   - 🍽️ Restaurante
   - ☕ Snacks  
   - 🛍️ Tienda

### Funcionalidades Disponibles

#### Restaurante Dios Padre
- ✅ Gestión de notas diarias/semanales
- ✅ Métricas de mesas atendidas
- ✅ Ingresos y personas atendidas
- ✅ Etiquetas de identificación en métricas
- ✅ Interfaz cristalina mejorada

#### Snacks Dios Padre
- ✅ Panel de totales (día actual vs histórico)
- ✅ Gráfica de ventas por hora
- ✅ Gráfica comparativa semanal
- ✅ Productos más vendidos (pie chart)
- ✅ Métricas en tiempo real

#### Tienda Dios Padre
- ✅ Panel de métricas avanzadas
- ✅ Datos numéricos y porcentuales
- ✅ Gráficas de tendencias diarias/semanales
- ✅ Resumen de rendimiento
- ✅ Indicadores de crecimiento

---

## 🔧 Configuración Adicional para Nuevos Módulos

### Variables de Entorno Actualizadas

Si planeas integrar con APIs reales en el futuro, agrega estas variables a tu archivo `.env`:

```bash
# .env - Configuración para servicios de alimentación
VITE_RESTAURANT_API_URL="http://localhost:3001/api/restaurant"
VITE_SNACKS_API_URL="http://localhost:3001/api/snacks"
VITE_STORE_API_URL="http://localhost:3001/api/store"

# Configuración de actualización en tiempo real
VITE_REALTIME_INTERVAL=30000  # 30 segundos
VITE_ENABLE_REALTIME=true

# Configuración de gráficas
VITE_CHART_ANIMATION_DURATION=300
VITE_CHART_RESPONSIVE=true
```

### Configuración de Desarrollo

Para trabajar específicamente con los nuevos módulos:

```bash
# Ejecutar solo con los módulos de alimentación
npm run dev -- --mode=food-services

# Ejecutar con datos mock extendidos
npm run dev:mock-extended

# Ejecutar con métricas de desarrollo
npm run dev:metrics
```

### Configuración de Testing

Para probar los nuevos módulos:

```bash
# Tests específicos para servicios de alimentación
npm run test:food-services

# Tests de gráficas
npm run test:charts

# Tests de métricas
npm run test:metrics
```

---

## 📊 Datos de Prueba

### Generación de Datos Mock

Los nuevos módulos incluyen generadores de datos realistas:

#### Snacks
- **Productos**: Papas, Refrescos, Helados, Dulces, Nachos, Hot Dogs, Palomitas
- **Horarios**: 8:00 AM - 8:00 PM
- **Ventas diarias**: 20-70 transacciones
- **Precios**: $20 - $100 por producto

#### Tienda
- **Categorías**: Cuidado Personal, Accesorios, Juguetes, Calzado, Ropa
- **Productos**: Protector Solar, Toallas, Gafas, Flotadores, etc.
- **Ventas diarias**: 10-35 transacciones
- **Precios**: $80 - $300 por producto

#### Restaurante
- **Mesas**: 1-20
- **Capacidad**: 1-6 personas por mesa
- **Notas diarias**: 10-25 notas
- **Ticket promedio**: $200 - $1000

### Personalización de Datos

Para personalizar los datos de prueba, edita los archivos:

```
src/pages/SnacksManagement.tsx     # Línea 45: generateSnacksData()
src/pages/StoreManagement.tsx      # Línea 52: generateStoreData()
src/pages/RestaurantManagement.tsx # Línea 38: generateMockData()
```

---

## 🎨 Personalización de Temas

### Colores por Módulo

Cada módulo tiene su propia paleta de colores que puedes personalizar en:

```css
/* src/index.css - Líneas 850+ */

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

### Iconos Personalizados

Para cambiar los iconos de cada módulo, edita:

```typescript
// src/components/layout/Sidebar.tsx - Líneas 25-45
{
  path: '/superadmin/restaurant',
  icon: ChefHat,        // Cambiar aquí
  label: 'Restaurante',
},
{
  path: '/superadmin/snacks',
  icon: Coffee,         // Cambiar aquí
  label: 'Snacks',
},
{
  path: '/superadmin/store',
  icon: ShoppingBag,    // Cambiar aquí
  label: 'Tienda',
}
```

---

## 🚀 Optimización de Performance

### Configuración Recomendada para Desarrollo

```bash
# .env.development
VITE_ENABLE_DEVTOOLS=true
VITE_MOCK_DELAY=500           # Simular latencia de API
VITE_CHART_ANIMATIONS=true   # Habilitar animaciones
VITE_DEBUG_MODE=true         # Logs de desarrollo
```

### Configuración para Producción

```bash
# .env.production
VITE_ENABLE_DEVTOOLS=false
VITE_MOCK_DELAY=0
VITE_CHART_ANIMATIONS=true
VITE_DEBUG_MODE=false
VITE_OPTIMIZE_CHARTS=true
```

---

## 📱 Testing en Dispositivos

### Testing de Nuevos Módulos

Para probar los nuevos módulos en diferentes dispositivos:

```bash
# Servidor accesible desde red local
npm run dev -- --host 0.0.0.0

# Acceder desde móvil usando IP local
# http://192.168.1.100:5173/superadmin/snacks
# http://192.168.1.100:5173/superadmin/store
# http://192.168.1.100:5173/superadmin/restaurant
```

### Breakpoints de Testing

Los nuevos módulos están optimizados para:
- **Móvil**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### Funcionalidades Móviles
- ✅ Gráficas responsivas
- ✅ Tooltips adaptados
- ✅ Navegación táctil
- ✅ Métricas simplificadas
- ✅ Scroll horizontal en tablas

---

¡Los nuevos módulos de servicios de alimentación están listos para usar! 🍽️

Explora las funcionalidades de **Restaurante Dios Padre**, **Snacks Dios Padre** y **Tienda Dios Padre** para ver todas las métricas, gráficas y análisis disponibles.