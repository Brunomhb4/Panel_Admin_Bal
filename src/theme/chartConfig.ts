/**
 * Chart Configuration using Theme System
 * Provides pre-configured chart settings for Recharts components
 */

import { chartTheme, colors } from './theme';

// Recharts configuration objects
export const rechartsConfig = {
  // Common chart props
  common: {
    margin: { top: 20, right: 30, left: 20, bottom: 20 },
    style: {
      fontFamily: 'Inter, system-ui, sans-serif',
    }
  },
  
  // Area Chart Configuration
  areaChart: {
    gradients: {
      primary: {
        id: 'primaryGradient',
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '1',
        stops: [
          { offset: '5%', stopColor: colors.accent, stopOpacity: 0.8 },
          { offset: '95%', stopColor: colors.accent, stopOpacity: 0.1 }
        ]
      },
      secondary: {
        id: 'secondaryGradient',
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '1',
        stops: [
          { offset: '5%', stopColor: colors.highlight, stopOpacity: 0.8 },
          { offset: '95%', stopColor: colors.highlight, stopOpacity: 0.1 }
        ]
      }
    },
    
    area: {
      stroke: colors.accent,
      strokeWidth: 3,
      fill: 'url(#primaryGradient)',
      fillOpacity: 1,
    }
  },
  
  // Bar Chart Configuration
  barChart: {
    bar: {
      fill: colors.accent,
      radius: [4, 4, 0, 0],
    },
    
    multiBar: {
      primary: {
        fill: colors.accent,
        radius: [4, 4, 0, 0],
      },
      secondary: {
        fill: colors.highlight,
        radius: [4, 4, 0, 0],
      }
    }
  },
  
  // Line Chart Configuration
  lineChart: {
    line: {
      stroke: colors.accent,
      strokeWidth: 3,
      dot: false,
      activeDot: {
        r: 6,
        fill: colors.highlight,
        stroke: colors.accent,
        strokeWidth: 2,
      }
    }
  },
  
  // Pie Chart Configuration
  pieChart: {
    pie: {
      dataKey: 'value',
      cx: '50%',
      cy: '50%',
      outerRadius: 80,
      fill: colors.accent,
    },
    
    colors: chartTheme.pie.colors,
  },
  
  // Grid Configuration
  grid: {
    strokeDasharray: chartTheme.grid.strokeDasharray,
    stroke: chartTheme.grid.stroke,
    vertical: false,
  },
  
  // Axis Configuration
  xAxis: {
    axisLine: false,
    tickLine: false,
    tick: {
      fill: chartTheme.axis.tick.fill,
      fontSize: 12,
      fontFamily: chartTheme.axis.tick.fontFamily,
      fontWeight: 600,
    }
  },
  
  yAxis: {
    axisLine: false,
    tickLine: false,
    tick: {
      fill: chartTheme.axis.tick.fill,
      fontSize: 12,
      fontFamily: chartTheme.axis.tick.fontFamily,
      fontWeight: 600,
    }
  },
  
  // Tooltip Configuration
  tooltip: {
    contentStyle: {
      backgroundColor: chartTheme.tooltip.background,
      border: chartTheme.tooltip.border,
      borderRadius: '12px',
      color: chartTheme.tooltip.color,
      backdropFilter: chartTheme.tooltip.backdropFilter,
      boxShadow: '0 10px 40px rgba(2, 16, 36, 0.15)',
      fontWeight: 600,
      fontSize: '12px',
    },
    cursor: {
      fill: `${colors.accent}10`,
    }
  },
  
  // Legend Configuration
  legend: {
    wrapperStyle: {
      color: chartTheme.legend.color,
      fontSize: chartTheme.legend.fontSize,
      fontFamily: chartTheme.legend.fontFamily,
    }
  },
  
  // Responsive Configuration
  responsive: {
    mobile: {
      margin: { top: 10, right: 10, left: 0, bottom: 0 },
      fontSize: 10,
      hideYAxis: true,
      hideLegend: true,
    },
    tablet: {
      margin: { top: 15, right: 15, left: 0, bottom: 0 },
      fontSize: 11,
      hideYAxis: false,
      hideLegend: true,
    },
    desktop: {
      margin: { top: 20, right: 30, left: 0, bottom: 0 },
      fontSize: 12,
      hideYAxis: false,
      hideLegend: false,
    }
  }
};

// Utility function to get responsive chart config
export const getResponsiveChartConfig = (width: number) => {
  if (width < 640) return rechartsConfig.responsive.mobile;
  if (width < 1024) return rechartsConfig.responsive.tablet;
  return rechartsConfig.responsive.desktop;
};

// Pre-built chart component configurations
export const chartConfigurations = {
  // Daily Sales Chart
  dailySales: {
    type: 'area',
    config: {
      ...rechartsConfig.common,
      ...rechartsConfig.areaChart,
    },
    data: {
      xKey: 'date',
      yKey: 'sales',
      formatters: {
        x: (value: string) => new Date(value).toLocaleDateString('es-MX', { 
          weekday: 'short', 
          day: 'numeric' 
        }),
        y: (value: number) => `$${value.toLocaleString()}`,
      }
    }
  },
  
  // Monthly Sales Chart
  monthlySales: {
    type: 'bar',
    config: {
      ...rechartsConfig.common,
      ...rechartsConfig.barChart,
    },
    data: {
      xKey: 'month',
      yKey: 'sales',
      formatters: {
        x: (value: string) => value,
        y: (value: number) => `$${value.toLocaleString()}`,
      }
    }
  },
  
  // KPI Comparison Chart
  kpiComparison: {
    type: 'multiBar',
    config: {
      ...rechartsConfig.common,
      ...rechartsConfig.barChart.multiBar,
    },
    data: {
      xKey: 'category',
      yKeys: ['current', 'previous'],
      formatters: {
        x: (value: string) => value,
        y: (value: number) => value.toLocaleString(),
      }
    }
  },
  
  // Performance Pie Chart
  performancePie: {
    type: 'pie',
    config: {
      ...rechartsConfig.pieChart,
    },
    data: {
      valueKey: 'value',
      nameKey: 'name',
      formatters: {
        value: (value: number) => `${value}%`,
      }
    }
  }
};

export default rechartsConfig;