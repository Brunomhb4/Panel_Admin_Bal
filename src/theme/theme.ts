/**
 * Professional Dark Mode Theme Configuration
 * Implements a comprehensive design system with the specified blue color palette
 */

// Core Color Palette - Exact colors as specified
export const colors = {
  // Primary Colors
  primary: '#021024',      // Very dark blue, almost black
  secondary: '#052659',    // Deep navy blue
  tertiary: '#1B3B6F',     // Classic midnight blue
  accent: '#5483B3',       // Muted sky blue
  highlight: '#7DA0CA',    // Soft grayish blue
  light: '#C1E8FF',        // Very light blue/cyan
  
  // Extended palette for variations
  palette: {
    primary: {
      50: '#E6F0FF',
      100: '#CCE1FF',
      200: '#99C3FF',
      300: '#66A5FF',
      400: '#3387FF',
      500: '#1B3B6F',
      600: '#052659',
      700: '#021024',
      800: '#010C1A',
      900: '#000814',
    },
    accent: {
      50: '#F0F7FF',
      100: '#E1EFFF',
      200: '#C1E8FF',
      300: '#7DA0CA',
      400: '#5483B3',
      500: '#4A7BA7',
      600: '#3D6B8D',
      700: '#2F5A73',
      800: '#224859',
      900: '#14363F',
    }
  },
  
  // Semantic colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Neutral colors for dark theme
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  }
} as const;

