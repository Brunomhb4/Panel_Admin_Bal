import React from 'react';
import { FileText, Users, Coffee, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNotesStore } from '../../stores/notesStore';

const NotesStats: React.FC = () => {
  const { stats, selectedPeriod } = useNotesStore();
  
  const statsCards = [
    {
      title: selectedPeriod === 'day' ? 'Notas del Día' : 'Notas Semanales',
      value: selectedPeriod === 'day' ? stats.dailyNotes : stats.weeklyNotes,
      icon: FileText,
      gradient: 'from-midnight-blue to-navy-blue',
      bgGradient: 'from-sky-light/30 to-blue-soft/20 dark:from-midnight-blue/20 dark:to-navy-blue/30',
      borderColor: 'border-sky-light/40 dark:border-midnight-blue/40',
      textColor: 'text-deep-navy dark:text-sky-light',
      subTextColor: 'text-midnight-blue dark:text-blue-soft',
      iconBg: 'bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90',
      iconGlow: 'shadow-[0_0_25px_rgba(27,59,111,0.4)] dark:shadow-[0_0_25px_rgba(193,232,255,0.3)]',
      iconColor: 'text-white',
      pulseColor: 'bg-midnight-blue/30 dark:bg-sky-light/30'
    },
    {
      title: 'Notas Completadas',
      value: stats.completedNotes,
      icon: CheckCircle,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-100/30 to-green-200/20 dark:from-green-900/20 dark:to-green-800/30',
      borderColor: 'border-green-200/40 dark:border-green-700/40',
      textColor: 'text-deep-navy dark:text-sky-light',
      subTextColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-gradient-to-br from-green-500/90 to-green-600/90',
      iconGlow: 'shadow-[0_0_25px_rgba(34,197,94,0.4)] dark:shadow-[0_0_25px_rgba(74,222,128,0.3)]',
      iconColor: 'text-white',
      pulseColor: 'bg-green-500/30 dark:bg-green-400/30'
    },
    {
      title: 'Notas Pendientes',
      value: stats.pendingNotes,
      icon: Clock,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-100/30 to-orange-100/20 dark:from-yellow-900/20 dark:to-orange-900/30',
      borderColor: 'border-yellow-200/40 dark:border-yellow-700/40',
      textColor: 'text-deep-navy dark:text-sky-light',
      subTextColor: 'text-yellow-600 dark:text-yellow-400',
      iconBg: 'bg-gradient-to-br from-yellow-500/90 to-orange-500/90',
      iconGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.4)] dark:shadow-[0_0_25px_rgba(251,191,36,0.3)]',
      iconColor: 'text-white',
      pulseColor: 'bg-yellow-500/30 dark:bg-yellow-400/30'
    },
    {
      title: selectedPeriod === 'day' ? 'Personas Atendidas Hoy' : 'Personas Atendidas (Semana)',
      value: selectedPeriod === 'day' ? stats.dailyPeopleServed : stats.weeklyPeopleServed,
      icon: Users,
      gradient: 'from-sky-muted to-blue-soft',
      bgGradient: 'from-sky-muted/20 to-blue-soft/30 dark:from-sky-muted/10 dark:to-blue-soft/20',
      borderColor: 'border-sky-muted/30 dark:border-sky-muted/40',
      textColor: 'text-deep-navy dark:text-sky-light',
      subTextColor: 'text-sky-muted dark:text-blue-soft',
      iconBg: 'bg-gradient-to-br from-sky-muted/90 to-blue-soft/90',
      iconGlow: 'shadow-[0_0_25px_rgba(84,131,179,0.4)] dark:shadow-[0_0_25px_rgba(125,160,202,0.3)]',
      iconColor: 'text-white',
      pulseColor: 'bg-sky-muted/30 dark:bg-blue-soft/30'
    },
    {
      title: selectedPeriod === 'day' ? 'Mesas Atendidas Hoy' : 'Mesas Atendidas (Semana)',
      value: selectedPeriod === 'day' ? stats.dailyTablesServed : stats.weeklyTablesServed,
      icon: Coffee,
      gradient: 'from-blue-soft to-sky-light',
      bgGradient: 'from-blue-soft/20 to-sky-light/40 dark:from-blue-soft/10 dark:to-sky-light/20',
      borderColor: 'border-blue-soft/30 dark:border-blue-soft/40',
      textColor: 'text-deep-navy dark:text-sky-light',
      subTextColor: 'text-blue-soft dark:text-sky-light',
      iconBg: 'bg-gradient-to-br from-blue-soft/90 to-sky-light/90',
      iconGlow: 'shadow-[0_0_25px_rgba(125,160,202,0.4)] dark:shadow-[0_0_25px_rgba(193,232,255,0.3)]',
      iconColor: 'text-deep-navy dark:text-midnight-blue',
      pulseColor: 'bg-blue-soft/30 dark:bg-sky-light/30'
    },
    {
      title: 'Eficiencia del Día',
      value: `${Math.round((stats.completedNotes / (stats.completedNotes + stats.pendingNotes)) * 100)}%`,
      icon: AlertTriangle,
      gradient: 'from-navy-blue to-sky-muted',
      bgGradient: 'from-navy-blue/10 to-sky-muted/20 dark:from-navy-blue/20 dark:to-sky-muted/30',
      borderColor: 'border-navy-blue/20 dark:border-navy-blue/40',
      textColor: 'text-deep-navy dark:text-sky-light',
      subTextColor: 'text-navy-blue dark:text-blue-soft',
      iconBg: 'bg-gradient-to-br from-navy-blue/90 to-sky-muted/90',
      iconGlow: 'shadow-[0_0_25px_rgba(5,38,89,0.4)] dark:shadow-[0_0_25px_rgba(84,131,179,0.3)]',
      iconColor: 'text-white',
      pulseColor: 'bg-navy-blue/30 dark:bg-sky-muted/30'
    }
  ];
  
  return (
    <div className="responsive-grid mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
      {statsCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={card.title}
            className={`card-compact bg-gradient-to-br ${card.bgGradient} border-2 ${card.borderColor} hover:shadow-large transition-all duration-500 animate-slide-up floating-card hover:scale-105 group relative overflow-hidden`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`absolute top-2 right-2 w-1 h-1 ${card.pulseColor} rounded-full animate-ping`}></div>
              <div className={`absolute bottom-3 left-3 w-0.5 h-0.5 ${card.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '0.5s' }}></div>
              <div className={`absolute top-1/2 right-1/4 w-0.5 h-0.5 ${card.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="flex items-center relative z-10">
              <div className={`${card.iconBg} ${card.iconGlow} border-2 border-white/30 dark:border-sky-light/20 backdrop-blur-sm flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden
                               rounded-xl p-2
                               xs:rounded-2xl xs:p-2.5
                               sm:rounded-2xl sm:p-3
                               md:rounded-3xl md:p-4
                               lg:rounded-3xl lg:p-5`}>
                
                {/* Icon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                
                <Icon className={`${card.iconColor} relative z-10 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl group-hover:scale-110
                                 h-4 w-4
                                 xs:h-4 xs:w-4
                                 sm:h-5 sm:w-5
                                 md:h-6 md:w-6
                                 lg:h-7 lg:w-7`} />
              </div>
              
              <div className="min-w-0 flex-1
                              ml-2
                              xs:ml-3
                              sm:ml-4
                              lg:ml-6">
                <p className={`${card.subTextColor} truncate font-semibold transition-all duration-300 group-hover:text-opacity-80
                               text-xs mb-0.5
                               xs:text-xs xs:mb-1
                               sm:text-sm sm:mb-1
                               md:text-sm md:mb-1.5
                               lg:text-base lg:mb-2`}>
                  {card.title}
                </p>
                <h3 className={`${card.textColor} truncate font-bold transition-all duration-300 group-hover:scale-105 origin-left
                                text-sm
                                xs:text-base
                                sm:text-lg
                                md:text-xl
                                lg:text-2xl`}>
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                </h3>
              </div>
            </div>

            {/* Subtle animated border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-10 rounded-xl animate-pulse`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotesStats;