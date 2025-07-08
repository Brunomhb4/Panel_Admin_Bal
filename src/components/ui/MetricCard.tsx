import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    period: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  format?: 'number' | 'currency' | 'percentage';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  size = 'md',
  className = '',
  format = 'number'
}) => {
  const { mode } = useThemeStore();

  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      background: mode === 'dark' 
        ? 'bg-gradient-to-br from-theme-bg-secondary/90 to-theme-bg-tertiary/70' 
        : 'bg-white/90',
      border: mode === 'dark' ? 'border-theme-border' : 'border-gray-200',
      text: mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900',
      subtitle: mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-bg-secondary/90 to-theme-bg-tertiary/70' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50',
          border: mode === 'dark' ? 'border-theme-accent/40' : 'border-blue-200',
          iconBg: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-accent to-theme-highlight' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-600',
          iconColor: 'text-white',
          glowColor: mode === 'dark' 
            ? 'shadow-[0_0_20px_rgba(84,131,179,0.3)]' 
            : 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
        };
      case 'accent':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-accent/15 to-theme-highlight/25' 
            : 'bg-gradient-to-br from-purple-50 to-violet-50',
          border: mode === 'dark' ? 'border-theme-highlight/50' : 'border-purple-200',
          iconBg: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-highlight to-theme-light' 
            : 'bg-gradient-to-br from-purple-600 to-violet-600',
          iconColor: mode === 'dark' ? 'text-theme-bg-primary' : 'text-white',
          glowColor: mode === 'dark' 
            ? 'shadow-[0_0_20px_rgba(125,160,202,0.3)]' 
            : 'shadow-[0_0_20px_rgba(147,51,234,0.3)]'
        };
      case 'success':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-green-900/20 to-green-800/30' 
            : 'bg-gradient-to-br from-green-50 to-emerald-50',
          border: mode === 'dark' ? 'border-green-700/50' : 'border-green-200',
          iconBg: 'bg-gradient-to-br from-green-600 to-emerald-600',
          iconColor: 'text-white',
          text: mode === 'dark' ? 'text-green-200' : 'text-green-800',
          glowColor: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]'
        };
      case 'warning':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-yellow-900/20 to-orange-800/30' 
            : 'bg-gradient-to-br from-yellow-50 to-orange-50',
          border: mode === 'dark' ? 'border-yellow-700/50' : 'border-yellow-200',
          iconBg: 'bg-gradient-to-br from-yellow-600 to-orange-600',
          iconColor: 'text-white',
          text: mode === 'dark' ? 'text-yellow-200' : 'text-yellow-800',
          glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]'
        };
      case 'error':
        return {
          ...baseStyles,
          background: mode === 'dark' 
            ? 'bg-gradient-to-br from-red-900/20 to-red-800/30' 
            : 'bg-gradient-to-br from-red-50 to-red-50',
          border: mode === 'dark' ? 'border-red-700/50' : 'border-red-200',
          iconBg: 'bg-gradient-to-br from-red-600 to-red-700',
          iconColor: 'text-white',
          text: mode === 'dark' ? 'text-red-200' : 'text-red-800',
          glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
        };
      default:
        return {
          ...baseStyles,
          iconBg: mode === 'dark' 
            ? 'bg-gradient-to-br from-theme-bg-tertiary to-theme-accent' 
            : 'bg-gradient-to-br from-gray-600 to-gray-700',
          iconColor: 'text-white',
          glowColor: mode === 'dark' 
            ? 'shadow-[0_0_20px_rgba(27,59,111,0.2)]' 
            : 'shadow-[0_0_20px_rgba(107,114,128,0.2)]'
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-4',
          icon: 'p-2 h-5 w-5',
          title: 'text-xs',
          value: 'text-lg',
          subtitle: 'text-xs'
        };
      case 'lg':
        return {
          container: 'p-8',
          icon: 'p-4 h-8 w-8',
          title: 'text-base',
          value: 'text-4xl',
          subtitle: 'text-sm'
        };
      default:
        return {
          container: 'p-6',
          icon: 'p-3 h-6 w-6',
          title: 'text-sm',
          value: 'text-2xl lg:text-3xl',
          subtitle: 'text-sm'
        };
    }
  };

  const styles = getVariantStyles();
  const sizeClasses = getSizeClasses();

  return (
    <div className={`
      ${styles.background} ${styles.border}
      backdrop-blur-md border-2 rounded-xl ${sizeClasses.container}
      ${styles.glowColor}
      hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
      transition-all duration-300 ease-out
      hover:-translate-y-1 hover:scale-[1.02]
      group relative overflow-hidden
      ${className}
    `}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`${styles.subtitle} font-semibold ${sizeClasses.title} mb-1 transition-colors duration-300`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'} ${sizeClasses.subtitle}`}>
                {subtitle}
              </p>
            )}
          </div>
          
          {Icon && (
            <div className={`
              ${styles.iconBg} ${styles.iconColor}
              ${sizeClasses.icon} rounded-xl shadow-lg
              transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
              relative overflow-hidden flex items-center justify-center
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Icon className={`${sizeClasses.icon.split(' ')[2]} ${sizeClasses.icon.split(' ')[3]} relative z-10 drop-shadow-sm`} />
            </div>
          )}
        </div>

        {/* Main Value */}
        <div className="mb-3">
          <div className={`
            ${styles.text} font-bold ${sizeClasses.value} 
            transition-all duration-300 group-hover:scale-105 origin-left
          `}>
            {formatValue(value)}
          </div>
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center gap-2">
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
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </div>
            <span className={`text-xs ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
              vs {trend.period}
            </span>
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

export default MetricCard;