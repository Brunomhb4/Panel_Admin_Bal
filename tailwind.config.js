/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '375px',      // Small phones
        'sm': '640px',      // Large phones
        'md': '768px',      // Small tablets
        'lg': '1024px',     // Large tablets/small laptops
        'xl': '1280px',     // Laptops
        '2xl': '1536px',    // Large screens
        // Custom breakpoints for specific devices
        'mobile-s': '320px',    // Small mobile
        'mobile-m': '375px',    // Medium mobile
        'mobile-l': '425px',    // Large mobile
        'tablet': '768px',      // Tablet
        'laptop': '1024px',     // Laptop
        'laptop-l': '1440px',   // Large laptop
        '4k': '2560px',         // 4K screens
        // Orientation-based breakpoints
        'portrait': {'raw': '(orientation: portrait)'},
        'landscape': {'raw': '(orientation: landscape)'},
        // Height-based breakpoints for better mobile experience
        'h-sm': {'raw': '(max-height: 600px)'},
        'h-md': {'raw': '(max-height: 800px)'},
        'h-lg': {'raw': '(min-height: 800px)'},
        // Aspect ratio breakpoints
        'aspect-square': {'raw': '(aspect-ratio: 1/1)'},
        'aspect-wide': {'raw': '(min-aspect-ratio: 16/9)'},
        'aspect-tall': {'raw': '(max-aspect-ratio: 9/16)'},
      },
      colors: {
        // Paleta de azules armoniosa
        // Paleta corporativa
        'theme-primary': '#021024',      // Azul muy oscuro (casi negro)
        'theme-secondary': '#052659',    // Azul marino profundo
        'theme-tertiary': '#1B3B6F',     // Azul medianoche clásico
        'theme-accent': '#5483B3',       // Azul cielo apagado
        'theme-highlight': '#7DA0CA',    // Azul grisáceo suave
        'theme-light': '#C1E8FF',        // Azul muy claro / celeste
        
        // Additional color aliases for compatibility
        'deep-navy': '#021024',          // Alias for theme-primary
        
        // CSS Variables para modo dinámico
        'theme-bg-primary': 'var(--theme-bg-primary)',
        'theme-bg-secondary': 'var(--theme-bg-secondary)',
        'theme-bg-tertiary': 'var(--theme-bg-tertiary)',
        'theme-text-primary': 'var(--theme-text-primary)',
        'theme-text-secondary': 'var(--theme-text-secondary)',
        'theme-text-muted': 'var(--theme-text-muted)',
        'theme-border': 'var(--theme-border)',
        'theme-shadow': 'var(--theme-shadow)',
        
        // Variaciones para diferentes usos
        primary: {
          50: 'var(--theme-light, #C1E8FF)',
          100: 'var(--theme-highlight, #7DA0CA)',
          200: 'var(--theme-accent, #5483B3)',
          300: 'var(--theme-tertiary, #1B3B6F)',
          400: 'var(--theme-secondary, #052659)',
          500: 'var(--theme-primary, #021024)',
          600: '#011020',
          700: '#010C1A',
          800: '#000814',
          900: '#000408',
        },
        
        // Colores de sistema manteniendo la armonía
        success: {
          50: '#E8F5E8',
          100: '#C3E6C3',
          200: '#9DD69D',
          300: '#77C677',
          400: '#51B651',
          500: '#2BA62B',
          600: '#228522',
          700: '#1A641A',
          800: '#114311',
          900: '#082208',
        },
        warning: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        // Ultra fine-grained spacing for mobile
        '0.25': '0.0625rem',
        '0.75': '0.1875rem',
        '1.25': '0.3125rem',
        '1.75': '0.4375rem',
        '2.25': '0.5625rem',
        '2.75': '0.6875rem',
        '3.25': '0.8125rem',
        '3.75': '0.9375rem',
        '4.25': '1.0625rem',
        '4.75': '1.1875rem',
        '5.25': '1.3125rem',
        '5.75': '1.4375rem',
        '6.25': '1.5625rem',
        '6.75': '1.6875rem',
        '7.25': '1.8125rem',
        '7.75': '1.9375rem',
        '8.25': '2.0625rem',
        '8.75': '2.1875rem',
        '9.25': '2.3125rem',
        '9.75': '2.4375rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(2, 16, 36, 0.1), 0 4px 6px -2px rgba(2, 16, 36, 0.05)',
        'medium': '0 4px 25px -5px rgba(2, 16, 36, 0.15), 0 10px 10px -5px rgba(2, 16, 36, 0.04)',
        'large': '0 10px 40px -10px rgba(2, 16, 36, 0.25), 0 20px 25px -5px rgba(2, 16, 36, 0.1)',
      },
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      maxWidth: {
        'xxs': '16rem',
        'xs': '20rem',
      },
      minHeight: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      }
    },
  },
  plugins: [],
};