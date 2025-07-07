import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useDashboardStore } from '../../stores/dashboardStore';

const PeriodFilter: React.FC = () => {
  const { selectedPeriod, setPeriod } = useDashboardStore();

  return (
    <div className="flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 md:mb-8">
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
    </div>
  );
};

export default PeriodFilter;