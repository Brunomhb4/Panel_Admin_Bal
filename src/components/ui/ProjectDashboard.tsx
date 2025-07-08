import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Zap,
  Award,
  Briefcase,
  Code,
  GitBranch
} from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import DashboardCard from './DashboardCard';
import InteractiveChart from './InteractiveChart';
import MetricCard from './MetricCard';
import ProgressIndicator from './ProgressIndicator';
import DataTable from './DataTable';

// Mock data for the project dashboard
const generateProjectData = () => {
  const weeklyData = [
    { name: 'Lun', value: 85, secondary: 92, commits: 12 },
    { name: 'Mar', value: 78, secondary: 88, commits: 8 },
    { name: 'Mié', value: 92, secondary: 85, commits: 15 },
    { name: 'Jue', value: 88, secondary: 95, commits: 11 },
    { name: 'Vie', value: 95, secondary: 90, commits: 18 },
    { name: 'Sáb', value: 82, secondary: 87, commits: 6 },
    { name: 'Dom', value: 89, secondary: 93, commits: 4 }
  ];

  const monthlyData = [
    { name: 'Ene', value: 850, secondary: 920, bugs: 45 },
    { name: 'Feb', value: 780, secondary: 880, bugs: 38 },
    { name: 'Mar', value: 920, secondary: 850, bugs: 52 },
    { name: 'Abr', value: 880, secondary: 950, bugs: 41 },
    { name: 'May', value: 950, secondary: 900, bugs: 35 },
    { name: 'Jun', value: 820, secondary: 870, bugs: 29 }
  ];

  const performanceData = [
    { name: 'Frontend', value: 85, color: '#5483B3' },
    { name: 'Backend', value: 72, color: '#7DA0CA' },
    { name: 'Testing', value: 45, color: '#1B3B6F' },
    { name: 'DevOps', value: 68, color: '#C1E8FF' }
  ];

  const projectTasks = [
    { 
      id: 1, 
      task: 'Diseño de interfaz', 
      status: 'Completado', 
      progress: 100, 
      assignee: 'Ana García', 
      dueDate: '2025-01-10',
      priority: 'Alta',
      category: 'UI/UX'
    },
    { 
      id: 2, 
      task: 'Desarrollo backend', 
      status: 'En progreso', 
      progress: 75, 
      assignee: 'Carlos López', 
      dueDate: '2025-01-20',
      priority: 'Alta',
      category: 'Backend'
    },
    { 
      id: 3, 
      task: 'Testing QA', 
      status: 'Pendiente', 
      progress: 25, 
      assignee: 'María Rodríguez', 
      dueDate: '2025-01-25',
      priority: 'Media',
      category: 'Testing'
    },
    { 
      id: 4, 
      task: 'Documentación', 
      status: 'En progreso', 
      progress: 60, 
      assignee: 'Juan Pérez', 
      dueDate: '2025-01-18',
      priority: 'Baja',
      category: 'Docs'
    },
    { 
      id: 5, 
      task: 'Deploy producción', 
      status: 'Pendiente', 
      progress: 0, 
      assignee: 'Luis Martín', 
      dueDate: '2025-01-30',
      priority: 'Alta',
      category: 'DevOps'
    }
  ];

  return { weeklyData, monthlyData, performanceData, projectTasks };
};

