import React, { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import NotesStats from '../components/notes/NotesStats';
import NotesChart from '../components/notes/NotesChart';
import NotesTable from '../components/notes/NotesTable';
import NotesFilters from '../components/notes/NotesFilters';
import { useNotesStore } from '../stores/notesStore';

const NotesManagement: React.FC = () => {
  const { fetchNotesData, loading } = useNotesStore();
  
  useEffect(() => {
    fetchNotesData();
  }, [fetchNotesData]);
  
  if (loading) {
    return (
      <DashboardLayout title="Gestión de Notas">
        <div className="flex justify-center items-center
                        h-24
                        xs:h-32
                        sm:h-40
                        md:h-48
                        lg:h-64">
          <div className="relative">
            {/* Enhanced loading spinner with blue palette */}
            <div className="animate-spin rounded-full border-4 border-sky-light/30 border-t-midnight-blue dark:border-sky-light/20 dark:border-t-sky-light
                            h-8 w-8
                            xs:h-10 xs:w-10
                            sm:h-12 sm:w-12
                            md:h-16 md:w-16"></div>
            
            {/* Inner spinning element */}
            <div className="absolute inset-2 animate-spin rounded-full border-2 border-sky-muted/50 border-b-transparent dark:border-blue-soft/50
                            xs:inset-2.5
                            sm:inset-3
                            md:inset-4" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Gestión de Notas">
      <div className="animate-fade-in">
        {/* Filters */}
        <NotesFilters />
        
        {/* Stats Cards */}
        <NotesStats />
        
        {/* Chart and Table Grid */}
        <div className="responsive-grid-2 mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <NotesChart />
          <NotesTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotesManagement;