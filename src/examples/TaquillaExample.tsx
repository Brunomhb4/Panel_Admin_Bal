import React from 'react';
import { useTaquilla } from '../hooks/useTaquilla';

/**
 * Componente de ejemplo para mostrar el uso del servicio de taquilla
 */
const TaquillaExample: React.FC = () => {
  const { resumenTaquilla, fetchResumenTaquilla, loading, error } = useTaquilla();

  const handleRefresh = () => {
    fetchResumenTaquilla();
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Resumen de Taquilla</h2>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 mb-4">
          <p>Error: {error}</p>
          <button 
            onClick={handleRefresh}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      ) : resumenTaquilla ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Tickets Activos</p>
              <p className="text-2xl font-bold">{resumenTaquilla.tickets_activos}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Tickets Vendidos</p>
              <p className="text-2xl font-bold">{resumenTaquilla.tickets_vendidos}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Tickets Impresos</p>
              <p className="text-2xl font-bold">{resumenTaquilla.tickets_impresos}</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-600 font-medium">Tickets Inactivos</p>
              <p className="text-2xl font-bold">{resumenTaquilla.tickets_inactivos}</p>
            </div>
          </div>
          
          <button 
            onClick={handleRefresh}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Actualizar datos
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 mb-4">No hay datos disponibles</p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cargar datos
          </button>
        </div>
      )}
    </div>
  );
};

export default TaquillaExample;