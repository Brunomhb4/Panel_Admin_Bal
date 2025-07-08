import React from 'react';

interface ProgressIndicatorProps {
  value: number;
  max: number;
  label: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  animated?: boolean;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max,
  label,
  showPercentage = true,
  size = 'md',
  variant = 'default',
  animated = true,
  className = ''
}) => {
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
        return 'from-green-500 to-green-600';
      case 'warning':
        return 'from-yellow-500 to-orange-500';
      case 'error':
        return 'from-red-500 to-red-600';
      default:
        return 'from-theme-accent to-theme-highlight';
    }
  };

  const sizeClasses = getSizeClasses();
  const variantClasses = getVariantClasses();

  return (
    <div className={`w-full ${className}`}>
      {/* Label and Value */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-theme-text-secondary font-medium text-sm">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-theme-text-primary font-semibold text-sm">
            {value.toLocaleString()}
          </span>
          {showPercentage && (
            <span className="text-theme-text-muted text-xs">
              ({percentage.toFixed(1)}%)
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`
        w-full bg-theme-bg-secondary rounded-full overflow-hidden
        shadow-inner border border-theme-border/50
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
      <div className="flex justify-between items-center mt-1">
        <span className="text-theme-text-muted text-xs">
          0
        </span>
        <span className="text-theme-text-muted text-xs">
          {max.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;