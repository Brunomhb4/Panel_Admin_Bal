import React from 'react';
import { Ticket, DollarSign, Store, TrendingUp } from 'lucide-react';
import { useWaterParksStore } from '../../stores/waterParksStore';

const SummaryCards: React.FC = () => {
  const { waterParks } = useWaterParksStore();
  
  // Calculate totals
  const totalActiveTickets = waterParks.reduce((sum, park) => sum + park.activeTickets, 0);
  const totalRevenue = waterParks.reduce((sum, park) => sum + park.totalRevenue, 0);
  const totalWaterParks = waterParks.length;
  const totalSoldTickets = waterParks.reduce((sum, park) => sum + park.soldTickets, 0);
  
  const cards = [
    {
      title: 'Tickets Activos',
      value: totalActiveTickets.toLocaleString(),
      icon: Ticket,
      gradient: 'from-midnight-blue to-navy-blue',
      bgGradient: 'from-sky-light/30 to-blue-soft/20',
      borderColor: 'border-sky-light/40',
      textColor: 'text-deep-navy',
      subTextColor: 'text-midnight-blue',
      iconBg: 'bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90',
      iconGlow: 'shadow-[0_0_25px_rgba(27,59,111,0.4)]',
      iconColor: 'text-white',
      pulseColor: 'bg-midnight-blue/30'
    },
    {
      title: 'Ingresos Totales',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-sky-muted to-blue-soft',
      bgGradient: 'from-sky-muted/20 to-blue-soft/30',
      borderColor: 'border-sky-muted/30',
      textColor: 'text-deep-navy',
      subTextColor: 'text-sky-muted',
      iconBg: 'bg-gradient-to-br from-sky-muted/90 to-blue-soft/90',
      iconGlow: 'shadow-[0_0_25px_rgba(84,131,179,0.4)]',
      iconColor: 'text-white',
      pulseColor: 'bg-sky-muted/30'
    },
    {
      title: 'Total Balnearios',
      value: totalWaterParks.toString(),
      icon: Store,
      gradient: 'from-blue-soft to-sky-light',
      bgGradient: 'from-blue-soft/20 to-sky-light/40',
      borderColor: 'border-blue-soft/30',
      textColor: 'text-deep-navy',
      subTextColor: 'text-blue-soft',
      iconBg: 'bg-gradient-to-br from-blue-soft/90 to-sky-light/90',
      iconGlow: 'shadow-[0_0_25px_rgba(125,160,202,0.4)]',
      iconColor: 'text-deep-navy',
      pulseColor: 'bg-blue-soft/30'
    },
    {
      title: 'Tickets Vendidos',
      value: totalSoldTickets.toLocaleString(),
      icon: TrendingUp,
      gradient: 'from-navy-blue to-sky-muted',
      bgGradient: 'from-navy-blue/10 to-sky-muted/20',
      borderColor: 'border-navy-blue/20',
      textColor: 'text-deep-navy',
      subTextColor: 'text-navy-blue',
      iconBg: 'bg-gradient-to-br from-navy-blue/90 to-sky-muted/90',
      iconGlow: 'shadow-[0_0_25px_rgba(5,38,89,0.4)]',
      iconColor: 'text-white',
      pulseColor: 'bg-navy-blue/30'
    }
  ];
  
  return (
    <div className="responsive-grid mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
      {cards.map((card, index) => {
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
              <div className={`${card.iconBg} ${card.iconGlow} border-2 border-white/30 backdrop-blur-sm flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden
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
                  {card.value}
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

export default SummaryCards;