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
  Zap
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
    { name: 'Lun', value: 85, secondary: 92 },
    { name: 'Mar', value: 78, secondary: 88 },
    { name: 'Mié', value: 92, secondary: 85 },
    { name: 'Jue', value: 88, secondary: 95 },
    { name: 'Vie', value: 95, secondary: 90 },
    { name: 'Sáb', value: 82, secondary: 87 },
    { name: 'Dom', value: 89, secondary: 93 }
  ];

  const monthlyData = [
    { name: 'Ene', value: 850, secondary: 920 },
    { name: 'Feb', value: 780, secondary: 880 },
    { name: 'Mar', value: 920, secondary: 850 },
    { name: 'Abr', value: 880, secondary: 950 },
    { name: 'May', value: 950, secondary: 900 },
    { name: 'Jun', value: 820, secondary: 870 }
  ];

  const projectTasks = [
    { id: 1, task: 'Diseño de interfaz', status: 'Completado', progress: 100, assignee: 'Ana García', dueDate: '2025-01-10' },
    { id: 2, task: 'Desarrollo backend', status: 'En progreso', progress: 75, assignee: 'Carlos López', dueDate: '2025-01-20' },
    { id: 3, task: 'Testing QA', status: 'Pendiente', progress: 25, assignee: 'María Rodríguez', dueDate: '2025-01-25' },
    { id: 4, task: 'Documentación', status: 'En progreso', progress: 60, assignee: 'Juan Pérez', dueDate: '2025-01-18' },
    { id: 5, task: 'Deploy producción', status: 'Pendiente', progress: 0, assignee: 'Luis Martín', dueDate: '2025-01-30' }
  ];

  return { weeklyData, monthlyData, projectTasks };
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
      render: (value: string) => (
        <div className="font-semibold text-theme-text-primary">{value}</div>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      sortable: true,
      align: 'center' as const,
      render: (value: string) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'Completado':
              return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'En progreso':
              return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default:
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
          }
        };
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(value)}`}>
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
          <div className="w-8 h-8 bg-gradient-to-br from-theme-accent to-theme-highlight rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-theme-text-primary font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'dueDate',
      label: 'Fecha límite',
      sortable: true,
      render: (value: string) => (
        <span className="text-theme-text-secondary">{new Date(value).toLocaleDateString('es-ES')}</span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-theme-primary via-theme-secondary to-theme-tertiary flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full border-4 border-theme-light/30 border-t-theme-accent h-16 w-16"></div>
          <div className="absolute inset-4 animate-spin rounded-full border-2 border-theme-highlight/50 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="text-theme-accent animate-pulse h-6 w-6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-primary via-theme-secondary to-theme-tertiary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-theme-light mb-2 gradient-text">
            Tablero de Proyecto
          </h1>
          <p className="text-theme-highlight text-lg font-medium">
            Panel de control profesional con métricas en tiempo real
          </p>
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
            primaryColor="#5483B3"
            secondaryColor="#7DA0CA"
            className="animate-slide-in-right animate-delay-100"
          />
          
          <InteractiveChart
            data={data.monthlyData}
            type="bar"
            title="Rendimiento Mensual"
            subtitle="Métricas de los últimos 6 meses"
            height={300}
            primaryColor="#1B3B6F"
            secondaryColor="#5483B3"
            className="animate-slide-in-right animate-delay-200"
          />
        </div>

        {/* Progress Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Desarrollo Frontend"
            value="85%"
            subtitle="React + TypeScript"
            icon={Activity}
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
          <div className="bg-gradient-to-br from-theme-bg-secondary/80 to-theme-bg-tertiary/60 backdrop-blur-md border border-theme-border rounded-xl p-6 text-center animate-rotate-in animate-delay-100">
            <BarChart3 className="h-12 w-12 text-theme-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-theme-text-primary mb-2">95%</h3>
            <p className="text-theme-text-secondary">Satisfacción del cliente</p>
          </div>
          
          <div className="bg-gradient-to-br from-theme-accent/15 to-theme-highlight/25 backdrop-blur-md border border-theme-border rounded-xl p-6 text-center animate-rotate-in animate-delay-200">
            <Calendar className="h-12 w-12 text-theme-highlight mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-theme-text-primary mb-2">18</h3>
            <p className="text-theme-text-secondary">Días por delante del cronograma</p>
          </div>
          
          <div className="bg-gradient-to-br from-theme-highlight/15 to-theme-light/25 backdrop-blur-md border border-theme-border rounded-xl p-6 text-center animate-rotate-in animate-delay-300">
            <TrendingUp className="h-12 w-12 text-theme-light mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-theme-text-primary mb-2">+24%</h3>
            <p className="text-theme-text-secondary">Mejora en productividad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;