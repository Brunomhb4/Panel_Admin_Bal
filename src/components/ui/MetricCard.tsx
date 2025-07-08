import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

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
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'bg-gradient-to-br from-theme-bg-secondary/90 to-theme-bg-tertiary/70',
          border: 'border-theme-accent/40',
          iconBg: 'bg-gradient-to-br from-theme-accent to-theme-highlight',
          iconColor: 'text-white',
          valueColor: 'text-theme-text-primary',
          glowColor: 'shadow-[0_0_20px_rgba(84,131,179,0.3)]'
        };
      case 'accent':
        return {
          background: 'bg-gradient-to-br from-theme-accent/15 to-theme-highlight/25',
          border: 'border-theme-highlight/50',
          iconBg: 'bg-gradient-to-br from-theme-highlight to-theme-light',
          iconColor: 'text-theme-bg-primary',
          valueColor: 'text-theme-text-primary',
          glowColor: 'shadow-[0_0_20px_rgba(125,160,202,0.3)]'
        };
      case 'success':
        return {
          background: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30',
          border: 'border-green-200 dark:border-green-700/50',
          iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
          iconColor: 'text-white',
          valueColor: 'text-green-800 dark:text-green-200',
          glowColor: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]'
        };
      case 'warning':
        return {
          background: 'bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/30',
          border: 'border-yellow-200 dark:border-yellow-700/50',
          iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
          iconColor: 'text-white',
          valueColor: 'text-yellow-800 dark:text-yellow-200',
          glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]'
        };
      case 'error':
        return {
          background: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30',
          border: 'border-red-200 dark:border-red-700/50',
          iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
          iconColor: 'text-white',
          valueColor: 'text-red-800 dark:text-red-200',
          glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
        };
      default:
        return {
          background: 'bg-theme-bg-primary',
          border: 'border-theme-border',
          iconBg: 'bg-gradient-to-br from-theme-bg-tertiary to-theme-accent',
          iconColor: 'text-white',
          valueColor: 'text-theme-text-primary',
          glowColor: 'shadow-[0_0_20px_rgba(27,59,111,0.2)]'
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
            <h3 className={`text-theme-text-secondary font-semibold ${sizeClasses.title} mb-1 transition-colors duration-300`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-theme-text-muted ${sizeClasses.subtitle}`}>
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
            ${styles.valueColor} font-bold ${sizeClasses.value} 
            transition-all duration-300 group-hover:scale-105 origin-left
          `}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center gap-2">
            <div className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
              ${trend.isPositive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }
            `}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </div>
            <span className="text-theme-text-muted text-xs">
              vs {trend.period}
            </span>
          </div>
        )}
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r ${styles.iconBg.replace('bg-gradient-to-br', 'from-transparent via-current/5 to-transparent')} rounded-xl animate-pulse`}></div>
      </div>
    </div>
  );
};

export default MetricCard;