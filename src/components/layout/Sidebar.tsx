import React, { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useWaterParksStore } from '../stores/waterParksStore';
import { Plus, BarChart3, TrendingUp, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/ui/DashboardCard';
import MetricCard from '../components/ui/MetricCard';
import InteractiveChart from '../components/ui/InteractiveChart';
import DataTable from '../components/ui/DataTable';
import ProgressIndicator from '../components/ui/ProgressIndicator';

const SuperAdminDashboard: React.FC = () => {
  const { fetchWaterParks, loading } = useWaterParksStore();
  
  useEffect(() => {
    fetchWaterParks();
  }, [fetchWaterParks]);
  
  const { waterParks } = useWaterParksStore();
  
  // Calculate metrics
  const totalActiveTickets = waterParks.reduce((sum, park) => sum + park.activeTickets, 0);
  const totalRevenue = waterParks.reduce((sum, park) => sum + park.totalRevenue, 0);
  const totalSoldTickets = waterParks.reduce((sum, park) => sum + park.soldTickets, 0);
  const totalPrintedTickets = waterParks.reduce((sum, park) => sum + park.printedTickets, 0);
  
  // Mock chart data
  const revenueData = [
    { name: 'Ene', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Abr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
  ];
  
  const ticketsData = [
    { name: 'Lun', value: 120 },
    { name: 'Mar', value: 150 },
    { name: 'Mié', value: 180 },
    { name: 'Jue', value: 165 },
    { name: 'Vie', value: 200 },
    { name: 'Sáb', value: 250 },
    { name: 'Dom', value: 220 },
  ];
  
  // Table columns
  const tableColumns = [
    {
      key: 'name',
      label: 'Balneario',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-theme-accent to-theme-highlight rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {value.charAt(0)}
          </div>
          <span className="font-semibold">{value}</span>
        </div>
      )
    },
    {
      key: 'activeTickets',
      label: 'Tickets Activos',
      sortable: true,
      align: 'right' as const,
      render: (value: number) => (
        <span className="font-semibold text-theme-accent">{value.toLocaleString()}</span>
      )
    },
    {
      key: 'totalRevenue',
      label: 'Ingresos',
      sortable: true,
      align: 'right' as const,
      render: (value: number) => (
        <span className="font-bold text-green-600">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'soldTickets',
      label: 'Tickets Vendidos',
      sortable: true,
      align: 'right' as const
    }
  ];
  
  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="animate-fade-in space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-theme-text-primary mb-2">
              Panel de Control Principal
            </h1>
            <p className="text-theme-text-muted">
              Gestión integral de todos los balnearios del sistema
            </p>
          </div>
          <Link 
            to="/superadmin/waterparks" 
            className="btn btn-primary inline-flex items-center gap-2 hover-lift"
          >
            <Plus className="h-5 w-5" />
            Nuevo Balneario
          </Link>
        </div>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Tickets Activos"
            value={totalActiveTickets}
            icon={TrendingUp}
            variant="primary"
            trend={{
              value: 12.5,
              period: "mes anterior",
              isPositive: true
            }}
      </div>
    </DashboardLayout>
  )
  );
};

export default SuperAdminDashboard;