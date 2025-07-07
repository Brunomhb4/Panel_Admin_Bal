import React, { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardStats from '../components/dashboard/DashboardStats';
import WeeklyChart from '../components/dashboard/WeeklyChart';
import NotesSection from '../components/dashboard/NotesSection';
import PeriodFilter from '../components/dashboard/PeriodFilter';
import { useDashboardStore } from '../stores/dashboardStore';

const SuperAdminDashboard: React.FC = () => {
  const { fetchDashboardData, loading } = useDashboardStore();
  
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  
  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex justify-center items-center
                        h-24
                        xs:h-32
                        sm:h-40
                        md:h-48
                        lg:h-64">
          <div className="relative">
            {/* Enhanced loading spinner with blue palette */}
            <div className="animate-spin rounded-full border-4 border-sky-light/30 border-t-midnight-blue
                            h-8 w-8
                            xs:h-10 xs:w-10
                            sm:h-12 sm:w-12
                            md:h-16 md:w-16"></div>
            
            {/* Inner spinning element */}
            <div className="absolute inset-2 animate-spin rounded-full border-2 border-sky-muted/50 border-b-transparent
                            xs:inset-2.5
                            sm:inset-3
                            md:inset-4" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="fade-in">
        {/* Period Filter */}
        <PeriodFilter />
        
        {/* Dashboard Stats */}
        <DashboardStats />
        
        {/* Charts and Notes Grid */}
        <div className="responsive-grid-2 mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <WeeklyChart />
          <NotesSection />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;