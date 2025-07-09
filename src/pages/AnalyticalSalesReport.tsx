import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useThemeStore } from '../stores/themeStore';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Clock,
  BarChart3,
  PieChart,
  FileText,
  Calendar,
  Award,
  AlertTriangle,
  Coffee,
  ShoppingBag,
  Zap,
  Target,
  Activity,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Interfaces para los datos
interface ProductData {
  id: string;
  name: string;
  category: string;
  dailySales: number;
  monthlySales: number;
  profitMargin: number;
  inventoryTurnover: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

interface SalesData {
  date: string;
  snacksRevenue: number;
  storeRevenue: number;
  totalTransactions: number;
  averageTicket: number;
  hour?: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
  margin: number;
}

interface KPIData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

const AnalyticalSalesReport: React.FC = () => {
  const { mode } = useThemeStore();
  const [loading, setLoading] = useState(true);
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  
  // Datos mock generados
  const [kpiData] = useState<KPIData[]>([
    {
      title: 'Ingresos Totales',
      value: '$45,280',
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'from-[#1B3B6F] to-[#5483B3]'
    },
    {
      title: 'Transacciones',
      value: '1,847',
      change: 8.3,
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-[#5483B3] to-[#7DA0CA]'
    },
    {
      title: 'Ticket Promedio',
      value: '$24.52',
      change: -2.1,
      trend: 'down',
      icon: Target,
      color: 'from-[#7DA0CA] to-[#C1E8FF]'
    },
    {
      title: 'Margen Promedio',
      value: '34.8%',
      change: 5.7,
      trend: 'up',
      icon: TrendingUp,
      color: 'from-[#052659] to-[#1B3B6F]'
    }
  ]);

  const [dailySalesData] = useState<SalesData[]>([
    { date: '2025-01-15', snacksRevenue: 1250, storeRevenue: 2100, totalTransactions: 85, averageTicket: 39.41 },
    { date: '2025-01-16', snacksRevenue: 1380, storeRevenue: 1950, totalTransactions: 92, averageTicket: 36.20 },
    { date: '2025-01-17', snacksRevenue: 1150, storeRevenue: 2250, totalTransactions: 78, averageTicket: 43.59 },
    { date: '2025-01-18', snacksRevenue: 1420, storeRevenue: 2050, totalTransactions: 95, averageTicket: 36.53 },
    { date: '2025-01-19', snacksRevenue: 1320, storeRevenue: 2180, totalTransactions: 88, averageTicket: 39.77 },
    { date: '2025-01-20', snacksRevenue: 1580, storeRevenue: 2350, totalTransactions: 102, averageTicket: 38.53 },
    { date: '2025-01-21', snacksRevenue: 1680, storeRevenue: 2420, totalTransactions: 108, averageTicket: 37.96 }
  ]);

  const [hourlyData] = useState<SalesData[]>([
    { hour: 8, snacksRevenue: 120, storeRevenue: 80, totalTransactions: 12, averageTicket: 16.67 },
    { hour: 9, snacksRevenue: 180, storeRevenue: 150, totalTransactions: 18, averageTicket: 18.33 },
    { hour: 10, snacksRevenue: 220, storeRevenue: 180, totalTransactions: 22, averageTicket: 18.18 },
    { hour: 11, snacksRevenue: 280, storeRevenue: 240, totalTransactions: 28, averageTicket: 18.57 },
    { hour: 12, snacksRevenue: 350, storeRevenue: 320, totalTransactions: 35, averageTicket: 19.14 },
    { hour: 13, snacksRevenue: 380, storeRevenue: 350, totalTransactions: 38, averageTicket: 19.21 },
    { hour: 14, snacksRevenue: 320, storeRevenue: 280, totalTransactions: 32, averageTicket: 18.75 },
    { hour: 15, snacksRevenue: 290, storeRevenue: 260, totalTransactions: 30, averageTicket: 18.33 },
    { hour: 16, snacksRevenue: 250, storeRevenue: 220, totalTransactions: 26, averageTicket: 18.08 },
    { hour: 17, snacksRevenue: 200, storeRevenue: 180, totalTransactions: 22, averageTicket: 17.27 },
    { hour: 18, snacksRevenue: 150, storeRevenue: 140, totalTransactions: 18, averageTicket: 16.11 },
    { hour: 19, snacksRevenue: 100, storeRevenue: 120, totalTransactions: 14, averageTicket: 15.71 }
  ]);

  const [snacksProducts] = useState<ProductData[]>([
    { id: '1', name: 'Papas Fritas Premium', category: 'Salados', dailySales: 45, monthlySales: 1350, profitMargin: 42, inventoryTurnover: 8.5, trend: 'up', trendPercentage: 15.2 },
    { id: '2', name: 'Chocolate Artesanal', category: 'Dulces', dailySales: 38, monthlySales: 1140, profitMargin: 38, inventoryTurnover: 6.2, trend: 'up', trendPercentage: 12.8 },
    { id: '3', name: 'Bebida Energética', category: 'Bebidas', dailySales: 52, monthlySales: 1560, profitMargin: 35, inventoryTurnover: 9.1, trend: 'up', trendPercentage: 18.5 },
    { id: '4', name: 'Galletas Gourmet', category: 'Dulces', dailySales: 32, monthlySales: 960, profitMargin: 40, inventoryTurnover: 5.8, trend: 'stable', trendPercentage: 2.1 },
    { id: '5', name: 'Frutos Secos Mix', category: 'Otros', dailySales: 28, monthlySales: 840, profitMargin: 45, inventoryTurnover: 4.5, trend: 'up', trendPercentage: 8.9 },
    { id: '6', name: 'Agua Premium', category: 'Bebidas', dailySales: 65, monthlySales: 1950, profitMargin: 28, inventoryTurnover: 12.3, trend: 'up', trendPercentage: 22.1 },
    { id: '7', name: 'Nachos Especiales', category: 'Salados', dailySales: 25, monthlySales: 750, profitMargin: 38, inventoryTurnover: 4.2, trend: 'down', trendPercentage: -5.3 },
    { id: '8', name: 'Gomitas Premium', category: 'Dulces', dailySales: 22, monthlySales: 660, profitMargin: 44, inventoryTurnover: 3.8, trend: 'stable', trendPercentage: 1.2 },
    { id: '9', name: 'Café Instantáneo', category: 'Bebidas', dailySales: 35, monthlySales: 1050, profitMargin: 32, inventoryTurnover: 7.1, trend: 'up', trendPercentage: 9.8 },
    { id: '10', name: 'Barras Proteína', category: 'Otros', dailySales: 18, monthlySales: 540, profitMargin: 48, inventoryTurnover: 3.2, trend: 'down', trendPercentage: -8.7 }
  ]);

  const [storeProducts] = useState<ProductData[]>([
    { id: '11', name: 'Artículos de Higiene', category: 'Conveniencia', dailySales: 85, monthlySales: 2550, profitMargin: 25, inventoryTurnover: 6.8, trend: 'up', trendPercentage: 14.3 },
    { id: '12', name: 'Productos Básicos', category: 'Básicos', dailySales: 72, monthlySales: 2160, profitMargin: 22, inventoryTurnover: 8.2, trend: 'up', trendPercentage: 11.7 },
    { id: '13', name: 'Mercancía Balneario', category: 'Mercancía', dailySales: 45, monthlySales: 1350, profitMargin: 55, inventoryTurnover: 3.5, trend: 'up', trendPercentage: 25.8 },
    { id: '14', name: 'Protector Solar', category: 'Conveniencia', dailySales: 38, monthlySales: 1140, profitMargin: 35, inventoryTurnover: 4.2, trend: 'up', trendPercentage: 32.1 },
    { id: '15', name: 'Toallas Desechables', category: 'Básicos', dailySales: 55, monthlySales: 1650, profitMargin: 28, inventoryTurnover: 7.5, trend: 'stable', trendPercentage: 3.2 },
    { id: '16', name: 'Gafas de Sol', category: 'Mercancía', dailySales: 22, monthlySales: 660, profitMargin: 65, inventoryTurnover: 2.1, trend: 'up', trendPercentage: 18.9 },
    { id: '17', name: 'Medicamentos Básicos', category: 'Conveniencia', dailySales: 32, monthlySales: 960, profitMargin: 30, inventoryTurnover: 5.8, trend: 'stable', trendPercentage: 1.8 },
    { id: '18', name: 'Flotadores', category: 'Mercancía', dailySales: 28, monthlySales: 840, profitMargin: 58, inventoryTurnover: 2.8, trend: 'up', trendPercentage: 28.5 },
    { id: '19', name: 'Productos Limpieza', category: 'Básicos', dailySales: 42, monthlySales: 1260, profitMargin: 24, inventoryTurnover: 6.2, trend: 'down', trendPercentage: -7.4 },
    { id: '20', name: 'Camisetas Balneario', category: 'Mercancía', dailySales: 35, monthlySales: 1050, profitMargin: 62, inventoryTurnover: 3.1, trend: 'up', trendPercentage: 21.3 }
  ]);

  const [categoryData] = useState<CategoryData[]>([
    { name: 'Snacks Salados', value: 8500, color: '#1B3B6F', margin: 40 },
    { name: 'Snacks Dulces', value: 7200, color: '#5483B3', margin: 41 },
    { name: 'Bebidas', value: 9800, color: '#7DA0CA', margin: 32 },
    { name: 'Conveniencia', value: 12500, color: '#052659', margin: 30 },
    { name: 'Productos Básicos', value: 10200, color: '#C1E8FF', margin: 25 },
    { name: 'Mercancía', value: 6800, color: '#021024', margin: 60 }
  ]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [reportPeriod]);

  if (loading) {
    return (
      <DashboardLayout title="Informe Analítico de Ventas">
        <div className="flex justify-center items-center h-64 backdrop-blur-xl">
          <div className="relative z-10">
            <div className="animate-spin rounded-full border-4 border-[#C1E8FF]/40 border-t-[#C1E8FF] h-16 w-16 shadow-[0_0_30px_rgba(193,232,255,0.6)]"></div>
            <div className="absolute inset-4 animate-spin rounded-full border-2 border-[#7DA0CA]/60 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} animate-pulse h-7 w-7 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]`} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Informe Analítico de Ventas">
      <div className="animate-fade-in relative">
        {/* Decorative glass elements */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#C1E8FF]/10 to-[#7DA0CA]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#5483B3]/10 to-[#C1E8FF]/5 rounded-full blur-3xl"></div>
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-br from-[#C1E8FF]/30 to-[#5483B3]/20' 
                : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/60'} 
                shadow-[0_0_30px_rgba(193,232,255,0.6)] border-3 border-[#C1E8FF]/60 backdrop-blur-xl 
                flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-6 
                group relative overflow-hidden rounded-2xl p-4`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
              <div className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 bg-[#C1E8FF]/20 backdrop-blur-md"></div>
              <div className="absolute inset-0 rounded-2xl border border-[#C1E8FF]/80"></div>
              <BarChart3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] h-7 w-7`} />
            </div>
            <div className="relative">
              <h2 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-extrabold text-3xl drop-shadow-[0_0_10px_rgba(193,232,255,0.6)]`} 
                  style={{textShadow: mode === 'dark' ? '0 0 15px rgba(193, 232, 255, 0.4)' : '0 0 10px rgba(193, 232, 255, 0.3)'}}>
                Informe Analítico de Ventas
              </h2>
              <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} font-medium text-lg`}>
                Análisis detallado de rendimiento - Snacks y Tienda
              </p>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C1E8FF]/80 via-[#7DA0CA]/60 to-transparent"></div>
            </div>
          </div>
          
          {/* Period Toggle */}
          <div className={`flex items-center gap-2 ${mode === 'dark' 
              ? 'bg-[#052659]/30 border-[#C1E8FF]/40' 
              : 'bg-white/60 border-[#5483B3]/20'} 
              backdrop-blur-xl border-2 rounded-xl p-1 shadow-[0_0_20px_rgba(193,232,255,0.4)]`}>
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setReportPeriod(period)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-500 ${
                  reportPeriod === period
                    ? mode === 'dark'
                      ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-[#C1E8FF] shadow-[0_0_15px_rgba(193,232,255,0.5)]'
                      : 'bg-gradient-to-r from-[#1B3B6F] to-[#5483B3] text-white shadow-[0_0_15px_rgba(84,131,179,0.5)]'
                    : mode === 'dark'
                      ? 'text-[#C1E8FF] hover:bg-[#5483B3]/20'
                      : 'text-[#1B3B6F] hover:bg-[#C1E8FF]/30'
                }`}
              >
                <Calendar className={`h-4 w-4 ${reportPeriod === period ? 'animate-pulse' : ''}`} />
                <span className="font-bold text-sm capitalize">{period}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 1. Resumen Ejecutivo - KPIs */}
        <div className="mb-10">
          <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-2xl mb-6 flex items-center gap-3`}>
            <Award className="h-6 w-6" />
            1. Resumen Ejecutivo - KPIs
          </h3>
          <div className="responsive-grid gap-6">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div 
                  key={kpi.title}
                  className={`${mode === 'dark' 
                    ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
                    border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                    rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
                    backdrop-blur-xl floating-card animate-slide-up hover:scale-105 
                    group relative overflow-hidden transition-all duration-500`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-br ${kpi.color} p-3 rounded-xl shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      kpi.trend === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : kpi.trend === 'down' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {kpi.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : 
                       kpi.trend === 'down' ? <TrendingDown className="h-4 w-4" /> : 
                       <Activity className="h-4 w-4" />}
                      <span className="text-sm font-bold">{kpi.change > 0 ? '+' : ''}{kpi.change}%</span>
                    </div>
                  </div>
                  <h4 className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} font-medium text-sm mb-2`}>
                    {kpi.title}
                  </h4>
                  <p className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-2xl`}>
                    {kpi.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Análisis Detallado de Ventas Diarias */}
        <div className="mb-10">
          <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-2xl mb-6 flex items-center gap-3`}>
            <Calendar className="h-6 w-6" />
            2. Análisis Detallado de Ventas Diarias
          </h3>
          
          <div className="responsive-grid-2 gap-8 mb-8">
            {/* Ventas Diarias */}
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
                : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
                border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] backdrop-blur-xl`}>
              <h4 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl mb-4`}>
                Ventas Diarias por Sección
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#1B3B6F' : '#C1E8FF'} opacity={0.4} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  />
                  <YAxis tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
                      borderRadius: '12px',
                      color: mode === 'dark' ? '#C1E8FF' : '#021024'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="snacksRevenue" name="Snacks" fill="#5483B3" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="storeRevenue" name="Tienda" fill="#7DA0CA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Horas Pico */}
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-br from-[#1B3B6F]/60 to-[#5483B3]/40' 
                : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
                border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] backdrop-blur-xl`}>
              <h4 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl mb-4`}>
                Análisis de Horas Pico
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#1B3B6F' : '#C1E8FF'} opacity={0.4} />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }}
                    tickFormatter={(value) => `${value}:00`}
                  />
                  <YAxis tick={{ fill: mode === 'dark' ? '#C1E8FF' : '#052659', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
                      borderRadius: '12px',
                      color: mode === 'dark' ? '#C1E8FF' : '#021024'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalTransactions" 
                    name="Transacciones"
                    stroke="#1B3B6F" 
                    strokeWidth={3}
                    dot={{ fill: '#5483B3', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. Métricas de Rendimiento por Sección */}
        <div className="mb-10">
          <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-2xl mb-6 flex items-center gap-3`}>
            <Target className="h-6 w-6" />
            3. Métricas de Rendimiento por Sección
          </h3>
          
          <div className="responsive-grid-2 gap-8">
            {/* A. Snacks */}
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
                : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
                border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] backdrop-blur-xl`}>
              <div className="flex items-center gap-3 mb-6">
                <Coffee className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} h-6 w-6`} />
                <h4 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}>
                  A. Sección Snacks - Top 10
                </h4>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${mode === 'dark' ? 'bg-[#1B3B6F]/30' : 'bg-[#C1E8FF]/20'} border-b border-[#C1E8FF]/30`}>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-left p-3 font-bold text-sm`}>Producto</th>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-center p-3 font-bold text-sm`}>Ventas/Día</th>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-center p-3 font-bold text-sm`}>Margen %</th>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-center p-3 font-bold text-sm`}>Tendencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snacksProducts.slice(0, 10).map((product, index) => (
                      <tr key={product.id} className="border-b border-[#C1E8FF]/20 hover:bg-[#C1E8FF]/10">
                        <td className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} p-3`}>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} text-sm`}>{product.category}</div>
                          </div>
                        </td>
                        <td className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} text-center p-3 font-bold`}>
                          {product.dailySales}
                        </td>
                        <td className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} text-center p-3 font-bold`}>
                          {product.profitMargin}%
                        </td>
                        <td className="text-center p-3">
                          <div className={`flex items-center justify-center gap-1 ${
                            product.trend === 'up' ? 'text-green-600' : 
                            product.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {product.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : 
                             product.trend === 'down' ? <TrendingDown className="h-4 w-4" /> : 
                             <Activity className="h-4 w-4" />}
                            <span className="text-sm font-bold">
                              {product.trend === 'up' ? '+' : product.trend === 'down' ? '' : '±'}{product.trendPercentage}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* B. Tienda */}
            <div className={`${mode === 'dark' 
                ? 'bg-gradient-to-br from-[#1B3B6F]/60 to-[#5483B3]/40' 
                : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
                border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] backdrop-blur-xl`}>
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} h-6 w-6`} />
                <h4 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}>
                  B. Sección Tienda - Top 10
                </h4>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${mode === 'dark' ? 'bg-[#5483B3]/30' : 'bg-[#7DA0CA]/20'} border-b border-[#C1E8FF]/30`}>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-left p-3 font-bold text-sm`}>Producto</th>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-center p-3 font-bold text-sm`}>Ventas/Día</th>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-center p-3 font-bold text-sm`}>Margen %</th>
                      <th className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} text-center p-3 font-bold text-sm`}>Tendencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeProducts.slice(0, 10).map((product, index) => (
                      <tr key={product.id} className="border-b border-[#C1E8FF]/20 hover:bg-[#C1E8FF]/10">
                        <td className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} p-3`}>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} text-sm`}>{product.category}</div>
                          </div>
                        </td>
                        <td className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} text-center p-3 font-bold`}>
                          {product.dailySales}
                        </td>
                        <td className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} text-center p-3 font-bold`}>
                          {product.profitMargin}%
                        </td>
                        <td className="text-center p-3">
                          <div className={`flex items-center justify-center gap-1 ${
                            product.trend === 'up' ? 'text-green-600' : 
                            product.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {product.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : 
                             product.trend === 'down' ? <TrendingDown className="h-4 w-4" /> : 
                             <Activity className="h-4 w-4" />}
                            <span className="text-sm font-bold">
                              {product.trend === 'up' ? '+' : product.trend === 'down' ? '' : '±'}{product.trendPercentage}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Visualización de Datos - Distribución por Categorías */}
        <div className="mb-10">
          <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-2xl mb-6 flex items-center gap-3`}>
            <PieChart className="h-6 w-6" />
            4. Visualización de Datos - Distribución por Categorías
          </h3>
          
          <div className={`${mode === 'dark' 
              ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
              : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
              border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
              rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] backdrop-blur-xl`}>
            <ResponsiveContainer width="100%" height={400}>
              <RechartsPieChart>
                <RechartsPieChart
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: mode === 'dark' ? 'rgba(5, 38, 89, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    border: `2px solid ${mode === 'dark' ? '#C1E8FF' : '#1B3B6F'}`,
                    borderRadius: '12px',
                    color: mode === 'dark' ? '#C1E8FF' : '#021024'
                  }}
                  formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6. Recomendaciones Estratégicas */}
        <div className="mb-10">
          <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-2xl mb-6 flex items-center gap-3`}>
            <Sparkles className="h-6 w-6" />
            6. Recomendaciones Estratégicas
          </h3>
          
          <div className="responsive-grid gap-6">
            {[
              {
                title: 'Optimización de Inventario',
                description: 'Incrementar stock de productos con alta rotación como Agua Premium y Bebidas Energéticas.',
                priority: 'Alta',
                impact: 'Incremento estimado del 15% en ventas',
                icon: Package,
                color: 'from-[#1B3B6F] to-[#5483B3]'
              },
              {
                title: 'Estrategia de Pricing',
                description: 'Ajustar precios de productos con margen superior al 50% para maximizar rentabilidad.',
                priority: 'Media',
                impact: 'Mejora del margen promedio en 8%',
                icon: DollarSign,
                color: 'from-[#5483B3] to-[#7DA0CA]'
              },
              {
                title: 'Cross-selling',
                description: 'Promocionar combos de snacks + bebidas durante horas pico (12:00-14:00).',
                priority: 'Alta',
                impact: 'Aumento del ticket promedio en 12%',
                icon: TrendingUp,
                color: 'from-[#7DA0CA] to-[#C1E8FF]'
              },
              {
                title: 'Productos Bajo Rendimiento',
                description: 'Revisar estrategia para Barras Proteína y Nachos Especiales con tendencia negativa.',
                priority: 'Media',
                impact: 'Reducción de pérdidas en 20%',
                icon: AlertTriangle,
                color: 'from-[#052659] to-[#1B3B6F]'
              }
            ].map((recommendation, index) => (
              <div 
                key={recommendation.title}
                className={`${mode === 'dark' 
                  ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
                  : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
                  border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                  rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
                  backdrop-blur-xl floating-card animate-slide-up hover:scale-105 
                  group relative overflow-hidden transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`bg-gradient-to-br ${recommendation.color} p-3 rounded-xl shadow-lg`}>
                    <recommendation.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-lg mb-2`}>
                      {recommendation.title}
                    </h4>
                    <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-bold ${
                      recommendation.priority === 'Alta' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      Prioridad: {recommendation.priority}
                    </div>
                  </div>
                </div>
                <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} mb-4`}>
                  {recommendation.description}
                </p>
                <div className={`${mode === 'dark' ? 'bg-[#C1E8FF]/10' : 'bg-[#C1E8FF]/20'} p-3 rounded-lg`}>
                  <p className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} font-medium text-sm`}>
                    <strong>Impacto esperado:</strong> {recommendation.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer del Informe */}
        <div className={`${mode === 'dark' 
            ? 'bg-gradient-to-r from-[#052659]/60 to-[#1B3B6F]/40' 
            : 'bg-gradient-to-r from-white/90 to-[#C1E8FF]/30'} 
            border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
            rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] backdrop-blur-xl text-center`}>
          <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} text-sm mb-2`}>
            Informe generado el {new Date().toLocaleDateString('es-MX', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold`}>
            Panel de Administración de Balnearios - Análisis de Ventas
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticalSalesReport;