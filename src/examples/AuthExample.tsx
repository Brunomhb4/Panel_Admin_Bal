import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Componente de ejemplo para mostrar el uso de la autenticación
 */
const AuthExample: React.FC = () => {
  const { login, logout, isAuthenticated, getUserName, loading, error } = useAuth();
  const [email, setEmail] = useState('dashboard@aquasac.com');
  const [password, setPassword] = useState('password');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert('¡Inicio de sesión exitoso!');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert('¡Sesión cerrada exitosamente!');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Ejemplo de Autenticación</h2>
      
      {isAuthenticated ? (
        <div>
          <p className="mb-4">Usuario autenticado: <strong>{getUserName()}</strong></p>
          <button 
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthExample;