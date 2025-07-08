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
  primaryColor = '#5483B3',
  secondaryColor = '#7DA0CA',
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-theme-bg-primary border border-theme-border rounded-xl p-4 shadow-lg backdrop-blur-md">
          <p className="text-theme-text-secondary font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-theme-text-primary font-semibold">
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

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--theme-border)" 
                opacity={0.5}
                vertical={false}
              />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'var(--theme-text-muted)', 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'var(--theme-text-muted)', 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Bar 
              dataKey="value" 
              fill={`url(#${gradientId})`}
              radius={[4, 4, 0, 0]}
              stroke={primaryColor}
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
                stroke="var(--theme-border)" 
                opacity={0.5}
                vertical={false}
              />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'var(--theme-text-muted)', 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'var(--theme-text-muted)', 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={primaryColor}
              strokeWidth={3}
              dot={{ fill: primaryColor, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: secondaryColor, stroke: primaryColor, strokeWidth: 2 }}
            />
          </LineChart>
        );

      default: // area
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--theme-border)" 
                opacity={0.5}
                vertical={false}
              />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'var(--theme-text-muted)', 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'var(--theme-text-muted)', 
                fontSize: 12, 
                fontWeight: 600 
              }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={primaryColor}
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
      bg-theme-bg-primary border border-theme-border
      backdrop-blur-md rounded-xl p-6 
      shadow-[0_4px_15px_rgba(0,0,0,0.15)] 
      hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]
      transition-all duration-300 ease-out
      hover:-translate-y-1
      group relative overflow-hidden
      ${className}
    `}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-6">
        <h3 className="text-theme-text-primary font-bold text-lg mb-1 transition-all duration-300 group-hover:scale-105 origin-left">
          {title}
        </h3>
        {subtitle && (
          <p className="text-theme-text-muted text-sm">
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
        <div className="absolute inset-0 bg-gradient-to-r from-theme-accent/5 to-theme-highlight/5 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default InteractiveChart;