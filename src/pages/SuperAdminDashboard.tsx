import React, { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SummaryCards from '../components/dashboards/SummaryCards';
import WaterParksTable from '../components/dashboards/WaterParksTable';
import { useWaterParksStore } from '../stores/waterParksStore';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuperAdminDashboard: React.FC = () => {
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
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="fade-in">
        <div className="flex justify-end mb-4">
          <Link 
            to="/superadmin/waterparks" 
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Nuevo Balneario
          </Link>
        </div>
        
        <SummaryCards />
        <WaterParksTable />
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;