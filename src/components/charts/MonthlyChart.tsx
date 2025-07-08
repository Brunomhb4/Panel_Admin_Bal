import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useThemeStore } from '../../stores/themeStore';
import { MonthlyStats } from '../../stores/waterParksStore';

interface MonthlyChartProps {
  data: MonthlyStats[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  const { mode } = useThemeStore();
  
  // Responsive configuration based on screen size
  const getResponsiveConfig = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    
    if (width < 375) {
      return {
        margin: { top: 5, right: 5, left: 0, bottom: 0 },
        fontSize: 8,
        hideYAxis: true,
        hideLegend: true
      };
    } else if (width < 640) {
      return {
        margin: { top: 8, right: 8, left: 0, bottom: 0 },
        fontSize: 9,
        hideYAxis: true,
        hideLegend: true
      };
    } else if (width < 768) {
      return {
        margin: { top: 10, right: 15, left: 0, bottom: 0 },
        fontSize: 10,
        hideYAxis: false,
        hideLegend: true
      };
    } else if (width < 1024) {
      return {
        margin: { top: 10, right: 20, left: 0, bottom: 0 },
        fontSize: 11,
        hideYAxis: false,
        hideLegend: false
      };
    } else {
      return {
        margin: { top: 10, right: 30, left: 0, bottom: 0 },
        fontSize: 12,
        hideYAxis: false,
        hideLegend: false
      };
    }
  };

  const config = getResponsiveConfig();
  
  // Theme-aware colors using exact palette
  const primaryColor = mode === 'dark' ? '#1B3B6F' : '#052659';
  const secondaryColor = mode === 'dark' ? '#5483B3' : '#7DA0CA';
  const gridColor = mode === 'dark' ? '#1B3B6F' : '#C1E8FF';
  const textColor = mode === 'dark' ? '#C1E8FF' : '#052659';

  return (
    <div className={`card floating-card transition-all duration-300
                    ${mode === 'dark' 
                      ? 'bg-gradient-to-br from-[#052659]/80 to-[#1B3B6F]/60 border-[#C1E8FF]/20' 
                      : 'bg-white/95 border-gray-200 shadow-lg'
                    }
                    h-48
                    xs:h-56
                    sm:h-64
                    md:h-72
                    lg:h-80
                    xl:h-96`}>
      <h3 className={`font-bold transition-colors duration-300
                     ${mode === 'dark' ? 'gradient-text' : 'text-gray-900'}
                     text-sm mb-3
                     xs:text-base xs:mb-4
                     sm:text-lg sm:mb-4
                     md:text-xl md:mb-5
                     lg:text-2xl lg:mb-6
                     xl:text-2xl xl:mb-8`}>
        Ventas Mensuales
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={config.margin}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} opacity={0.4} />
          <XAxis 
            dataKey="month" 
            tick={{ 
              fontSize: config.fontSize, 
              fill: textColor, 
              fontWeight: 600 
            }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            orientation="left"
            tick={{ 
              fontSize: config.fontSize, 
              fill: textColor, 
              fontWeight: 600 
            }}
            axisLine={false}
            tickLine={false}
            hide={config.hideYAxis}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ 
              fontSize: config.fontSize, 
              fill: textColor, 
              fontWeight: 600 
            }}
            domain={[0, 'dataMax + 50000']}
            axisLine={false}
            tickLine={false}
            hide={config.hideYAxis}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
              border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
              borderRadius: typeof window !== 'undefined' && window.innerWidth < 640 ? '12px' : '16px',
              color: mode === 'dark' ? '#C1E8FF' : '#021024',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 10px 40px ${mode === 'dark' ? 'rgba(2, 16, 36, 0.3)' : 'rgba(2, 16, 36, 0.15)'}`,
              fontWeight: 600,
              fontSize: config.fontSize
            }}
          />
          {!config.hideLegend && <Legend />}
          <Bar 
            yAxisId="left"
            dataKey="tickets" 
            name="Tickets" 
            fill={primaryColor} 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            yAxisId="right"
            dataKey="revenue" 
            name="Ingresos ($)" 
            fill={secondaryColor} 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;