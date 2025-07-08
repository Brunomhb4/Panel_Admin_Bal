import React from 'react';
import { LucideIcon } from 'lucide-react';

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
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'bg-gradient-to-br from-theme-bg-secondary/80 to-theme-bg-tertiary/60',
          border: 'border-theme-accent/30',
          iconBg: 'bg-gradient-to-br from-theme-accent to-theme-highlight',
          iconColor: 'text-white'
        };
      case 'accent':
        return {
          background: 'bg-gradient-to-br from-theme-accent/10 to-theme-highlight/20',
          border: 'border-theme-highlight/40',
          iconBg: 'bg-gradient-to-br from-theme-highlight to-theme-light',
          iconColor: 'text-theme-bg-primary'
        };
      case 'highlight':
        return {
          background: 'bg-gradient-to-br from-theme-highlight/15 to-theme-light/25',
          border: 'border-theme-light/50',
          iconBg: 'bg-gradient-to-br from-theme-light to-white',
          iconColor: 'text-theme-bg-tertiary'
        };
      default:
        return {
          background: 'bg-theme-bg-primary',
          border: 'border-theme-border',
          iconBg: 'bg-gradient-to-br from-theme-bg-tertiary to-theme-accent',
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
            <h3 className="text-theme-text-secondary font-medium text-sm mb-1 transition-colors duration-300">
              {title}
            </h3>
            {subtitle && (
              <p className="text-theme-text-muted text-xs">
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
          <div className="text-theme-text-primary font-bold text-2xl lg:text-3xl mb-2 transition-all duration-300 group-hover:scale-105 origin-left">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {/* Trend Indicator */}
          {trend && (
            <div className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
              ${trend.isPositive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
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
          <div className="border-t border-theme-border/50 pt-4">
            {children}
          </div>
        )}
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-theme-accent/5 to-theme-highlight/5 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default DashboardCard;