import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useTheme } from './hooks/useTheme';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import WaterParkDetail from './pages/WaterParkDetail';
import UserManagement from './pages/UserManagement';
import WaterParkManagement from './pages/WaterParkManagement';
import RestaurantManagement from './pages/RestaurantManagement';
import SnacksManagement from './pages/SnacksManagement';
import StoreManagement from './pages/StoreManagement';
import ProjectDashboardPage from './pages/ProjectDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import DataCollectionNotification from './components/privacy/DataCollectionNotification';
import PrivacySettingsPage from './pages/PrivacySettingsPage';

function App() {
  const { isAuthenticated } = useAuthStore();
  
  // Initialize theme system
  useTheme();

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
      
      {/* Project Dashboard - Available for all authenticated users */}
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
        path="/superadmin/restaurant" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <RestaurantManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/snacks" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <SnacksManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/store" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <StoreManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/privacy" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <PrivacySettingsPage />
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
    
    {/* Sistema de notificaciones de recopilación de datos */}
    <DataCollectionNotification />
  );
}

export default App;