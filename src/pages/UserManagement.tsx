import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useWaterParksStore } from '../stores/waterParksStore';
import { UserPlus, X, Edit } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  waterParkId?: string;
}

// Mock data for users
const initialUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', waterParkId: '1' },
  { id: '2', name: 'Super Admin', email: 'superadmin@example.com', role: 'superadmin' },
  { id: '3', name: 'John Doe', email: 'john@example.com', role: 'admin', waterParkId: '2' },
  { id: '4', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', waterParkId: '3' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'superadmin',
    waterParkId: ''
  });
  
  const { waterParks } = useWaterParksStore();
  
  const openModal = (user?: User) => {
    if (user) {
      // Edit existing user
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '', // Don't show password when editing
        role: user.role,
        waterParkId: user.waterParkId || ''
      });
    } else {
      // New user
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'admin',
        waterParkId: ''
      });
    }
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { 
              ...user, 
              name: formData.name, 
              email: formData.email, 
              role: formData.role,
              waterParkId: formData.role === 'admin' ? formData.waterParkId : undefined
            } 
          : user
      ));
    } else {
      // Add new user
      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          waterParkId: formData.role === 'admin' ? formData.waterParkId : undefined
        }
      ]);
    }
    
    closeModal();
  };
  
  const deleteUser = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  return (
    <DashboardLayout title="Gestión de Usuarios">
      <div className="fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Usuarios</h2>
          <button 
            onClick={() => openModal()} 
            className="btn btn-primary inline-flex items-center"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Nuevo Usuario
          </button>
        </div>
        
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Nombre</th>
                  <th className="table-header-cell">Email</th>
                  <th className="table-header-cell">Rol</th>
                  <th className="table-header-cell">Balneario Asignado</th>
                  <th className="table-header-cell">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-body-cell font-medium text-gray-900">{user.name}</td>
                    <td className="table-body-cell">{user.email}</td>
                    <td className="table-body-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'superadmin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="table-body-cell">
                      {user.waterParkId ? 
                        waterParks.find(park => park.id === user.waterParkId)?.name || '-' : 
                        'N/A'}
                    </td>
                    <td className="table-body-cell">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openModal(user)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <X className="h-5 w-5" />
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
      
      {/* Modal for adding/editing users */}
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
                      {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="name" className="label">Nombre</label>
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
                      
                      <div>
                        <label htmlFor="email" className="label">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="input"
                        />
                      </div>
                      
                      {!editingUser && (
                        <div>
                          <label htmlFor="password" className="label">Contraseña</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="input"
                          />
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="role" className="label">Rol</label>
                        <select
                          name="role"
                          id="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      </div>
                      
                      {formData.role === 'admin' && (
                        <div>
                          <label htmlFor="waterParkId" className="label">Balneario Asignado</label>
                          <select
                            name="waterParkId"
                            id="waterParkId"
                            value={formData.waterParkId}
                            onChange={handleInputChange}
                            required
                            className="input"
                          >
                            <option value="">Selecciona un balneario</option>
                            {waterParks.map(park => (
                              <option key={park.id} value={park.id}>{park.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
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
                  {editingUser ? 'Guardar cambios' : 'Crear usuario'}
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

export default UserManagement;