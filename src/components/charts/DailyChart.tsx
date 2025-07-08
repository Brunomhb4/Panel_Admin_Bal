import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useThemeStore } from '../../stores/themeStore';
import { DailyStats } from '../../stores/waterParksStore';

interface DailyChartProps {
  data: DailyStats[];
}

const DailyChart: React.FC<DailyChartProps> = ({ data }) => {
  const { mode } = useThemeStore();
  
  // Format the data for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('es-MX', {
      weekday: 'short',
      day: 'numeric'
    })
  }));

  // Responsive configuration based on screen size
  const getResponsiveConfig = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    
    if (width < 375) {
      return {
        margin: { top: 5, right: 5, left: 0, bottom: 0 },
        fontSize: 8,
        strokeWidth: 1.5,
        hideYAxis: true,
        hideXAxisTicks: true
      };
    } else if (width < 640) {
      return {
        margin: { top: 8, right: 8, left: 0, bottom: 0 },
        fontSize: 9,
        strokeWidth: 2,
        hideYAxis: true,
        hideXAxisTicks: false
      };
    } else if (width < 768) {
      return {
        margin: { top: 10, right: 15, left: 0, bottom: 0 },
        fontSize: 10,
        strokeWidth: 2,
        hideYAxis: false,
        hideXAxisTicks: false
      };
    } else if (width < 1024) {
      return {
        margin: { top: 10, right: 20, left: 0, bottom: 0 },
        fontSize: 11,
        strokeWidth: 2.5,
        hideYAxis: false,
        hideXAxisTicks: false
      };
    } else {
      return {
        margin: { top: 10, right: 30, left: 0, bottom: 0 },
        fontSize: 12,
        strokeWidth: 3,
        hideYAxis: false,
        hideXAxisTicks: false
      };
    }
  };

  const config = getResponsiveConfig();

  // Theme-aware colors using exact palette
  const primaryColor = mode === 'dark' ? '#5483B3' : '#1B3B6F';
  const secondaryColor = mode === 'dark' ? '#7DA0CA' : '#5483B3';
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
        Ventas Semanales
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={formattedData}
          margin={config.margin}
        >
          <defs>
            <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="formattedDate" 
            tick={{ 
              fontSize: config.fontSize, 
              fill: textColor, 
              fontWeight: 600 
            }}
            axisLine={false}
            tickLine={false}
            hide={config.hideXAxisTicks}
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
            domain={[0, 'dataMax + 5000']}
            axisLine={false}
            tickLine={false}
            hide={config.hideYAxis}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} opacity={0.4} />
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
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="tickets" 
            name="Tickets"
            stroke={primaryColor} 
            strokeWidth={config.strokeWidth}
            fillOpacity={1} 
            fill="url(#colorTickets)" 
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="revenue" 
            name="Ingresos ($)"
            stroke={secondaryColor} 
            strokeWidth={config.strokeWidth}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyChart;