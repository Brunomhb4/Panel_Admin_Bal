import React from 'react';
import { useThemeStore } from '../../stores/themeStore';

interface ProgressIndicatorProps {
  value: number;
  max: number;
  label: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  animated?: boolean;
  className?: string;
  format?: 'number' | 'percentage' | 'rating';
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max,
  label,
  showPercentage = true,
  size = 'md',
  variant = 'default',
  animated = true,
  className = '',
  format = 'number'
}) => {
  const { mode } = useThemeStore();
  const percentage = Math.min((value / max) * 100, 100);
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2 text-xs';
      case 'lg':
        return 'h-4 text-base';
      default:
        return 'h-3 text-sm';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return mode === 'dark' 
          ? 'from-green-600 to-green-700' 
          : 'from-green-500 to-green-600';
      case 'warning':
        return mode === 'dark' 
          ? 'from-yellow-600 to-orange-600' 
          : 'from-yellow-500 to-orange-500';
      case 'error':
        return mode === 'dark' 
          ? 'from-red-600 to-red-700' 
          : 'from-red-500 to-red-600';
      default:
        return mode === 'dark' 
          ? 'from-theme-accent to-theme-highlight' 
          : 'from-blue-500 to-indigo-500';
    }
  };

  const formatValue = () => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'rating':
        return `${value.toFixed(1)}/5`;
      default:
        return value.toLocaleString();
    }
  };

  const sizeClasses = getSizeClasses();
  const variantClasses = getVariantClasses();

  return (
    <div className={`w-full ${className}`}>
      {/* Label and Value */}
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className={`font-medium text-sm
                           ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
            {label}
          </span>
          <div className="flex items-center gap-2">
            <span className={`font-semibold text-sm
                             ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
              {formatValue()}
            </span>
            {showPercentage && format !== 'percentage' && (
              <span className={`text-xs
                               ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
                ({percentage.toFixed(1)}%)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className={`
        w-full rounded-full overflow-hidden shadow-inner border
        ${mode === 'dark' 
          ? 'bg-theme-bg-secondary border-theme-border/50' 
          : 'bg-gray-200 border-gray-300'
        }
        ${sizeClasses}
      `}>
        <div
          className={`
            ${sizeClasses} bg-gradient-to-r ${variantClasses}
            rounded-full transition-all duration-500 ease-out
            relative overflow-hidden
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ 
            width: `${percentage}%`,
            transition: animated ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-full"></div>
        </div>
      </div>

      {/* Additional Info */}
      {format !== 'percentage' && (
        <div className="flex justify-between items-center mt-1">
          <span className={`text-xs
                           ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
            0
          </span>
          <span className={`text-xs
                           ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
            {max.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;