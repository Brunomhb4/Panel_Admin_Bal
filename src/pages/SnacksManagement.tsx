import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useThemeStore } from '../stores/themeStore';
import { 
  Coffee, 
  Users, 
  TrendingUp, 
  Clock,
  BarChart3,
  Activity, 
  Zap,
  Cookie,
  Sparkles,
  ShoppingCart,
  Calendar
} from 'lucide-react';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface SnackSale {
  id: string;
  product: string;
  quantity: number;
  price: number;
  timestamp: string;
}

interface HourlySales {
  hour: string;
  sales: number;
  revenue: number;
}

interface WeeklySales {
  day: string;
  sales: number;
  revenue: number;
}

interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
  percentage: number;
}

interface SnacksStats {
  dailySales: number;
  historicalSales: number;
  dailyRevenue: number;
  historicalRevenue: number;
  totalProducts: number;
  averageTicket: number;
}

// Mock data generator
const generateSnacksData = () => {
  const products = ['Papas', 'Refrescos', 'Helados', 'Dulces', 'Nachos', 'Hot Dogs', 'Palomitas'];
  const sales: SnackSale[] = [];
  
  // Generate sales for the last 30 days
  for (let day = 0; day < 30; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    const salesPerDay = Math.floor(Math.random() * 50) + 20;
    
    for (let i = 0; i < salesPerDay; i++) {
      const hour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
      const minute = Math.floor(Math.random() * 60);
      const saleDate = new Date(date);
      saleDate.setHours(hour, minute);
      
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = Math.floor(Math.random() * 80) + 20;
      
      sales.push({
        id: `${day}-${i}`,
        product,
        quantity,
        price,
        timestamp: saleDate.toISOString()
      });
    }
  }
  
  return sales.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const SnacksManagement: React.FC = () => {
  const [sales, setSales] = useState<SnackSale[]>([]);
  const { mode } = useThemeStore();
  const [stats, setStats] = useState<SnacksStats>({
    dailySales: 0,
    historicalSales: 0,
    dailyRevenue: 0,
    historicalRevenue: 0,
    totalProducts: 0,
    averageTicket: 0
  });
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockSales = generateSnacksData();
      setSales(mockSales);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todaySales = mockSales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
      });
      
      const dailyRevenue = todaySales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      const historicalRevenue = mockSales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      const totalProducts = todaySales.reduce((sum, sale) => sum + sale.quantity, 0);
      
      setStats({
        dailySales: todaySales.length,
        historicalSales: mockSales.length,
        dailyRevenue,
        historicalRevenue,
        totalProducts,
        averageTicket: todaySales.length > 0 ? dailyRevenue / todaySales.length : 0
      });
      
      setLoading(false);
    }, 800);
  }, []);

  // Generate hourly sales data
  const getHourlySales = (): HourlySales[] => {
    const hourlyData: { [key: string]: { sales: number; revenue: number } } = {};
    
    for (let hour = 8; hour <= 20; hour++) {
      hourlyData[hour] = { sales: 0, revenue: 0 };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    sales.filter(sale => {
      const saleDate = new Date(sale.timestamp);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    }).forEach(sale => {
      const hour = new Date(sale.timestamp).getHours();
      if (hourlyData[hour]) {
        hourlyData[hour].sales += 1;
        hourlyData[hour].revenue += sale.price * sale.quantity;
      }
    });
    
    return Object.entries(hourlyData).map(([hour, data]) => ({
      hour: `${hour}:00`,
      sales: data.sales,
      revenue: data.revenue
    }));
  };

  // Generate weekly sales data
  const getWeeklySales = (): WeeklySales[] => {
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const weeklyData: WeeklySales[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const daySales = sales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === date.getTime();
      });
      
      weeklyData.push({
        day: weekDays[date.getDay()],
        sales: daySales.length,
        revenue: daySales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0)
      });
    }
    
    return weeklyData;
  };

  // Get top products
  const getTopProducts = (): TopProduct[] => {
    const productStats: { [key: string]: { quantity: number; revenue: number } } = {};
    
    sales.forEach(sale => {
      if (!productStats[sale.product]) {
        productStats[sale.product] = { quantity: 0, revenue: 0 };
      }
      productStats[sale.product].quantity += sale.quantity;
      productStats[sale.product].revenue += sale.price * sale.quantity;
    });
    
    const totalRevenue = Object.values(productStats).reduce((sum, stat) => sum + stat.revenue, 0);
    
    return Object.entries(productStats)
      .map(([name, stats]) => ({
        name,
        quantity: stats.quantity,
        revenue: stats.revenue,
        percentage: (stats.revenue / totalRevenue) * 100
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  if (loading) {
    return (
      <DashboardLayout title="Snacks">
        <div className="flex justify-center items-center h-64 backdrop-blur-xl">
          <div className="relative z-10">
            <div className="animate-spin rounded-full border-4 border-[#C1E8FF]/40 border-t-[#C1E8FF] h-16 w-16 shadow-[0_0_30px_rgba(193,232,255,0.6)]"></div>
            <div className="absolute inset-4 animate-spin rounded-full border-2 border-[#7DA0CA]/60 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Coffee className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} animate-pulse h-7 w-7 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]`} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const metricsCards = [
    {
      title: 'Ventas del Día',
      value: stats.dailySales,
      subtitle: `$${stats.dailyRevenue.toLocaleString()}`,
      icon: ShoppingCart,
      bgColor: 'bg-gradient-to-br from-midnight-blue/10 to-navy-blue/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90',
      iconGlow: 'shadow-[0_0_25px_rgba(27,59,111,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-midnight-blue/20',
      pulseColor: 'bg-midnight-blue/30'
    },
    {
      title: 'Ventas Históricas',
      value: stats.historicalSales,
      subtitle: `$${stats.historicalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-sky-muted/10 to-blue-soft/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-sky-muted/90 to-blue-soft/90',
      iconGlow: 'shadow-[0_0_25px_rgba(84,131,179,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-sky-muted/20',
      pulseColor: 'bg-sky-muted/30'
    }
  ];

  const hourlySales = getHourlySales();
  const weeklySales = getWeeklySales();
  const topProducts = getTopProducts();

  const COLORS = ['#1B3B6F', '#5483B3', '#7DA0CA', '#C1E8FF', '#052659'];

  return (
    <DashboardLayout title="Snacks Cristal">
      <div className="animate-fade-in relative">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-br from-[#C1E8FF]/30 to-[#5483B3]/20' 
                : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/60'} 
                shadow-[0_0_30px_rgba(193,232,255,0.6)] border-3 border-[#C1E8FF]/60 backdrop-blur-xl 
                flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-6 
                group relative overflow-hidden rounded-2xl p-4`}>
              <Coffee className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] h-7 w-7`} />
            </div>
            <div className="relative">
              <h2 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-extrabold text-3xl drop-shadow-[0_0_10px_rgba(193,232,255,0.6)]`}>
                Snacks Cristal
              </h2>
              <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} font-medium text-lg`}>
                Gestión de snacks y bebidas
              </p>
            </div>
          </div>
        </div>

        {/* Panel de Totales */}
        <div className="responsive-grid gap-6 mb-10">
          {metricsCards.map((metric, index) => {
            const Icon = metric.icon;
            
            return (
              <div 
                key={metric.title}
                className={`${mode === 'dark' 
                  ? 'bg-gradient-to-br from-[#052659]/40 to-[#1B3B6F]/30' 
                  : 'bg-gradient-to-br from-white/80 to-[#C1E8FF]/40'} 
                  border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/40' : 'border-[#5483B3]/30'} 
                  rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
                  backdrop-blur-xl floating-card animate-slide-up hover:scale-105 
                  group relative overflow-hidden transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center relative z-10">
                  <div className={`${mode === 'dark' 
                    ? 'bg-gradient-to-br from-[#C1E8FF]/30 to-[#5483B3]/20' 
                    : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/60'} 
                    shadow-[0_0_20px_rgba(193,232,255,0.6)] border-3 border-[#C1E8FF]/60 
                    backdrop-blur-xl flex-shrink-0 transition-all duration-500 
                    group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden rounded-xl p-3 mr-4`}>
                    <Icon className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} 
                                     relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] 
                                     transition-all duration-300 group-hover:scale-125 h-6 w-6`} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#1B3B6F]'} 
                                  truncate font-bold transition-all duration-300 text-sm mb-1`}>
                      {metric.title}
                    </p>
                    <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                                  truncate font-black transition-all duration-300 text-2xl mb-1`}>
                      {metric.value.toLocaleString()}
                    </h3>
                    <p className={`${mode === 'dark' ? 'text-[#5483B3]' : 'text-[#5483B3]'} 
                                  text-sm font-semibold`}>
                      {metric.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gráficas */}
        <div className="responsive-grid-2 gap-8 mb-10">
          {/* Gráfica de ventas por hora */}
          <div className={`${mode === 'dark' 
              ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
              : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
              border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
              rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
              backdrop-blur-xl floating-card transition-all duration-500`}>
            <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                           font-bold text-xl mb-6`}>
              Ventas por Hora
            </h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlySales}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5483B3" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#5483B3" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#1B3B6F' : '#C1E8FF'} />
                <XAxis dataKey="hour" tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                <YAxis tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                    border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
                    borderRadius: '12px',
                    color: mode === 'dark' ? '#C1E8FF' : '#021024'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#5483B3" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#salesGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfica comparativa semanal */}
          <div className={`${mode === 'dark' 
              ? 'bg-gradient-to-br from-[#1B3B6F]/60 to-[#5483B3]/40' 
              : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
              border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
              rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
              backdrop-blur-xl floating-card transition-all duration-500`}>
            <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                           font-bold text-xl mb-6`}>
              Comparativa Semanal
            </h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklySales}>
                <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#1B3B6F' : '#C1E8FF'} />
                <XAxis dataKey="day" tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                <YAxis tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                    border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
                    borderRadius: '12px',
                    color: mode === 'dark' ? '#C1E8FF' : '#021024'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#1B3B6F" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className={`${mode === 'dark' 
            ? 'bg-gradient-to-br from-[#5483B3]/60 to-[#7DA0CA]/40' 
            : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
            border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
            rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
            backdrop-blur-xl floating-card transition-all duration-500`}>
          <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                         font-bold text-xl mb-6`}>
            Productos Más Vendidos
          </h3>
          
          <div className="responsive-grid-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="quantity"
                    label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                      border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
                      borderRadius: '12px',
                      color: mode === 'dark' ? '#C1E8FF' : '#021024'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className={`${mode === 'dark' 
                    ? 'bg-gradient-to-r from-[#C1E8FF]/10 to-[#7DA0CA]/5' 
                    : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/40'} 
                    border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                    rounded-xl p-4 backdrop-blur-xl`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-semibold`}>
                        {product.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold`}>
                        {product.quantity} unidades
                      </div>
                      <div className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} text-sm`}>
                        ${product.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SnacksManagement;