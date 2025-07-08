/**
 * Component Style Configurations
 * Pre-built component styles using the theme system
 */

import { components, colors, gradients, shadows, borderRadius, spacing } from './theme';

// CSS-in-JS style objects for components
export const componentStyles = {
  // Dashboard Card Styles
  dashboardCard: {
    base: {
      background: components.card.background,
      backdropFilter: components.card.backdropFilter,
      border: components.card.border,
      borderRadius: components.card.borderRadius,
      padding: components.card.padding,
      boxShadow: components.card.shadow,
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    
    hover: {
      background: components.card.hover.background,
      border: components.card.hover.border,
      boxShadow: components.card.hover.shadow,
      transform: components.card.hover.transform,
    },
    
    variants: {
      primary: {
        background: `linear-gradient(145deg, ${colors.primary}10 0%, ${colors.secondary}05 100%)`,
        border: `1px solid ${colors.primary}30`,
      },
      accent: {
        background: `linear-gradient(145deg, ${colors.accent}10 0%, ${colors.highlight}05 100%)`,
        border: `1px solid ${colors.accent}30`,
      },
      light: {
        background: `linear-gradient(145deg, ${colors.light}15 0%, ${colors.highlight}10 100%)`,
        border: `1px solid ${colors.light}40`,
      }
    }
  },
  
  // Navigation Styles
  navigation: {
    sidebar: {
      background: components.navigation.background,
      backdropFilter: components.navigation.backdropFilter,
      border: components.navigation.border,
      height: '100vh',
      width: '280px',
      position: 'fixed' as const,
      left: 0,
      top: 0,
      zIndex: 1000,
    },
    
    item: {
      base: {
        display: 'flex',
        alignItems: 'center',
        padding: `${spacing[3]} ${spacing[4]}`,
        margin: `${spacing[1]} ${spacing[2]}`,
        borderRadius: borderRadius.lg,
        color: components.navigation.item.color,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      },
      
      hover: {
        background: components.navigation.item.hover.background,
        color: components.navigation.item.hover.color,
        transform: 'translateX(4px)',
      },
      
      active: {
        background: components.navigation.item.active.background,
        color: components.navigation.item.active.color,
        boxShadow: components.navigation.item.active.shadow,
        transform: 'scale(1.02)',
      }
    }
  },
  
  // Button Styles
  button: {
    primary: {
      ...components.button.primary,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 600,
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      
      '&:hover': components.button.primary.hover,
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: shadows.md,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none',
      }
    },
    
    secondary: {
      ...components.button.secondary,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 600,
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      
      '&:hover': components.button.secondary.hover,
    },
    
    ghost: {
      background: 'transparent',
      color: colors.accent,
      border: 'none',
      borderRadius: borderRadius.lg,
      padding: `${spacing[2]} ${spacing[4]}`,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      
      '&:hover': {
        background: `${colors.accent}10`,
        color: colors.highlight,
      }
    }
  },
  
  // Status Indicator Styles
  statusIndicator: {
    success: {
      ...components.status.success,
      padding: `${spacing[1]} ${spacing[3]}`,
      borderRadius: borderRadius.full,
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
    },
    
    warning: {
      ...components.status.warning,
      padding: `${spacing[1]} ${spacing[3]}`,
      borderRadius: borderRadius.full,
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
    },
    
    error: {
      ...components.status.error,
      padding: `${spacing[1]} ${spacing[3]}`,
      borderRadius: borderRadius.full,
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
    },
    
    info: {
      ...components.status.info,
      padding: `${spacing[1]} ${spacing[3]}`,
      borderRadius: borderRadius.full,
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
    }
  },
  
  // Loading Styles
  loading: {
    spinner: {
      primary: {
        width: '24px',
        height: '24px',
        border: `3px solid ${colors.light}20`,
        borderTop: `3px solid ${components.loading.spinner.primary}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      },
      
      large: {
        width: '48px',
        height: '48px',
        border: `4px solid ${colors.light}20`,
        borderTop: `4px solid ${components.loading.spinner.primary}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }
    },
    
    skeleton: {
      base: {
        background: components.loading.skeleton.background,
        borderRadius: borderRadius.md,
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      text: {
        height: '16px',
        marginBottom: spacing[2],
      },
      
      title: {
        height: '24px',
        marginBottom: spacing[3],
      },
      
      avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      }
    }
  },
  
  // Form Styles
  form: {
    input: {
      base: {
        width: '100%',
        padding: `${spacing[3]} ${spacing[4]}`,
        border: `2px solid ${colors.light}30`,
        borderRadius: borderRadius.lg,
        background: `rgba(255, 255, 255, 0.05)`,
        color: colors.light,
        fontSize: '14px',
        transition: 'all 0.3s ease',
        
        '&:focus': {
          outline: 'none',
          border: `2px solid ${colors.accent}60`,
          background: `rgba(255, 255, 255, 0.08)`,
          boxShadow: `0 0 0 3px ${colors.accent}20`,
        },
        
        '&::placeholder': {
          color: `${colors.light}60`,
        }
      },
      
      error: {
        border: `2px solid ${colors.semantic.error}60`,
        
        '&:focus': {
          border: `2px solid ${colors.semantic.error}80`,
          boxShadow: `0 0 0 3px ${colors.semantic.error}20`,
        }
      }
    },
    
    label: {
      display: 'block',
      marginBottom: spacing[2],
      color: colors.accent,
      fontSize: '14px',
      fontWeight: 600,
    },
    
    error: {
      color: colors.semantic.error,
      fontSize: '12px',
      marginTop: spacing[1],
    }
  },
  
  // Table Styles
  table: {
    container: {
      background: components.card.background,
      backdropFilter: components.card.backdropFilter,
      border: components.card.border,
      borderRadius: components.card.borderRadius,
      overflow: 'hidden',
      boxShadow: components.card.shadow,
    },
    
    header: {
      background: `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.highlight}10 100%)`,
      backdropFilter: 'blur(10px)',
    },
    
    headerCell: {
      padding: `${spacing[4]} ${spacing[6]}`,
      color: colors.accent,
      fontSize: '12px',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    
    row: {
      borderBottom: `1px solid ${colors.light}10`,
      transition: 'all 0.2s ease',
      
      '&:hover': {
        background: `${colors.accent}05`,
        backdropFilter: 'blur(10px)',
      }
    },
    
    cell: {
      padding: `${spacing[4]} ${spacing[6]}`,
      color: colors.light,
      fontSize: '14px',
    }
  }
};

// CSS keyframes for animations
export const keyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      transform: translateY(10px); 
      opacity: 0; 
    }
    to { 
      transform: translateY(0); 
      opacity: 1; 
    }
  }
  
  @keyframes scaleIn {
    from { 
      transform: scale(0.95); 
      opacity: 0; 
    }
    to { 
      transform: scale(1); 
      opacity: 1; 
    }
  }
`;

export default componentStyles;