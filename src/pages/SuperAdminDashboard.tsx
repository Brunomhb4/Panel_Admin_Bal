import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SummaryCards from '../components/dashboards/SummaryCards';
import WaterParksTable from '../components/dashboards/WaterParksTable';
import { useWaterParksStore } from '../stores/waterParksStore';
import { Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiServices } from '../api';
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
  
  useEffect(() => {
    fetchWaterParks();
  }, [fetchWaterParks]);
  
  const fetchTaquillaData = async () => {
    if (apiServices.auth.getAccessToken()) {
      setTaquillaLoading(true);
      setTaquillaError(null);
      try {
        const response = await apiServices.taquilla.getResumenTaquilla();
        if (response.success) {
          setTaquillaData(response.data);
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className={`text-xl font-bold ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`}>
              Resumen de Taquilla
            </h2>
            <button
              onClick={fetchTaquillaData}
              disabled={taquillaLoading}
              className={`ml-3 p-2 rounded-full transition-all duration-300 ${
                mode === 'dark'
                  ? 'bg-[#1B3B6F]/50 hover:bg-[#5483B3]/50 text-[#C1E8FF]'
                  : 'bg-[#C1E8FF]/50 hover:bg-[#7DA0CA]/50 text-[#021024]'
              }`}
              title="Actualizar datos de taquilla"
            >
              <RefreshCw className={`h-5 w-5 ${taquillaLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <Link 
            to="/superadmin/waterparks" 
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Nuevo Balneario
          </Link>
        </div>

        {/* Resumen de Taquilla */}
        {taquillaData && (
          <div className={`card mb-8 ${mode === 'dark' 
            ? 'bg-gradient-to-br from-[#052659]/80 to-[#1B3B6F]/60 border-[#C1E8FF]/25' 
            : 'bg-white/95 border-gray-200 shadow-lg'}`}>
            <h3 className={`font-bold text-lg mb-4 ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`}>
              Datos de API Externa - Resumen de Taquilla
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${mode === 'dark' 
                ? 'bg-[#1B3B6F]/50 border border-[#5483B3]/50' 
                : 'bg-[#C1E8FF]/20 border border-[#5483B3]/30'}`}>
                <p className={`text-sm font-medium mb-1 ${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#1B3B6F]'}`}>
                  Tickets Activos
                </p>
                <p className={`text-2xl font-bold ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`}>
                  {(taquillaData.tickets_activos ?? 0).toLocaleString()}
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${mode === 'dark' 
                ? 'bg-[#1B3B6F]/50 border border-[#5483B3]/50' 
                : 'bg-[#C1E8FF]/20 border border-[#5483B3]/30'}`}>
                <p className={`text-sm font-medium mb-1 ${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#1B3B6F]'}`}>
                  Tickets Vendidos
                </p>
                <p className={`text-2xl font-bold ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`}>
                  {(taquillaData.tickets_vendidos ?? 0).toLocaleString()}
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${mode === 'dark' 
                ? 'bg-[#1B3B6F]/50 border border-[#5483B3]/50' 
                : 'bg-[#C1E8FF]/20 border border-[#5483B3]/30'}`}>
                <p className={`text-sm font-medium mb-1 ${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#1B3B6F]'}`}>
                  Tickets Impresos
                </p>
                <p className={`text-2xl font-bold ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`}>
                  {(taquillaData.tickets_impresos ?? 0).toLocaleString()}
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${mode === 'dark' 
                ? 'bg-[#1B3B6F]/50 border border-[#5483B3]/50' 
                : 'bg-[#C1E8FF]/20 border border-[#5483B3]/30'}`}>
                <p className={`text-sm font-medium mb-1 ${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#1B3B6F]'}`}>
                  Tickets Inactivos
                </p>
                <p className={`text-2xl font-bold ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`}>
                  {(taquillaData.tickets_inactivos ?? 0).toLocaleString()}
                </p>
              </div>
            </div>
            
            {taquillaError && (
              <p className="mt-4 text-red-500 text-sm">{taquillaError}</p>
            )}
          </div>
        )}
        
        <SummaryCards />
        <WaterParksTable />
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;