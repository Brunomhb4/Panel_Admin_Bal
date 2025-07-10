import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SummaryCards from '../components/dashboards/SummaryCards';
import WaterParksTable from '../components/dashboards/WaterParksTable';
import { useWaterParksStore } from '../stores/waterParksStore';
import { Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiServices from '../api';
import { useThemeStore } from '../stores/themeStore';

/**
 * Dashboard principal para SuperAdmin
 * Muestra resumen de balnearios y datos de taquilla de la API externa
 */
const SuperAdminDashboard: React.FC = () => {
  const { fetchWaterParks, loading } = useWaterParksStore();
  const { mode } = useThemeStore();
  
  // Estado para almacenar los datos de la API de taquilla
  const [taquillaData, setTaquillaData] = useState<{
    tickets_activos: number;
    tickets_vendidos: number;
    tickets_impresos: number;
    tickets_inactivos: number;
  } | null>(null);
  
  // Estados para manejar la carga y errores de la API
  const [taquillaLoading, setTaquillaLoading] = useState(false);
  const [taquillaError, setTaquillaError] = useState<string | null>(null);
  
  /**
   * Función para obtener los datos de taquilla desde la API externa
   * Se ejecuta al cargar el componente y cuando el usuario hace clic en el botón de actualizar
   */
  const fetchTaquillaData = async () => {
    // Solo intentar obtener datos si hay un token de acceso
    if (apiServices.auth.getAccessToken()) {
      setTaquillaLoading(true);
      setTaquillaError(null);
      try {
        // Llamada a la API para obtener los datos de taquilla
        const response = await apiServices.taquilla.getResumenTaquilla();
        if (response.success) {
          // Log para depuración - ver los datos originales de la API (sin procesar)
          console.log("Datos originales de la API (sin procesar):", response.data);
          
          // Convertir todos los valores a números para evitar problemas de tipo
          const data = {
            tickets_activos: Number(response.data.tickets_activos || 0),
            tickets_vendidos: Number(response.data.tickets_vendidos || 0),
            // Usar directamente el valor de tickets_impresos, ya que es un número válido en la API
            tickets_impresos: Number(response.data.tickets_impresos || 0),
            tickets_inactivos: Number(response.data.tickets_inactivos || 0)
          };
          // Log para depuración - ver los datos después de la conversión
          console.log("Taquilla data después de conversión:", data);
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
  
  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    fetchWaterParks();
    fetchTaquillaData();
  }, []);
  
  // Mostrar spinner de carga mientras se cargan los datos iniciales
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
        {/* Botones de acción en la parte superior */}
        <div className="flex justify-end mb-6">
          {/* Botón para crear nuevo balneario */}
          <Link 
            to="/superadmin/waterparks" 
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Nuevo Balneario
          </Link>
        </div>
          {/* Botón para actualizar datos de taquilla */}

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

        {/* Tarjetas de resumen con datos de taquilla o datos mock */}
        <SummaryCards taquillaData={taquillaData} />
        
        {/* Tabla de balnearios */}
        <WaterParksTable />
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;