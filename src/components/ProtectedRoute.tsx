import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'superadmin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, userRole } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }
  
  // Allow superadmin to access all routes
  if (userRole === 'superadmin') {
    return <>{children}</>;
  }
  
  // For admin role, check if the route requires admin role specifically
  if (userRole === 'admin' && requiredRole === 'admin') {
    return <>{children}</>;
  }
  
  // If admin tries to access superadmin route, redirect to admin dashboard
  if (userRole === 'admin' && requiredRole === 'superadmin') {
    return <Navigate to="/admin" replace />;
  }
  
  // Fallback for any other case (should not happen but just in case)
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;