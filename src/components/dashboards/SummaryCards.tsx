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
      iconBg: 'bg-gradient-to-br from-midnight-blue/10 to-navy-blue/10'
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
      iconBg: 'bg-gradient-to-br from-sky-muted/10 to-blue-soft/10'
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
      iconBg: 'bg-gradient-to-br from-blue-soft/10 to-sky-light/20'
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
      iconBg: 'bg-gradient-to-br from-navy-blue/10 to-sky-muted/10'
    }
  ];
  
  return (
    <div className="responsive-grid mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={card.title}
            className={`card-compact bg-gradient-to-br ${card.bgGradient} border-2 ${card.borderColor} hover:shadow-large transition-all duration-300 animate-slide-up floating-card hover:scale-105`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center">
              <div className={`shadow-soft border border-white/20 backdrop-blur-sm flex-shrink-0 ${card.iconBg}
                               rounded-xl p-2
                               xs:rounded-2xl xs:p-2.5
                               sm:rounded-2xl sm:p-3
                               md:rounded-3xl md:p-4
                               lg:rounded-3xl lg:p-5`}>
                <Icon className="text-midnight-blue
                                 h-4 w-4
                                 xs:h-4 xs:w-4
                                 sm:h-5 sm:w-5
                                 md:h-6 md:w-6
                                 lg:h-7 lg:w-7" />
              </div>
              <div className="min-w-0 flex-1
                              ml-2
                              xs:ml-3
                              sm:ml-4
                              lg:ml-6">
                <p className={`${card.subTextColor} truncate font-semibold
                               text-xs mb-0.5
                               xs:text-xs xs:mb-1
                               sm:text-sm sm:mb-1
                               md:text-sm md:mb-1.5
                               lg:text-base lg:mb-2`}>
                  {card.title}
                </p>
                <h3 className={`${card.textColor} truncate font-bold
                                text-sm
                                xs:text-base
                                sm:text-lg
                                md:text-xl
                                lg:text-2xl`}>
                  {card.value}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;