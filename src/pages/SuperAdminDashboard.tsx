import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SummaryCards from '../components/dashboards/SummaryCards';
import WaterParksTable from '../components/dashboards/WaterParksTable';
import { useWaterParksStore } from '../stores/waterParksStore';
import { Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiServices from '../api';
import { useThemeStore } from '../stores/themeStore';

const SuperAdminDashboard: React.FC = () => {
  const { fetchWaterParks, loading } = useWaterParksStore();
  const { mode } = useThemeStore();
  const [taquillaData, setTaquillaData] = useState<{
    tickets_activos: number;
    tickets_vendidos: number;
    tickets_impresos: number;
    tickets_inactivos: number;
  } | null>(null);
  const [taquillaLoading, setTaquillaLoading] = useState(false);
  const [taquillaError, setTaquillaError] = useState<string | null>(null);
  
  const fetchTaquillaData = async () => {
    if (apiServices.auth.getAccessToken()) {
      setTaquillaLoading(true);
      setTaquillaError(null);
      try {
        const response = await apiServices.taquilla.getResumenTaquilla();
        if (response.success) {
          // Asegurarse de que todos los valores sean números
          const data = {
            tickets_activos: Number(response.data.tickets_activos || 0),
            tickets_vendidos: Number(response.data.tickets_vendidos || 0),
            tickets_impresos: Number(response.data.tickets_impresos || 0),
            tickets_inactivos: Number(response.data.tickets_inactivos || 0)
          };
          console.log("Taquilla data procesada:", data);
          setTaquillaData(data);
        }
      } catch (error) {
        console.error('Error al obtener datos de taquilla:', error);
        setTaquillaError('No se pudieron cargar los datos de taquilla');
      } finally {
        setTaquillaLoading(false);
      }
    }
  };
  
  useEffect(() => {
    fetchWaterParks();
    fetchTaquillaData();
  }, []);
  
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
      <div className="fade-in">
        <div className="flex justify-end mb-6">
          <Link 
            to="/superadmin/waterparks" 
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Nuevo Balneario
          </Link>
        </div>

        <div className="flex items-center mb-4">
          <button
            onClick={fetchTaquillaData}
            disabled={taquillaLoading}
            className={`p-2 rounded-full transition-all duration-300 mr-2 ${
              mode === 'dark'
                ? 'bg-[#1B3B6F]/50 hover:bg-[#5483B3]/50 text-[#C1E8FF]'
                : 'bg-[#C1E8FF]/50 hover:bg-[#7DA0CA]/50 text-[#021024]'
            }`}
            title="Actualizar datos de taquilla"
          >
            <RefreshCw className={`h-5 w-5 ${taquillaLoading ? 'animate-spin' : ''}`} />
          </button>
          {taquillaError && (
            <p className="text-red-500 text-sm">{taquillaError}</p>
          )}
        </div>

        <SummaryCards taquillaData={taquillaData} />
        <WaterParksTable />
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;