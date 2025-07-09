import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useThemeStore } from '../stores/themeStore';
import { 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Activity, 
  Zap,
  Store,
  Sparkles,
  DollarSign,
  Users
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
  LineChart,
  Line
} from 'recharts';

interface StoreSale {
  id: string;
  product: string;
  category: string;
  quantity: number;
  price: number;
  timestamp: string;
}

interface StoreStats {
  dailySales: number;
  weeklySales: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  productsCount: number;
  dailyGrowth: number;
  weeklyGrowth: number;
}

interface DailySalesData {
  date: string;
  sales: number;
  revenue: number;
  products: number;
}

interface WeeklySalesData {
  week: string;
  sales: number;
  revenue: number;
  growth: number;
}

// Mock data generator
const generateStoreData = () => {
  const products = [
    { name: 'Protector Solar', category: 'Cuidado Personal', price: 150 },
    { name: 'Toalla', category: 'Accesorios', price: 200 },
    { name: 'Gafas de Sol', category: 'Accesorios', price: 120 },
    { name: 'Flotador', category: 'Juguetes', price: 180 },
    { name: 'Pelota de Playa', category: 'Juguetes', price: 80 },
    { name: 'Sandalias', category: 'Calzado', price: 250 },
    { name: 'Gorra', category: 'Accesorios', price: 100 },
    { name: 'Camiseta', category: 'Ropa', price: 300 }
  ];
  
  const sales: StoreSale[] = [];
  
  // Generate sales for the last 30 days
  for (let day = 0; day < 30; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    const salesPerDay = Math.floor(Math.random() * 25) + 10;
    
    for (let i = 0; i < salesPerDay; i++) {
      const hour = Math.floor(Math.random() * 12) + 8;
      const minute = Math.floor(Math.random() * 60);
      const saleDate = new Date(date);
      saleDate.setHours(hour, minute);
      
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      sales.push({
        id: `${day}-${i}`,
        product: product.name,
        category: product.category,
        quantity,
        price: product.price,
        timestamp: saleDate.toISOString()
      });
    }
  }
  
  return sales.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const StoreManagement: React.FC = () => {
  const [sales, setSales] = useState<StoreSale[]>([]);
  const { mode } = useThemeStore();
  const [stats, setStats] = useState<StoreStats>({
    dailySales: 0,
    weeklySales: 0,
    dailyRevenue: 0,
    weeklyRevenue: 0,
    productsCount: 0,
    dailyGrowth: 0,
    weeklyGrowth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockSales = generateStoreData();
      setSales(mockSales);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const twoWeeksAgo = new Date(today);
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      
      const todaySales = mockSales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
      });
      
      const yesterdaySales = mockSales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === yesterday.getTime();
      });
      
      const thisWeekSales = mockSales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= weekAgo;
      });
      
      const lastWeekSales = mockSales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= twoWeeksAgo && saleDate < weekAgo;
      });
      
      const dailyRevenue = todaySales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      const yesterdayRevenue = yesterdaySales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      const weeklyRevenue = thisWeekSales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      const lastWeekRevenue = lastWeekSales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      
      const productsCount = todaySales.reduce((sum, sale) => sum + sale.quantity, 0);
      
      const dailyGrowth = yesterdayRevenue > 0 ? ((dailyRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 : 0;
      const weeklyGrowth = lastWeekRevenue > 0 ? ((weeklyRevenue - lastWeekRevenue) / lastWeekRevenue) * 100 : 0;
      
      setStats({
        dailySales: todaySales.length,
        weeklySales: thisWeekSales.length,
        dailyRevenue,
        weeklyRevenue,
        productsCount,
        dailyGrowth,
        weeklyGrowth
      });
      
      setLoading(false);
    }, 800);
  }, []);

  // Generate daily sales data for chart
  const getDailySalesData = (): DailySalesData[] => {
    const dailyData: DailySalesData[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const daySales = sales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === date.getTime();
      });
      
      dailyData.push({
        date: date.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric' }),
        sales: daySales.length,
        revenue: daySales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0),
        products: daySales.reduce((sum, sale) => sum + sale.quantity, 0)
      });
    }
    
    return dailyData;
  };

  // Generate weekly sales data
  const getWeeklySalesData = (): WeeklySalesData[] => {
    const weeklyData: WeeklySalesData[] = [];
    
    for (let i = 3; i >= 0; i--) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - (i * 7));
      
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 6);
      
      const weekSales = sales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= startDate && saleDate <= endDate;
      });
      
      const revenue = weekSales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      
      // Calculate growth compared to previous week
      const prevWeekStart = new Date(startDate);
      prevWeekStart.setDate(prevWeekStart.getDate() - 7);
      const prevWeekEnd = new Date(endDate);
      prevWeekEnd.setDate(prevWeekEnd.getDate() - 7);
      
      const prevWeekSales = sales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= prevWeekStart && saleDate <= prevWeekEnd;
      });
      
      const prevRevenue = prevWeekSales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
      const growth = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;
      
      weeklyData.push({
        week: `Sem ${4 - i}`,
        sales: weekSales.length,
        revenue,
        growth
      });
    }
    
    return weeklyData;
  };

  if (loading) {
    return (
      <DashboardLayout title="Tienda">
        <div className="flex justify-center items-center h-64 backdrop-blur-xl">
          <div className="relative z-10">
            <div className="animate-spin rounded-full border-4 border-[#C1E8FF]/40 border-t-[#C1E8FF] h-16 w-16 shadow-[0_0_30px_rgba(193,232,255,0.6)]"></div>
            <div className="absolute inset-4 animate-spin rounded-full border-2 border-[#7DA0CA]/60 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} animate-pulse h-7 w-7 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]`} />
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
      percentage: stats.dailyGrowth,
      icon: DollarSign,
      bgColor: 'bg-gradient-to-br from-midnight-blue/10 to-navy-blue/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90'
    },
    {
      title: 'Ventas Semanales',
      value: stats.weeklySales,
      subtitle: `$${stats.weeklyRevenue.toLocaleString()}`,
      percentage: stats.weeklyGrowth,
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-sky-muted/10 to-blue-soft/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-sky-muted/90 to-blue-soft/90'
    },
    {
      title: 'Productos Vendidos',
      value: stats.productsCount,
      subtitle: 'Unidades hoy',
      percentage: 0,
      icon: Package,
      bgColor: 'bg-gradient-to-br from-blue-soft/10 to-sky-light/30',
      iconColor: 'text-deep-navy',
      iconBg: 'bg-gradient-to-br from-blue-soft/90 to-sky-light/90'
    }
  ];

  const dailySalesData = getDailySalesData();
  const weeklySalesData = getWeeklySalesData();

  return (
    <DashboardLayout title="Tienda Cristal">
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
              <ShoppingBag className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] h-7 w-7`} />
            </div>
            <div className="relative">
              <h2 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-extrabold text-3xl drop-shadow-[0_0_10px_rgba(193,232,255,0.6)]`}>
                Tienda Cristal
              </h2>
              <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} font-medium text-lg`}>
                Gestión de productos y ventas
              </p>
            </div>
          </div>
        </div>

        {/* Panel de Métricas */}
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
                    <div className="flex items-center gap-2">
                      <p className={`${mode === 'dark' ? 'text-[#5483B3]' : 'text-[#5483B3]'} 
                                    text-sm font-semibold`}>
                        {metric.subtitle}
                      </p>
                      {metric.percentage !== 0 && (
                        <span className={`text-xs px-2 py-1 rounded-full font-bold
                                         ${metric.percentage > 0 
                                           ? 'bg-green-100 text-green-800' 
                                           : 'bg-red-100 text-red-800'
                                         }`}>
                          {metric.percentage > 0 ? '+' : ''}{metric.percentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gráficas */}
        <div className="responsive-grid-2 gap-8 mb-10">
          {/* Ventas diarias */}
          <div className={`${mode === 'dark' 
              ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
              : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
              border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
              rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
              backdrop-blur-xl floating-card transition-all duration-500`}>
            <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                           font-bold text-xl mb-6`}>
              Ventas Diarias (Última Semana)
            </h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#1B3B6F' : '#C1E8FF'} />
                <XAxis dataKey="date" tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                <YAxis tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)', 
                    border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
                    borderRadius: '12px',
                    color: mode === 'dark' ? '#C1E8FF' : '#021024'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#5483B3" 
                  strokeWidth={3}
                  dot={{ fill: '#5483B3', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#7DA0CA', stroke: '#5483B3', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tendencia semanal */}
          <div className={`${mode === 'dark' 
              ? 'bg-gradient-to-br from-[#1B3B6F]/60 to-[#5483B3]/40' 
              : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
              border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
              rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
              backdrop-blur-xl floating-card transition-all duration-500`}>
            <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                           font-bold text-xl mb-6`}>
              Tendencia Semanal
            </h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#1B3B6F' : '#C1E8FF'} />
                <XAxis dataKey="week" tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
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
                  dataKey="revenue" 
                  fill="#1B3B6F" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumen de rendimiento */}
        <div className={`${mode === 'dark' 
            ? 'bg-gradient-to-br from-[#5483B3]/60 to-[#7DA0CA]/40' 
            : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
            border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
            rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
            backdrop-blur-xl floating-card transition-all duration-500`}>
          <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                         font-bold text-xl mb-6`}>
            Resumen de Rendimiento
          </h3>
          
          <div className="responsive-grid gap-6">
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-r from-[#C1E8FF]/10 to-[#7DA0CA]/5' 
                : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/40'} 
                border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                rounded-xl p-5 backdrop-blur-xl`}>
              <div className="flex justify-between items-center mb-3">
                <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} font-semibold`}>
                  Ticket Promedio
                </span>
                <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}>
                  ${Math.round(stats.dailyRevenue / (stats.dailySales || 1)).toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-[#C1E8FF]/20 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] h-3 rounded-full" style={{ width: '75%' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-r from-[#7DA0CA]/10 to-[#5483B3]/5' 
                : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/40'} 
                border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                rounded-xl p-5 backdrop-blur-xl`}>
              <div className="flex justify-between items-center mb-3">
                <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} font-semibold`}>
                  Productos por Venta
                </span>
                <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}>
                  {Math.round(stats.productsCount / (stats.dailySales || 1))}
                </span>
              </div>
              <div className="w-full bg-[#C1E8FF]/20 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-[#7DA0CA] to-[#C1E8FF] h-3 rounded-full" style={{ width: '60%' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-r from-[#5483B3]/10 to-[#C1E8FF]/5' 
                : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/40'} 
                border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                rounded-xl p-5 backdrop-blur-xl`}>
              <div className="flex justify-between items-center mb-3">
                <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} font-semibold`}>
                  Crecimiento Semanal
                </span>
                <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}>
                  {stats.weeklyGrowth > 0 ? '+' : ''}{stats.weeklyGrowth.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-[#C1E8FF]/20 rounded-full h-3 overflow-hidden">
                <div className={`bg-gradient-to-r ${stats.weeklyGrowth >= 0 ? 'from-[#C1E8FF] to-white' : 'from-red-400 to-red-600'} h-3 rounded-full`} 
                     style={{ width: `${Math.min(Math.abs(stats.weeklyGrowth) * 2, 100)}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StoreManagement;