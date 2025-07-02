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