// Typography System
export const typography = {
  fontFamily: {
    primary: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
} as const;

// Spacing System (8px base)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Shadow System
export const shadows = {
  none: 'none',
  sm: `0 1px 2px 0 ${colors.primary}10`,
  base: `0 1px 3px 0 ${colors.primary}12, 0 1px 2px 0 ${colors.primary}06`,
  md: `0 4px 6px -1px ${colors.primary}10, 0 2px 4px -1px ${colors.primary}06`,
  lg: `0 10px 15px -3px ${colors.primary}10, 0 4px 6px -2px ${colors.primary}05`,
  xl: `0 20px 25px -5px ${colors.primary}10, 0 10px 10px -5px ${colors.primary}04`,
  '2xl': `0 25px 50px -12px ${colors.primary}25`,
  inner: `inset 0 2px 4px 0 ${colors.primary}06`,
  
  // Glow effects for interactive elements
  glow: {
    primary: `0 0 20px ${colors.primary}40`,
    accent: `0 0 20px ${colors.accent}40`,
    highlight: `0 0 20px ${colors.highlight}40`,
  }
} as const;

// Background Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.tertiary} 100%)`,
  accent: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.highlight} 100%)`,
  light: `linear-gradient(135deg, ${colors.highlight} 0%, ${colors.light} 100%)`,
  
  // Complex gradients for backgrounds
  dashboard: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 25%, ${colors.tertiary} 75%, ${colors.accent} 100%)`,
  card: `linear-gradient(145deg, ${colors.light}15 0%, ${colors.highlight}10 100%)`,
  overlay: `linear-gradient(180deg, ${colors.primary}00 0%, ${colors.primary}80 100%)`,
  
  // Subtle gradients for components
  subtle: {
    primary: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}10 100%)`,
    accent: `linear-gradient(135deg, ${colors.accent}05 0%, ${colors.highlight}10 100%)`,
  }
} as const;

// Component Styling Configuration
export const components = {
  // Dashboard Cards
  card: {
    background: `rgba(255, 255, 255, 0.02)`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${colors.light}20`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    shadow: shadows.lg,
    
    hover: {
      background: `rgba(255, 255, 255, 0.05)`,
      border: `1px solid ${colors.accent}40`,
      shadow: shadows.xl,
      transform: 'translateY(-2px)',
    }
  },
  
  // Navigation Elements
  navigation: {
    background: `rgba(${colors.primary.slice(1)}, 0.95)`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${colors.light}10`,
    
    item: {
      background: 'transparent',
      color: colors.light,
      hover: {
        background: `${colors.accent}20`,
        color: colors.light,
      },
      active: {
        background: gradients.accent,
        color: '#ffffff',
        shadow: shadows.glow.accent,
      }
    }
  },
  
  // Interactive Components
  button: {
    primary: {
      background: gradients.primary,
      color: '#ffffff',
      border: 'none',
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
      shadow: shadows.md,
      
      hover: {
        background: gradients.secondary,
        shadow: shadows.lg,
        transform: 'translateY(-1px)',
      }
    },
    
    secondary: {
      background: 'transparent',
      color: colors.accent,
      border: `1px solid ${colors.accent}40`,
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
      
      hover: {
        background: `${colors.accent}10`,
        border: `1px solid ${colors.accent}60`,
      }
    }
  },
  
  // Status Indicators
  status: {
    success: {
      background: `${colors.semantic.success}20`,
      color: colors.semantic.success,
      border: `1px solid ${colors.semantic.success}40`,
    },
    warning: {
      background: `${colors.semantic.warning}20`,
      color: colors.semantic.warning,
      border: `1px solid ${colors.semantic.warning}40`,
    },
    error: {
      background: `${colors.semantic.error}20`,
      color: colors.semantic.error,
      border: `1px solid ${colors.semantic.error}40`,
    },
    info: {
      background: `${colors.accent}20`,
      color: colors.accent,
      border: `1px solid ${colors.accent}40`,
    }
  },
  
  // Loading States
  loading: {
    spinner: {
      primary: colors.accent,
      secondary: colors.highlight,
      background: `${colors.light}20`,
    },
    skeleton: {
      background: `${colors.light}10`,
      highlight: `${colors.light}20`,
    }
  }
} as const;

// Chart Theme Configuration
export const chartTheme = {
  // Color schemes for different chart types
  colors: {
    primary: [colors.accent, colors.highlight, colors.light],
    secondary: [colors.primary, colors.secondary, colors.tertiary],
    mixed: [colors.accent, colors.highlight, colors.tertiary, colors.secondary],
    
    // Specific color arrays for multi-series charts
    series: [
      colors.accent,
      colors.highlight,
      colors.tertiary,
      colors.secondary,
      colors.light,
      colors.primary,
    ]
  },
  
  // Chart-specific configurations
  area: {
    fill: {
      gradient: {
        from: `${colors.accent}80`,
        to: `${colors.accent}10`,
      }
    },
    stroke: {
      color: colors.accent,
      width: 3,
    }
  },
  
  bar: {
    fill: colors.accent,
    stroke: colors.highlight,
    radius: 4,
  },
  
  line: {
    stroke: {
      color: colors.accent,
      width: 3,
    },
    point: {
      fill: colors.highlight,
      stroke: colors.accent,
      radius: 4,
    }
  },
  
  pie: {
    colors: [
      colors.accent,
      colors.highlight,
      colors.tertiary,
      colors.secondary,
      colors.light,
    ]
  },
  
  // Grid and axis styling
  grid: {
    stroke: `${colors.light}20`,
    strokeDasharray: '3 3',
  },
  
  axis: {
    stroke: `${colors.light}30`,
    tick: {
      fill: colors.light,
      fontSize: typography.fontSize.sm,
      fontFamily: typography.fontFamily.primary.join(', '),
    },
    label: {
      fill: colors.accent,
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.primary.join(', '),
    }
  },
  
  // Tooltip styling
  tooltip: {
    background: `rgba(${colors.primary.slice(1)}, 0.95)`,
    border: `1px solid ${colors.light}30`,
    borderRadius: borderRadius.lg,
    color: colors.light,
    shadow: shadows.xl,
    backdropFilter: 'blur(20px)',
  },
  
  // Legend styling
  legend: {
    color: colors.light,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.primary.join(', '),
  }
} as const;

// Responsive Breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Animation Configuration
export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    }
  }
} as const;

// Theme Configuration Object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
  components,
  chartTheme,
  breakpoints,
  animations,
} as const;

// Type definitions for TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof colors;
export type ThemeTypography = typeof typography;
export type ThemeSpacing = typeof spacing;
export type ThemeComponents = typeof components;
export type ChartTheme = typeof chartTheme;

// Utility functions for theme usage
export const themeUtils = {
  // Get color with opacity
  withOpacity: (color: string, opacity: number): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
  
  // Get responsive value
  responsive: (values: Record<string, any>, breakpoint: keyof typeof breakpoints) => {
    return values[breakpoint] || values.base || values.default;
  },
  
  // Generate CSS custom properties
  toCSSProperties: () => {
    const cssVars: Record<string, string> = {};
    
    // Colors
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        cssVars[`--color-${key}`] = value;
      }
    });
    
    // Spacing
    Object.entries(spacing).forEach(([key, value]) => {
      cssVars[`--spacing-${key}`] = value;
    });
    
    // Border radius
    Object.entries(borderRadius).forEach(([key, value]) => {
      cssVars[`--radius-${key}`] = value;
    });
    
    return cssVars;
  }
};

export default theme;