import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Receipt, 
  Users, 
  ChefHat, 
  Calendar,
  TrendingUp,
  Clock,
  Utensils,
  BarChart3,
  Filter,
  Eye,
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
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full border-4 border-sky-light/30 border-t-midnight-blue h-12 w-12"></div>
            <div className="absolute inset-3 animate-spin rounded-full border-2 border-sky-muted/50 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ChefHat className="text-midnight-blue animate-pulse h-5 w-5" />
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
    <DashboardLayout title="Restaurante">
      <div className="animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90 shadow-[0_0_25px_rgba(27,59,111,0.4)] border-2 border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 group relative overflow-hidden rounded-2xl p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
              <ChefHat className="text-white relative z-10 drop-shadow-lg h-6 w-6" />
            </div>
            <div>
              <h2 className="gradient-text font-bold text-2xl">Notas del Día</h2>
              <p className="text-sky-muted font-medium">Gestión del restaurante y métricas diarias</p>
            </div>
            <Sparkles className="text-sky-muted animate-pulse opacity-70 h-6 w-6" />
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-sky-light/40 rounded-xl p-1">
            <button
              onClick={() => setViewMode('daily')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                viewMode === 'daily'
                  ? 'bg-gradient-to-r from-midnight-blue to-navy-blue text-white shadow-md'
                  : 'text-midnight-blue hover:bg-sky-light/30'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="font-semibold text-sm">Diario</span>
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                viewMode === 'weekly'
                  ? 'bg-gradient-to-r from-midnight-blue to-navy-blue text-white shadow-md'
                  : 'text-midnight-blue hover:bg-sky-light/30'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="font-semibold text-sm">Semanal</span>
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="responsive-grid mb-8">
          {metricsCards.map((metric, index) => {
            const Icon = metric.icon;
            const displayValue = viewMode === 'daily' ? metric.value : metric.weeklyValue;
            const formattedValue = metric.isCurrency 
              ? `$${displayValue.toLocaleString()}` 
              : displayValue.toLocaleString();
            
            return (
              <div 
                key={metric.title}
                className={`card-compact ${metric.bgColor} border-2 ${metric.borderColor} floating-card animate-slide-up hover:scale-105 group relative overflow-hidden transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-2 right-2 w-1 h-1 ${metric.pulseColor} rounded-full animate-ping`}></div>
                  <div className={`absolute bottom-3 left-3 w-0.5 h-0.5 ${metric.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '0.5s' }}></div>
                  <div className={`absolute top-1/2 right-1/4 w-0.5 h-0.5 ${metric.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="flex items-center relative z-10">
                  <div className={`${metric.iconBg} ${metric.iconGlow} border-2 border-white/30 backdrop-blur-sm flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden rounded-xl p-2.5 mr-3`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                    <Icon className={`${metric.iconColor} relative z-10 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl group-hover:scale-110 h-5 w-5`} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sky-muted truncate font-semibold transition-all duration-300 group-hover:text-opacity-80 text-xs mb-1">
                      {metric.title} ({viewMode === 'daily' ? 'Hoy' : 'Semana'})
                    </p>
                    <h3 className={`${metric.textColor} truncate font-bold transition-all duration-300 group-hover:scale-105 origin-left text-lg`}>
                      {formattedValue}
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 ${metric.iconBg} opacity-5 rounded-xl animate-pulse`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes Section */}
        <div className="responsive-grid-2 gap-6">
          {/* Recent Notes List */}
          <div className="card floating-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-sky-muted/90 to-blue-soft/90 shadow-[0_0_20px_rgba(84,131,179,0.3)] border-2 border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 group relative overflow-hidden rounded-xl p-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                <Receipt className="text-white relative z-10 drop-shadow-lg h-5 w-5" />
              </div>
              <div>
                <h3 className="gradient-text font-bold text-lg">
                  Notas Recientes {viewMode === 'daily' ? '(Hoy)' : '(Esta Semana)'}
                </h3>
                <p className="text-sky-muted font-medium text-sm">
                  {viewMode === 'daily' ? todayNotes.length : weekNotes.length} notas registradas
                </p>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {(viewMode === 'daily' ? todayNotes : weekNotes).slice(0, 10).map((note, index) => (
                <div 
                  key={note.id}
                  className="bg-gradient-to-r from-sky-light/20 to-blue-soft/10 border border-sky-light/40 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:scale-102 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-gradient-to-r from-midnight-blue to-navy-blue text-white px-2 py-1 rounded-lg text-xs font-bold">
                        Mesa {note.tableNumber}
                      </span>
                      <span className="text-sky-muted text-xs font-medium">
                        {new Date(note.timestamp).toLocaleTimeString('es-MX', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <span className="text-midnight-blue font-bold text-sm">
                      ${note.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-sky-muted">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{note.customerCount} personas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Utensils className="h-3 w-3" />
                      <span>{note.items.length} platillos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Chart */}
          <div className="card floating-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-soft/90 to-sky-light/90 shadow-[0_0_20px_rgba(125,160,202,0.3)] border-2 border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 group relative overflow-hidden rounded-xl p-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                <BarChart3 className="text-deep-navy relative z-10 drop-shadow-lg h-5 w-5" />
              </div>
              <div>
                <h3 className="gradient-text font-bold text-lg">Resumen de Actividad</h3>
                <p className="text-sky-muted font-medium text-sm">Métricas de rendimiento</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-midnight-blue/5 to-navy-blue/10 border border-midnight-blue/20 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-midnight-blue font-semibold text-sm">Promedio por Mesa</span>
                  <span className="text-deep-navy font-bold">
                    ${Math.round((viewMode === 'daily' ? stats.dailyRevenue : stats.weeklyRevenue) / 
                    (viewMode === 'daily' ? stats.dailyTables : stats.weeklyTables) || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-sky-light/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-midnight-blue to-navy-blue h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-sky-muted/5 to-blue-soft/10 border border-sky-muted/20 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sky-muted font-semibold text-sm">Promedio por Persona</span>
                  <span className="text-deep-navy font-bold">
                    ${Math.round((viewMode === 'daily' ? stats.dailyRevenue : stats.weeklyRevenue) / 
                    (viewMode === 'daily' ? stats.dailyCustomers : stats.weeklyCustomers) || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-sky-light/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-sky-muted to-blue-soft h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-soft/5 to-sky-light/15 border border-blue-soft/20 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-soft font-semibold text-sm">Ocupación de Mesas</span>
                  <span className="text-deep-navy font-bold">
                    {Math.round(((viewMode === 'daily' ? stats.dailyTables : stats.weeklyTables) / 20) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-sky-light/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-soft to-sky-light h-2 rounded-full" 
                       style={{ width: `${Math.round(((viewMode === 'daily' ? stats.dailyTables : stats.weeklyTables) / 20) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RestaurantManagement;