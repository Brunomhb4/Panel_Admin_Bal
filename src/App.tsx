import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import WaterParkDetail from './pages/WaterParkDetail';
import UserManagement from './pages/UserManagement';
import WaterParkManagement from './pages/WaterParkManagement';
import NotesManagement from './pages/NotesManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes for Admin */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/waterpark/:id" 
        element={
          <ProtectedRoute requiredRole="admin">
            <WaterParkDetail />
          </ProtectedRoute>
        } 
      />

      {/* Protected routes for SuperAdmin */}
      <Route 
        path="/superadmin" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <SuperAdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/waterpark/:id" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <WaterParkDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/users" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <UserManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/waterparks" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <WaterParkManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/notes" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <NotesManagement />
          </ProtectedRoute>
        } 
      />

      {/* Default routes */}
      <Route path="/" element={
        isAuthenticated ? 
          <Navigate to={useAuthStore.getState().userRole === 'admin' ? '/admin' : '/superadmin'} /> : 
          <Navigate to="/login" />
      } />
      
      {/* Catch all for non-existent routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;