const ProjectDashboard: React.FC = () => {
  const { mode } = useThemeStore();
  const [data, setData] = useState(generateProjectData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const tableColumns = [
    {
      key: 'task',
      label: 'Tarea',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex flex-col">
          <div className="font-semibold text-theme-text-primary">{value}</div>
          <div className="text-xs text-theme-text-muted">{row.category}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      sortable: true,
      align: 'center' as const,
      render: (value: string) => {
        const getStatusStyle = (status: string) => {
          switch (status) {
            case 'Completado':
              return mode === 'dark' 
                ? 'bg-green-900/30 text-green-400 border-green-700/50' 
                : 'bg-green-100 text-green-800 border-green-300';
            case 'En progreso':
              return mode === 'dark' 
                ? 'bg-blue-900/30 text-blue-400 border-blue-700/50' 
                : 'bg-blue-100 text-blue-800 border-blue-300';
            default:
              return mode === 'dark' 
                ? 'bg-gray-800/50 text-gray-400 border-gray-600/50' 
                : 'bg-gray-100 text-gray-700 border-gray-300';
          }
        };
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(value)}`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'progress',
      label: 'Progreso',
      sortable: true,
      align: 'center' as const,
      render: (value: number) => (
        <div className="w-full max-w-20">
          <ProgressIndicator
            value={value}
            max={100}
            label=""
            showPercentage={true}
            size="sm"
            animated={false}
            variant={value === 100 ? 'success' : value > 50 ? 'default' : 'warning'}
          />
        </div>
      )
    },
    {
      key: 'assignee',
      label: 'Asignado',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-br from-theme-accent to-theme-highlight' 
                            : 'bg-gradient-to-br from-blue-600 to-indigo-600'
                          }`}>
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-theme-text-primary font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'priority',
      label: 'Prioridad',
      sortable: true,
      render: (value: string) => {
        const getPriorityStyle = (priority: string) => {
          switch (priority) {
            case 'Alta':
              return mode === 'dark' 
                ? 'bg-red-900/30 text-red-400' 
                : 'bg-red-100 text-red-800';
            case 'Media':
              return mode === 'dark' 
                ? 'bg-yellow-900/30 text-yellow-400' 
                : 'bg-yellow-100 text-yellow-800';
            default:
              return mode === 'dark' 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-green-100 text-green-800';
          }
        };
        
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityStyle(value)}`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'dueDate',
      label: 'Fecha límite',
      sortable: true,
      render: (value: string) => (
        <span className="text-theme-text-secondary text-sm">
          {new Date(value).toLocaleDateString('es-ES')}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300
                      ${mode === 'dark' 
                        ? 'bg-gradient-to-br from-theme-primary via-theme-secondary to-theme-tertiary' 
                        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
                      }`}>
        <div className="relative">
          <div className={`animate-spin rounded-full border-4 h-16 w-16
                          ${mode === 'dark' 
                            ? 'border-theme-light/30 border-t-theme-accent' 
                            : 'border-gray-200 border-t-blue-600'
                          }`}></div>
          <div className={`absolute inset-4 animate-spin rounded-full border-2 border-b-transparent
                          ${mode === 'dark' 
                            ? 'border-theme-highlight/50' 
                            : 'border-blue-300'
                          }`} 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className={`animate-pulse h-6 w-6
                            ${mode === 'dark' ? 'text-theme-accent' : 'text-blue-600'}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 transition-all duration-300
                    ${mode === 'dark' 
                      ? 'bg-gradient-to-br from-theme-primary via-theme-secondary to-theme-tertiary' 
                      : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
                    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-2xl shadow-lg
                            ${mode === 'dark' 
                              ? 'bg-gradient-to-br from-theme-accent/20 to-theme-highlight/30 border border-theme-border' 
                              : 'bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200'
                            }`}>
              <Briefcase className={`h-8 w-8
                                   ${mode === 'dark' ? 'text-theme-light' : 'text-blue-700'}`} />
            </div>
            <div>
              <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300
                             ${mode === 'dark' ? 'text-theme-light gradient-text' : 'text-gray-900'}`}>
                Tablero de Proyecto
              </h1>
              <p className={`text-lg font-medium transition-colors duration-300
                            ${mode === 'dark' ? 'text-theme-highlight' : 'text-gray-600'}`}>
                Panel de control profesional con métricas en tiempo real
              </p>
            </div>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Tareas Completadas"
            value="24"
            subtitle="de 35 tareas totales"
            icon={CheckCircle}
            trend={{ value: 12, period: "semana pasada", isPositive: true }}
            variant="success"
            className="animate-slide-up animate-delay-100"
          />
          
          <MetricCard
            title="Progreso General"
            value="68%"
            subtitle="del proyecto total"
            icon={TrendingUp}
            trend={{ value: 8, period: "mes anterior", isPositive: true }}
            variant="primary"
            className="animate-slide-up animate-delay-200"
          />
          
          <MetricCard
            title="Equipo Activo"
            value="12"
            subtitle="miembros trabajando"
            icon={Users}
            trend={{ value: 2, period: "este mes", isPositive: true }}
            variant="accent"
            className="animate-slide-up animate-delay-300"
          />
          
          <MetricCard
            title="Días Restantes"
            value="18"
            subtitle="para entrega final"
            icon={Clock}
            trend={{ value: 3, period: "estimación inicial", isPositive: false }}
            variant="warning"
            className="animate-slide-up animate-delay-400"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <InteractiveChart
            data={data.weeklyData}
            type="area"
            title="Productividad Semanal"
            subtitle="Tareas completadas por día"
            height={300}
            primaryColor={mode === 'dark' ? '#5483B3' : '#3B82F6'}
            secondaryColor={mode === 'dark' ? '#7DA0CA' : '#60A5FA'}
            className="animate-slide-in-right animate-delay-100"
          />
          
          <InteractiveChart
            data={data.monthlyData}
            type="bar"
            title="Rendimiento Mensual"
            subtitle="Métricas de los últimos 6 meses"
            height={300}
            primaryColor={mode === 'dark' ? '#1B3B6F' : '#1E40AF'}
            secondaryColor={mode === 'dark' ? '#5483B3' : '#3B82F6'}
            className="animate-slide-in-right animate-delay-200"
          />
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Desarrollo Frontend"
            value="85%"
            subtitle="React + TypeScript"
            icon={Code}
            variant="primary"
            className="animate-fade-in-scale animate-delay-100"
          >
            <ProgressIndicator
              value={85}
              max={100}
              label="Progreso actual"
              variant="default"
              animated={true}
            />
          </DashboardCard>
          
          <DashboardCard
            title="Backend API"
            value="72%"
            subtitle="Node.js + Express"
            icon={Target}
            variant="accent"
            className="animate-fade-in-scale animate-delay-200"
          >
            <ProgressIndicator
              value={72}
              max={100}
              label="Progreso actual"
              variant="success"
              animated={true}
            />
          </DashboardCard>
          
          <DashboardCard
            title="Testing & QA"
            value="45%"
            subtitle="Pruebas automatizadas"
            icon={AlertCircle}
            variant="highlight"
            className="animate-fade-in-scale animate-delay-300"
          >
            <ProgressIndicator
              value={45}
              max={100}
              label="Progreso actual"
              variant="warning"
              animated={true}
            />
          </DashboardCard>
        </div>

        {/* Tasks Table */}
        <div className="animate-slide-in-bottom animate-delay-400">
          <DataTable
            data={data.projectTasks}
            columns={tableColumns}
            title="Gestión de Tareas"
            subtitle="Estado actual de todas las tareas del proyecto"
            searchable={true}
            filterable={true}
            pagination={true}
            pageSize={5}
          />
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 text-center animate-rotate-in animate-delay-100 rounded-xl border transition-all duration-300
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-br from-theme-bg-secondary/80 to-theme-bg-tertiary/60 backdrop-blur-md border-theme-border' 
                            : 'bg-white/80 backdrop-blur-md border-gray-200 shadow-lg'
                          }`}>
            <BarChart3 className={`h-12 w-12 mx-auto mb-4
                                  ${mode === 'dark' ? 'text-theme-accent' : 'text-blue-600'}`} />
            <h3 className={`text-2xl font-bold mb-2
                           ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>95%</h3>
            <p className={`${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
              Satisfacción del cliente
            </p>
          </div>
          
          <div className={`p-6 text-center animate-rotate-in animate-delay-200 rounded-xl border transition-all duration-300
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-br from-theme-accent/15 to-theme-highlight/25 backdrop-blur-md border-theme-border' 
                            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg'
                          }`}>
            <Calendar className={`h-12 w-12 mx-auto mb-4
                                 ${mode === 'dark' ? 'text-theme-highlight' : 'text-indigo-600'}`} />
            <h3 className={`text-2xl font-bold mb-2
                           ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>18</h3>
            <p className={`${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
              Días por delante del cronograma
            </p>
          </div>
          
          <div className={`p-6 text-center animate-rotate-in animate-delay-300 rounded-xl border transition-all duration-300
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-br from-theme-highlight/15 to-theme-light/25 backdrop-blur-md border-theme-border' 
                            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg'
                          }`}>
            <TrendingUp className={`h-12 w-12 mx-auto mb-4
                                   ${mode === 'dark' ? 'text-theme-light' : 'text-green-600'}`} />
            <h3 className={`text-2xl font-bold mb-2
                           ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>+24%</h3>
            <p className={`${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
              Mejora en productividad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;