import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import { useThemeStore } from '../../stores/themeStore';

interface ChartData {
  name: string;
  value: number;
  secondary?: number;
  [key: string]: any;
}

interface InteractiveChartProps {
  data: ChartData[];
  type?: 'area' | 'bar' | 'line';
  title: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  gradientId?: string;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  type = 'area',
  title,
  subtitle,
  height = 300,
  showGrid = true,
  showTooltip = true,
  gradientId = 'chartGradient',
  primaryColor,
  secondaryColor,
  className = ''
}) => {
  const { mode } = useThemeStore();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Use theme-aware colors if not provided
  const defaultPrimaryColor = primaryColor || (mode === 'dark' ? '#5483B3' : '#3B82F6');
  const defaultSecondaryColor = secondaryColor || (mode === 'dark' ? '#7DA0CA' : '#60A5FA');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-xl shadow-lg backdrop-blur-md border transition-all duration-300
                        ${mode === 'dark' 
                          ? 'bg-theme-bg-primary border-theme-border' 
                          : 'bg-white border-gray-200'
                        }`}>
          <p className={`font-medium text-sm mb-2
                        ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`font-semibold
                                      ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
              <span style={{ color: entry.color }}>●</span>
              {` ${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
      onMouseEnter: (_: any, index: number) => setActiveIndex(index),
      onMouseLeave: () => setActiveIndex(null)
    };

    const gridColor = mode === 'dark' ? 'rgba(193, 232, 255, 0.1)' : 'rgba(107, 114, 128, 0.2)';
    const textColor = mode === 'dark' ? '#7DA0CA' : '#6B7280';

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={defaultPrimaryColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={defaultPrimaryColor} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridColor}
                vertical={false}
              />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: textColor, 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: textColor, 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Bar 
              dataKey="value" 
              fill={`url(#${gradientId})`}
              radius={[4, 4, 0, 0]}
              stroke={defaultPrimaryColor}
              strokeWidth={1}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridColor}
                vertical={false}
              />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: textColor, 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: textColor, 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={defaultPrimaryColor}
              strokeWidth={3}
              dot={{ fill: defaultPrimaryColor, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: defaultSecondaryColor, stroke: defaultPrimaryColor, strokeWidth: 2 }}
            />
          </LineChart>
        );

      default: // area
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={defaultPrimaryColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={defaultPrimaryColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridColor}
                vertical={false}
              />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: textColor, 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: textColor, 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={defaultPrimaryColor}
              strokeWidth={3}
              fillOpacity={1} 
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className={`
      backdrop-blur-md rounded-xl p-6 border-2
      shadow-[0_4px_15px_rgba(0,0,0,0.15)] 
      hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]
      transition-all duration-300 ease-out
      hover:-translate-y-1
      group relative overflow-hidden
      ${mode === 'dark' 
        ? 'bg-theme-bg-primary border-theme-border' 
        : 'bg-white/90 border-gray-200'
      }
      ${className}
    `}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-6">
        <h3 className={`font-bold text-lg mb-1 transition-all duration-300 group-hover:scale-105 origin-left
                       ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`text-sm
                        ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="relative z-10" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
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

export default InteractiveChart;