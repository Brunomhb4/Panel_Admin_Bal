import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'accent' | 'highlight';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  children,
  className = '',
  variant = 'default'
}) => {
  const { mode } = useThemeStore();

  const getVariantStyles = () => {
    const baseStyles = mode === 'dark' 
      ? {
          background: 'bg-gradient-to-br from-theme-bg-secondary/80 to-theme-bg-tertiary/60',
          border: 'border-theme-border',
          text: 'text-theme-text-primary'
        }
      : {
          background: 'bg-white/90',
          border: 'border-gray-200',
          text: 'text-gray-900'
        };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-bg-secondary/80 to-theme-bg-tertiary/60' 
            : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60',
          border: mode === 'dark' ? 'border-theme-accent/30' : 'border-blue-200/50',
          iconBg: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-accent to-theme-highlight' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-600',
          iconColor: 'text-white'
        };
      case 'accent':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-accent/10 to-theme-highlight/20' 
            : 'bg-gradient-to-br from-purple-50/80 to-violet-50/60',
          border: mode === 'dark' ? 'border-theme-highlight/40' : 'border-purple-200/50',
          iconBg: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-highlight to-theme-light' 
            : 'bg-gradient-to-br from-purple-600 to-violet-600',
          iconColor: mode === 'dark' ? 'text-theme-bg-primary' : 'text-white'
        };
      case 'highlight':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-highlight/15 to-theme-light/25' 
            : 'bg-gradient-to-br from-orange-50/80 to-amber-50/60',
          border: mode === 'dark' ? 'border-theme-light/50' : 'border-orange-200/50',
          iconBg: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-light to-white' 
            : 'bg-gradient-to-br from-orange-600 to-amber-600',
          iconColor: mode === 'dark' ? 'text-theme-bg-tertiary' : 'text-white'
        };
      default:
        return {
          ...baseStyles,
          iconBg: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-bg-tertiary to-theme-accent' 
            : 'bg-gradient-to-br from-gray-600 to-gray-700',
          iconColor: 'text-white'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`
      ${styles.background} ${styles.border}
      backdrop-blur-md border-2 rounded-xl p-6 
      shadow-[0_4px_15px_rgba(0,0,0,0.15)] 
      hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]
      transition-all duration-300 ease-out
      hover:-translate-y-1 hover:scale-[1.02]
      group relative overflow-hidden
      ${className}
    `}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'} font-medium text-sm mb-1 transition-colors duration-300`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'} text-xs`}>
                {subtitle}
              </p>
            )}
          </div>
          
          {Icon && (
            <div className={`
              ${styles.iconBg} ${styles.iconColor}
              p-3 rounded-xl shadow-lg
              transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
              relative overflow-hidden
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Icon className="h-6 w-6 relative z-10 drop-shadow-sm" />
            </div>
          )}
        </div>

        {/* Main Value */}
        <div className="mb-4">
          <div className={`${styles.text} font-bold text-2xl lg:text-3xl mb-2 transition-all duration-300 group-hover:scale-105 origin-left`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {/* Trend Indicator */}
          {trend && (
            <div className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
              ${trend.isPositive 
                ? mode === 'dark' 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-green-100 text-green-800'
                : mode === 'dark' 
                  ? 'bg-red-900/30 text-red-400' 
                  : 'bg-red-100 text-red-800'
              }
            `}>
              <span className={`mr-1 ${trend.isPositive ? '↗' : '↘'}`}>
                {trend.isPositive ? '↗' : '↘'}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        {/* Additional Content */}
        {children && (
          <div className={`border-t pt-4 ${mode === 'dark' ? 'border-theme-border/50' : 'border-gray-200/50'}`}>
            {children}
          </div>
        )}
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 rounded-xl animate-pulse
                        ${mode === 'dark' 
                          ? 'bg-gradient-to-r from-theme-accent/5 to-theme-highlight/5' 
                          : 'bg-gradient-to-r from-blue-500/5 to-indigo-500/5'
                        }`}></div>
      </div>
    </div>
  );
};

export default DashboardCard;