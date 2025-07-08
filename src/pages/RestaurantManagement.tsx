import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useThemeStore } from '../stores/themeStore';
import { 
  Receipt, 
  Users, 
  ChefHat, 
  Calendar,
  TrendingUp,
  Clock,
  Utensils,
  BarChart3,
  Activity, 
  Zap,
  Wine,
  UtensilsCrossed,
  Coffee,
  Dessert
  Sparkles
} from 'lucide-react';

interface DailyNote {
  id: string;
  tableNumber: number;
  customerCount: number;
  total: number;
  timestamp: string;
  items: string[];
}

interface RestaurantStats {
  dailyNotes: number;
  weeklyNotes: number;
  dailyCustomers: number;
  weeklyCustomers: number;
  dailyTables: number;
  weeklyTables: number;
  dailyRevenue: number;
  weeklyRevenue: number;
}

// Mock data generator
const generateMockData = () => {
  const notes: DailyNote[] = [];
  const today = new Date();
  
  // Generate notes for the last 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() - day);
    
    const notesPerDay = Math.floor(Math.random() * 15) + 10; // 10-25 notes per day
    
    for (let i = 0; i < notesPerDay; i++) {
      const hour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
      const minute = Math.floor(Math.random() * 60);
      const noteDate = new Date(date);
      noteDate.setHours(hour, minute);
      
      notes.push({
        id: `${day}-${i}`,
        tableNumber: Math.floor(Math.random() * 20) + 1,
        customerCount: Math.floor(Math.random() * 6) + 1,
        total: Math.floor(Math.random() * 800) + 200,
        timestamp: noteDate.toISOString(),
        items: ['Plato principal', 'Bebida', 'Postre'].slice(0, Math.floor(Math.random() * 3) + 1)
      });
    }
  }
  
  return notes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const RestaurantManagement: React.FC = () => {
  const [notes, setNotes] = useState<DailyNote[]>([]);
  const { mode } = useThemeStore();
  const [stats, setStats] = useState<RestaurantStats>({
    dailyNotes: 0,
    weeklyNotes: 0,
    dailyCustomers: 0,
    weeklyCustomers: 0,
    dailyTables: 0,
    weeklyTables: 0,
    dailyRevenue: 0,
    weeklyRevenue: 0
  });
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const mockNotes = generateMockData();
      setNotes(mockNotes);
      
      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const dailyNotes = mockNotes.filter(note => {
        const noteDate = new Date(note.timestamp);
        noteDate.setHours(0, 0, 0, 0);
        return noteDate.getTime() === today.getTime();
      });
      
      const weeklyNotes = mockNotes.filter(note => {
        const noteDate = new Date(note.timestamp);
        return noteDate >= weekAgo;
      });
      
      const dailyTables = new Set(dailyNotes.map(note => note.tableNumber)).size;
      const weeklyTables = new Set(weeklyNotes.map(note => note.tableNumber)).size;
      
      setStats({
        dailyNotes: dailyNotes.length,
        weeklyNotes: weeklyNotes.length,
        dailyCustomers: dailyNotes.reduce((sum, note) => sum + note.customerCount, 0),
        weeklyCustomers: weeklyNotes.reduce((sum, note) => sum + note.customerCount, 0),
        dailyTables,
        weeklyTables,
        dailyRevenue: dailyNotes.reduce((sum, note) => sum + note.total, 0),
        weeklyRevenue: weeklyNotes.reduce((sum, note) => sum + note.total, 0)
      });
      
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Restaurante">
        <div className="flex justify-center items-center h-64 backdrop-blur-xl">
          <div className="relative z-10">
            <div className="animate-spin rounded-full border-4 border-[#C1E8FF]/40 border-t-[#C1E8FF] h-16 w-16 shadow-[0_0_30px_rgba(193,232,255,0.6)]"></div>
            <div className="absolute inset-4 animate-spin rounded-full border-2 border-[#7DA0CA]/60 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ChefHat className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} animate-pulse h-7 w-7 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]`} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const metricsCards = [
    {
      title: 'Notas del Día',
      value: stats.dailyNotes,
      weeklyValue: stats.weeklyNotes,
      icon: Receipt,
      bgColor: 'bg-gradient-to-br from-midnight-blue/10 to-navy-blue/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90',
      iconGlow: 'shadow-[0_0_25px_rgba(27,59,111,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-midnight-blue/20',
      pulseColor: 'bg-midnight-blue/30'
    },
    {
      title: 'Personas Atendidas',
      value: stats.dailyCustomers,
      weeklyValue: stats.weeklyCustomers,
      icon: Users,
      bgColor: 'bg-gradient-to-br from-sky-muted/10 to-blue-soft/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-sky-muted/90 to-blue-soft/90',
      iconGlow: 'shadow-[0_0_25px_rgba(84,131,179,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-sky-muted/20',
      pulseColor: 'bg-sky-muted/30'
    },
    {
      title: 'Mesas Atendidas',
      value: stats.dailyTables,
      weeklyValue: stats.weeklyTables,
      icon: Utensils,
      bgColor: 'bg-gradient-to-br from-blue-soft/10 to-sky-light/30',
      iconColor: 'text-deep-navy',
      iconBg: 'bg-gradient-to-br from-blue-soft/90 to-sky-light/90',
      iconGlow: 'shadow-[0_0_25px_rgba(125,160,202,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-blue-soft/20',
      pulseColor: 'bg-blue-soft/30'
    },
    {
      title: 'Ingresos',
      value: stats.dailyRevenue,
      weeklyValue: stats.weeklyRevenue,
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-navy-blue/10 to-deep-navy/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-navy-blue/90 to-deep-navy/90',
      iconGlow: 'shadow-[0_0_25px_rgba(5,38,89,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-navy-blue/20',
      pulseColor: 'bg-navy-blue/30',
      isCurrency: true
    }
  ];

  const todayNotes = notes.filter(note => {
    const noteDate = new Date(note.timestamp);
    const today = new Date();
    return noteDate.toDateString() === today.toDateString();
  });

  const weekNotes = notes.filter(note => {
    const noteDate = new Date(note.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return noteDate >= weekAgo;
  });

  return (
    <DashboardLayout title="Restaurante Cristal">
      <div className="animate-fade-in relative">
        {/* Decorative glass elements */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#C1E8FF]/10 to-[#7DA0CA]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#5483B3]/10 to-[#C1E8FF]/5 rounded-full blur-3xl"></div>
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
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
              <ChefHat className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] h-7 w-7`} />
            </div>
            <div className="relative">
              <h2 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-extrabold text-3xl drop-shadow-[0_0_10px_rgba(193,232,255,0.6)]`} 
                  style={{textShadow: mode === 'dark' ? '0 0 15px rgba(193, 232, 255, 0.4)' : '0 0 10px rgba(193, 232, 255, 0.3)'}}>
                Restaurante Cristal
              </h2>
              <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} font-medium text-lg`}>
                Gestión gastronómica y métricas de servicio
              </p>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C1E8FF]/80 via-[#7DA0CA]/60 to-transparent"></div>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className={`flex items-center gap-2 ${mode === 'dark' 
              ? 'bg-[#052659]/30 border-[#C1E8FF]/40' 
              : 'bg-white/60 border-[#5483B3]/20'} 
              backdrop-blur-xl border-2 rounded-xl p-1 shadow-[0_0_20px_rgba(193,232,255,0.4)]`}>
            <button
              onClick={() => setViewMode('daily')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-500 ${
                viewMode === 'daily'
                  ? mode === 'dark'
                    ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-[#C1E8FF] shadow-[0_0_15px_rgba(193,232,255,0.5)]'
                    : 'bg-gradient-to-r from-[#1B3B6F] to-[#5483B3] text-white shadow-[0_0_15px_rgba(84,131,179,0.5)]'
                  : mode === 'dark'
                    ? 'text-[#C1E8FF] hover:bg-[#5483B3]/20'
                    : 'text-[#1B3B6F] hover:bg-[#C1E8FF]/30'
              }`}
            >
              <Clock className={`h-4 w-4 ${viewMode === 'daily' ? 'animate-pulse' : ''}`} />
              <span className="font-bold text-sm">Diario</span>
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-500 ${
                viewMode === 'weekly'
                  ? mode === 'dark'
                    ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-[#C1E8FF] shadow-[0_0_15px_rgba(193,232,255,0.5)]'
                    : 'bg-gradient-to-r from-[#1B3B6F] to-[#5483B3] text-white shadow-[0_0_15px_rgba(84,131,179,0.5)]'
                  : mode === 'dark'
                    ? 'text-[#C1E8FF] hover:bg-[#5483B3]/20'
                    : 'text-[#1B3B6F] hover:bg-[#C1E8FF]/30'
              }`}
            >
              <Calendar className={`h-4 w-4 ${viewMode === 'weekly' ? 'animate-pulse' : ''}`} />
              <span className="font-bold text-sm">Semanal</span>
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="responsive-grid gap-6 mb-10">
          {metricsCards.map((metric, index) => {
            const Icon = metric.icon;
            const displayValue = viewMode === 'daily' ? metric.value : metric.weeklyValue;
            const formattedValue = metric.isCurrency 
              ? `$${displayValue.toLocaleString()}` 
              : displayValue.toLocaleString();
            
            return (
              <div 
                key={metric.title}
                className={`${mode === 'dark' 
                  ? 'bg-gradient-to-br from-[#052659]/40 to-[#1B3B6F]/30' 
                  : 'bg-gradient-to-br from-white/80 to-[#C1E8FF]/40'} 
                  border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/40' : 'border-[#5483B3]/30'} 
                  rounded-2xl p-5 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
                  backdrop-blur-xl floating-card animate-slide-up hover:scale-105 
                  group relative overflow-hidden transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"></div>
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-[#C1E8FF]/60 rounded-full animate-ping"></div>
                  <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-[#C1E8FF]/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-[#C1E8FF]/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="flex items-center relative z-10 p-1">
                  <div className={`${mode === 'dark' 
                    ? 'bg-gradient-to-br from-[#C1E8FF]/30 to-[#5483B3]/20' 
                    : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/60'} 
                    shadow-[0_0_20px_rgba(193,232,255,0.6)] border-3 border-[#C1E8FF]/60 
                    backdrop-blur-xl flex-shrink-0 transition-all duration-500 
                    group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden rounded-xl p-3 mr-4`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                    
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    
                    {/* Inner border */}
                    <Icon className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} 
                                     relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] 
                                     transition-all duration-300 group-hover:scale-125 h-6 w-6`} 
                          style={{filter: `drop-shadow(0 0 4px ${mode === 'dark' ? 'rgba(193, 232, 255, 0.8)' : 'rgba(27, 59, 111, 0.6)'})`}} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#1B3B6F]'} 
                                  truncate font-bold transition-all duration-300 
                                  group-hover:text-opacity-80 text-sm mb-1.5`}>
                    </p>
                    <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                                  truncate font-black transition-all duration-300 
                                  group-hover:scale-110 origin-left text-2xl`}
                        style={{textShadow: mode === 'dark' 
                          ? '0 0 10px rgba(193, 232, 255, 0.4)' 
                          : '0 0 8px rgba(193, 232, 255, 0.3)'}}>
                      {formattedValue}
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C1E8FF]/20 to-[#5483B3]/10 opacity-30 rounded-xl animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes Section */}
        <div className="responsive-grid-2 gap-8">
          {/* Recent Notes List */}
          <div className={`${mode === 'dark' 
              ? 'bg-gradient-to-br from-[#052659]/60 to-[#1B3B6F]/40' 
              : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
              border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
              rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
              backdrop-blur-xl floating-card transition-all duration-500 hover:shadow-[0_16px_48px_rgba(193,232,255,0.6)]`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`${mode === 'dark' 
                  ? 'bg-gradient-to-br from-[#C1E8FF]/30 to-[#5483B3]/20' 
                  : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/60'} 
                  shadow-[0_0_20px_rgba(193,232,255,0.6)] border-3 border-[#C1E8FF]/60 
                  backdrop-blur-xl flex items-center justify-center transition-all duration-500 
                  hover:scale-110 hover:rotate-6 group relative overflow-hidden rounded-xl p-3`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                <div className="absolute inset-0 rounded-lg border border-[#C1E8FF]/80"></div>
                <Receipt className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} 
                                   relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] h-6 w-6`} />
              </div>
              <div className="relative">
                <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                               font-bold text-xl drop-shadow-[0_0_10px_rgba(193,232,255,0.6)]`}
                    style={{textShadow: mode === 'dark' ? '0 0 10px rgba(193, 232, 255, 0.4)' : '0 0 8px rgba(193, 232, 255, 0.3)'}}>
                  Notas Recientes {viewMode === 'daily' ? '(Hoy)' : '(Esta Semana)'}
                </h3>
                <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} font-medium text-sm`}>
                  {viewMode === 'daily' ? todayNotes.length : weekNotes.length} notas registradas
                </p>
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C1E8FF]/60 via-[#7DA0CA]/40 to-transparent"></div>
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
              {(viewMode === 'daily' ? todayNotes : weekNotes).slice(0, 10).map((note, index) => (
                <div 
                  key={note.id}
                  className={`${mode === 'dark' 
                      ? 'bg-gradient-to-r from-[#5483B3]/20 to-[#1B3B6F]/10' 
                      : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/30'} 
                      border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                      rounded-xl p-4 hover:shadow-[0_8px_20px_rgba(193,232,255,0.5)] 
                      transition-all duration-300 hover:scale-105 animate-slide-up backdrop-blur-lg
                      relative overflow-hidden group`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Glass edge highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-white/50"></div>
                  <div className="absolute inset-y-0 right-0 w-px bg-white/30"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`${mode === 'dark' 
                          ? 'bg-gradient-to-r from-[#C1E8FF]/30 to-[#7DA0CA]/20 text-[#C1E8FF] border-[#C1E8FF]/50' 
                          : 'bg-gradient-to-r from-[#1B3B6F] to-[#5483B3] text-white border-[#5483B3]/50'} 
                          px-3 py-1.5 rounded-lg text-xs font-bold border backdrop-blur-md shadow-[0_4px_12px_rgba(193,232,255,0.4)]`}>
                        Mesa {note.tableNumber}
                      </span>
                      <span className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} text-xs font-medium`}>
                        {new Date(note.timestamp).toLocaleTimeString('es-MX', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-lg`}
                          style={{textShadow: mode === 'dark' ? '0 0 8px rgba(193, 232, 255, 0.3)' : '0 0 6px rgba(193, 232, 255, 0.2)'}}>
                      ${note.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs mt-3">
                    <div className={`flex items-center gap-1.5 ${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} bg-[#C1E8FF]/10 px-2 py-1 rounded-lg backdrop-blur-sm`}>
                      <Users className="h-3.5 w-3.5" />
                      <span className="font-medium">{note.customerCount} personas</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} bg-[#C1E8FF]/10 px-2 py-1 rounded-lg backdrop-blur-sm`}>
                      <UtensilsCrossed className="h-3.5 w-3.5" />
                      <span className="font-medium">{note.items.length} platillos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Chart */}
          <div className={`${mode === 'dark' 
              ? 'bg-gradient-to-br from-[#1B3B6F]/60 to-[#5483B3]/40' 
              : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/30'} 
              border-3 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
              rounded-2xl p-6 shadow-[0_8px_32px_rgba(193,232,255,0.4)] 
              backdrop-blur-xl floating-card transition-all duration-500 hover:shadow-[0_16px_48px_rgba(193,232,255,0.6)]`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`${mode === 'dark' 
                  ? 'bg-gradient-to-br from-[#C1E8FF]/30 to-[#5483B3]/20' 
                  : 'bg-gradient-to-br from-white/90 to-[#C1E8FF]/60'} 
                  shadow-[0_0_20px_rgba(193,232,255,0.6)] border-3 border-[#C1E8FF]/60 
                  backdrop-blur-xl flex items-center justify-center transition-all duration-500 
                  hover:scale-110 hover:rotate-6 group relative overflow-hidden rounded-xl p-3`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                <div className="absolute inset-0 rounded-lg border border-[#C1E8FF]/80"></div>
                <BarChart3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} 
                                     relative z-10 drop-shadow-[0_0_8px_rgba(193,232,255,0.8)] h-6 w-6`} />
              </div>
              <div className="relative">
                <h3 className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} 
                               font-bold text-xl drop-shadow-[0_0_10px_rgba(193,232,255,0.6)]`}
                    style={{textShadow: mode === 'dark' ? '0 0 10px rgba(193, 232, 255, 0.4)' : '0 0 8px rgba(193, 232, 255, 0.3)'}}>
                  Resumen de Actividad
                </h3>
                <p className={`${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'} font-medium text-sm`}>
                  Métricas de rendimiento
                </p>
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C1E8FF]/60 via-[#7DA0CA]/40 to-transparent"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className={`${mode === 'dark' 
                  ? 'bg-gradient-to-r from-[#C1E8FF]/10 to-[#7DA0CA]/5' 
                  : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/40'} 
                  border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                  rounded-xl p-5 backdrop-blur-xl shadow-[0_4px_16px_rgba(193,232,255,0.3)] 
                  hover:shadow-[0_8px_24px_rgba(193,232,255,0.5)] transition-all duration-300 
                  hover:scale-[1.02] group relative overflow-hidden`}>
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glass edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-white/50"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-white/30"></div>
                
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <Wine className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} h-5 w-5`} />
                    <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} font-semibold text-base`}>
                      Promedio por Mesa
                    </span>
                  </div>
                  <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}
                        style={{textShadow: mode === 'dark' ? '0 0 8px rgba(193, 232, 255, 0.3)' : '0 0 6px rgba(193, 232, 255, 0.2)'}}>
                    ${Math.round((viewMode === 'daily' ? stats.dailyRevenue : stats.weeklyRevenue) / 
                    (viewMode === 'daily' ? stats.dailyTables : stats.weeklyTables) || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#C1E8FF]/20 rounded-full h-3 relative z-10 overflow-hidden shadow-inner">
                  <div className={`${mode === 'dark' 
                      ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA]' 
                      : 'bg-gradient-to-r from-[#1B3B6F] to-[#5483B3]'} 
                      h-3 rounded-full relative overflow-hidden`} 
                      style={{ width: '75%' }}>
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className={`${mode === 'dark' 
                  ? 'bg-gradient-to-r from-[#7DA0CA]/10 to-[#5483B3]/5' 
                  : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/40'} 
                  border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                  rounded-xl p-5 backdrop-blur-xl shadow-[0_4px_16px_rgba(193,232,255,0.3)] 
                  hover:shadow-[0_8px_24px_rgba(193,232,255,0.5)] transition-all duration-300 
                  hover:scale-[1.02] group relative overflow-hidden`}>
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glass edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-white/50"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-white/30"></div>
                
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <Coffee className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} h-5 w-5`} />
                    <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} font-semibold text-base`}>
                      Promedio por Persona
                    </span>
                  </div>
                  <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}
                        style={{textShadow: mode === 'dark' ? '0 0 8px rgba(193, 232, 255, 0.3)' : '0 0 6px rgba(193, 232, 255, 0.2)'}}>
                    ${Math.round((viewMode === 'daily' ? stats.dailyRevenue : stats.weeklyRevenue) / 
                    (viewMode === 'daily' ? stats.dailyCustomers : stats.weeklyCustomers) || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#C1E8FF]/20 rounded-full h-3 relative z-10 overflow-hidden shadow-inner">
                  <div className={`${mode === 'dark' 
                      ? 'bg-gradient-to-r from-[#7DA0CA] to-[#C1E8FF]' 
                      : 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA]'} 
                      h-3 rounded-full relative overflow-hidden`} 
                      style={{ width: '60%' }}>
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className={`${mode === 'dark' 
                  ? 'bg-gradient-to-r from-[#5483B3]/10 to-[#C1E8FF]/5' 
                  : 'bg-gradient-to-r from-white/80 to-[#C1E8FF]/40'} 
                  border-2 ${mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/20'} 
                  rounded-xl p-5 backdrop-blur-xl shadow-[0_4px_16px_rgba(193,232,255,0.3)] 
                  hover:shadow-[0_8px_24px_rgba(193,232,255,0.5)] transition-all duration-300 
                  hover:scale-[1.02] group relative overflow-hidden`}>
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glass edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-white/50"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-white/30"></div>
                
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <Dessert className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} h-5 w-5`} />
                    <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'} font-semibold text-base`}>
                      Ocupación de Mesas
                    </span>
                  </div>
                  <span className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'} font-bold text-xl`}
                        style={{textShadow: mode === 'dark' ? '0 0 8px rgba(193, 232, 255, 0.3)' : '0 0 6px rgba(193, 232, 255, 0.2)'}}>
                    {Math.round(((viewMode === 'daily' ? stats.dailyTables : stats.weeklyTables) / 20) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-[#C1E8FF]/20 rounded-full h-3 relative z-10 overflow-hidden shadow-inner">
                  <div className={`${mode === 'dark' 
                      ? 'bg-gradient-to-r from-[#C1E8FF] to-white' 
                      : 'bg-gradient-to-r from-[#7DA0CA] to-[#C1E8FF]'} 
                      h-3 rounded-full relative overflow-hidden`} 
                      style={{ width: `${Math.round(((viewMode === 'daily' ? stats.dailyTables : stats.weeklyTables) / 20) * 100)}%` }}>
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#C1E8FF]/20 to-transparent blur-xl"></div>
        <div className="absolute bottom-1/3 left-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#5483B3]/20 to-transparent blur-xl"></div>
        
        {/* Decorative utensils */}
        <div className="absolute -bottom-10 right-10 opacity-10">
          <UtensilsCrossed className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#5483B3]'} h-40 w-40 rotate-12`} />
        </div>
        <div className="absolute -top-5 left-1/3 opacity-10">
          <Wine className={`${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#5483B3]'} h-24 w-24 -rotate-12`} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RestaurantManagement;