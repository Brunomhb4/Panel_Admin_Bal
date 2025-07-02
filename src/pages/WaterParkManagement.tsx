import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useWaterParksStore, WaterPark } from '../stores/waterParksStore';
import { Plus, Edit, Trash2 } from 'lucide-react';

const WaterParkManagement: React.FC = () => {
  const { waterParks, addWaterPark, updateWaterPark, deleteWaterPark } = useWaterParksStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWaterPark, setEditingWaterPark] = useState<WaterPark | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    activeTickets: 0,
    soldTickets: 0,
    printedTickets: 0,
    inactiveTickets: 0,
    totalRevenue: 0
  });
  
  const openModal = (waterPark?: WaterPark) => {
    if (waterPark) {
      // Edit existing water park
      setEditingWaterPark(waterPark);
      setFormData({
        name: waterPark.name,
        activeTickets: waterPark.activeTickets,
        soldTickets: waterPark.soldTickets,
        printedTickets: waterPark.printedTickets,
        inactiveTickets: waterPark.inactiveTickets,
        totalRevenue: waterPark.totalRevenue
      });
    } else {
      // New water park
      setEditingWaterPark(null);
      setFormData({
        name: '',
        activeTickets: 0,
        soldTickets: 0,
        printedTickets: 0,
        inactiveTickets: 0,
        totalRevenue: 0
      });
    }
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ['activeTickets', 'soldTickets', 'printedTickets', 'inactiveTickets', 'totalRevenue'];
    
    setFormData(prev => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingWaterPark) {
      // Update existing water park
      updateWaterPark(editingWaterPark.id, formData);
    } else {
      // Add new water park
      addWaterPark(formData);
    }
    
    closeModal();
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este balneario?')) {
      deleteWaterPark(id);
    }
  };
  
  return (
    <DashboardLayout title="Gestión de Balnearios">
      <div className="fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Balnearios</h2>
          <button 
            onClick={() => openModal()} 
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Balneario
          </button>
        </div>
        
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Nombre</th>
                  <th className="table-header-cell">Tickets Activos</th>
                  <th className="table-header-cell">Tickets Vendidos</th>
                  <th className="table-header-cell">Tickets Impresos</th>
                  <th className="table-header-cell">Tickets Inactivos</th>
                  <th className="table-header-cell">Ingresos Totales</th>
                  <th className="table-header-cell">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {waterParks.map((park) => (
                  <tr key={park.id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-body-cell font-medium text-gray-900">{park.name}</td>
                    <td className="table-body-cell">{park.activeTickets}</td>
                    <td className="table-body-cell">{park.soldTickets}</td>
                    <td className="table-body-cell">{park.printedTickets}</td>
                    <td className="table-body-cell">{park.inactiveTickets}</td>
                    <td className="table-body-cell">${park.totalRevenue.toLocaleString()}</td>
                    <td className="table-body-cell">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openModal(park)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(park.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Modal for adding/editing water parks */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingWaterPark ? 'Editar Balneario' : 'Nuevo Balneario'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="name" className="label">Nombre del Balneario</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="input"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="activeTickets" className="label">Tickets Activos</label>
                          <input
                            type="number"
                            name="activeTickets"
                            id="activeTickets"
                            value={formData.activeTickets}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="input"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="soldTickets" className="label">Tickets Vendidos</label>
                          <input
                            type="number"
                            name="soldTickets"
                            id="soldTickets"
                            value={formData.soldTickets}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="input"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="printedTickets" className="label">Tickets Impresos</label>
                          <input
                            type="number"
                            name="printedTickets"
                            id="printedTickets"
                            value={formData.printedTickets}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="input"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="inactiveTickets" className="label">Tickets Inactivos</label>
                          <input
                            type="number"
                            name="inactiveTickets"
                            id="inactiveTickets"
                            value={formData.inactiveTickets}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="input"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="totalRevenue" className="label">Ingresos Totales ($)</label>
                        <input
                          type="number"
                          name="totalRevenue"
                          id="totalRevenue"
                          value={formData.totalRevenue}
                          onChange={handleInputChange}
                          min="0"
                          required
                          className="input"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {editingWaterPark ? 'Guardar cambios' : 'Crear balneario'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default WaterParkManagement;