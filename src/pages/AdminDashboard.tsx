import React, { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuthStore } from '../stores/authStore';
import { useWaterParksStore } from '../stores/waterParksStore';
import WaterParkDetail from './WaterParkDetail';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { fetchWaterParks, loading } = useWaterParksStore();
  
  useEffect(() => {
    fetchWaterParks();
  }, [fetchWaterParks]);
  
  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  // For admin users, directly show their water park's detail page
  if (user?.role === 'admin' && user.waterParkId) {
    return <WaterParkDetail />;
  }
  
  return null; // This should never happen as admins are redirected to their water park
};

export default AdminDashboard