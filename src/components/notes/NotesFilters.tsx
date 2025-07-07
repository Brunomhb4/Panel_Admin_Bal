import React from 'react';
import { Calendar, Clock, Filter, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useNotesStore } from '../../stores/notesStore';

const NotesFilters: React.FC = () => {
  const { selectedPeriod, setPeriod, filterStatus, setFilterStatus } = useNotesStore();

  const statusFilters = [
    { value: 'all', label: 'Todas', icon: Filter, color: 'text-midnight-blue dark:text-sky-light' },
    { value: 'pending', label: 'Pendientes', icon: Clock, color: 'text-yellow-600 dark:text-yellow-400' },
    { value: 'completed', label: 'Completadas', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { value: 'cancelled', label: 'Canceladas', icon: XCircle, color: 'text-red-600 dark:text-red-400' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 xs:mb-5 sm:mb-6 md:mb-8">
      {/* Period Filter */}
      <div className="bg-white/90 dark:bg-midnight-blue/90 backdrop-blur-md border border-sky-light/40 dark:border-sky-light/20 shadow-soft flex items-center
                      p-1 rounded-lg
                      xs:p-1.5 xs:rounded-xl
                      sm:p-2 sm:rounded-xl
                      md:p-2 md:rounded-2xl">
        
        <button
          onClick={() => setPeriod('day')}
          className={`flex items-center font-semibold transition-all duration-300 relative overflow-hidden group
                      px-3 py-2 text-xs rounded-lg
                      xs:px-4 xs:py-2.5 xs:text-xs xs:rounded-xl
                      sm:px-5 sm:py-3 sm:text-sm sm:rounded-xl
                      md:px-6 md:py-3.5 md:text-sm md:rounded-2xl
                      ${selectedPeriod === 'day' 
                        ? 'bg-gradient-to-r from-midnight-blue to-navy-blue text-white shadow-medium scale-105' 
                        : 'text-midnight-blue dark:text-sky-light hover:bg-sky-light/30 dark:hover:bg-navy-blue/30 hover:scale-102'
                      }`}
        >
          {selectedPeriod === 'day' && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50 rounded-xl animate-pulse"></div>
          )}
          
          <Clock className="mr-1.5 xs:mr-2 sm:mr-3 relative z-10 transition-all duration-300 group-hover:scale-110
                           h-3 w-3
                           xs:h-4 xs:w-4
                           sm:h-4 sm:w-4" />
          <span className="relative z-10">Día</span>
        </button>
        
        <button
          onClick={() => setPeriod('week')}
          className={`flex items-center font-semibold transition-all duration-300 relative overflow-hidden group
                      px-3 py-2 text-xs rounded-lg ml-1
                      xs:px-4 xs:py-2.5 xs:text-xs xs:rounded-xl xs:ml-1.5
                      sm:px-5 sm:py-3 sm:text-sm sm:rounded-xl sm:ml-2
                      md:px-6 md:py-3.5 md:text-sm md:rounded-2xl md:ml-2
                      ${selectedPeriod === 'week' 
                        ? 'bg-gradient-to-r from-midnight-blue to-navy-blue text-white shadow-medium scale-105' 
                        : 'text-midnight-blue dark:text-sky-light hover:bg-sky-light/30 dark:hover:bg-navy-blue/30 hover:scale-102'
                      }`}
        >
          {selectedPeriod === 'week' && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50 rounded-xl animate-pulse"></div>
          )}
          
          <Calendar className="mr-1.5 xs:mr-2 sm:mr-3 relative z-10 transition-all duration-300 group-hover:scale-110
                              h-3 w-3
                              xs:h-4 xs:w-4
                              sm:h-4 sm:w-4" />
          <span className="relative z-10">Semana</span>
        </button>
      </div>

      {/* Status Filter */}
      <div className="bg-white/90 dark:bg-midnight-blue/90 backdrop-blur-md border border-sky-light/40 dark:border-sky-light/20 shadow-soft flex items-center flex-wrap gap-1
                      p-1 rounded-lg
                      xs:p-1.5 xs:rounded-xl xs:gap-1.5
                      sm:p-2 sm:rounded-xl sm:gap-2
                      md:p-2 md:rounded-2xl">
        
        {statusFilters.map((filter) => {
          const Icon = filter.icon;
          const isActive = filterStatus === filter.value;
          
          return (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value as 'all' | 'pending' | 'completed' | 'cancelled')}
              className={`flex items-center font-semibold transition-all duration-300 relative overflow-hidden group
                          px-2 py-1.5 text-xs rounded-lg
                          xs:px-3 xs:py-2 xs:text-xs xs:rounded-xl
                          sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl
                          md:px-5 md:py-3 md:text-sm md:rounded-2xl
                          ${isActive 
                            ? 'bg-gradient-to-r from-midnight-blue to-navy-blue text-white shadow-medium scale-105' 
                            : `${filter.color} hover:bg-sky-light/30 dark:hover:bg-navy-blue/30 hover:scale-102`
                          }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50 rounded-xl animate-pulse"></div>
              )}
              
              <Icon className="mr-1 xs:mr-1.5 sm:mr-2 relative z-10 transition-all duration-300 group-hover:scale-110
                             h-3 w-3
                             xs:h-3 xs:w-3
                             sm:h-4 sm:w-4" />
              <span className="relative z-10">{filter.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotesFilters;