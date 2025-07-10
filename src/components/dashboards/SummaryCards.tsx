import React from 'react';
import { Ticket, DollarSign, Store, TrendingUp } from 'lucide-react';
import { useWaterParksStore } from '../../stores/waterParksStore';
import { useThemeStore } from '../../stores/themeStore';

interface SummaryCardsProps {
  taquillaData?: {
    tickets_activos: number | null;
    tickets_vendidos: number | null;
    tickets_impresos: number | null;
    tickets_inactivos: number | null;
  } | null;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ taquillaData }) => {
  const { waterParks } = useWaterParksStore();
  const { mode } = useThemeStore();
  
  // Calculate totals
  const totalActiveTickets = taquillaData ? taquillaData.tickets_activos : waterParks.reduce((sum, park) => sum + park.activeTickets, 0);
  const totalSoldTickets = taquillaData ? taquillaData.tickets_vendidos : waterParks.reduce((sum, park) => sum + park.soldTickets, 0);
  const totalPrintedTickets = taquillaData && taquillaData.tickets_impresos ? taquillaData.tickets_impresos : waterParks.reduce((sum, park) => sum + park.printedTickets, 0);
  const totalInactiveTickets = taquillaData && taquillaData.tickets_inactivos ? taquillaData.tickets_inactivos : waterParks.reduce((sum, park) => sum + park.inactiveTickets, 0);
  const totalWaterParks = waterParks.length;
  const totalRevenue = waterParks.reduce((sum, park) => sum + park.totalRevenue, 0);
  
  const cards = [
    {
      title: 'Tickets Activos',
      value: totalActiveTickets.toLocaleString(),
      icon: Ticket,
      gradient: 'from-[#021024] to-[#052659]',
      bgGradient: mode === 'dark' 
        ? 'from-[#052659]/20 via-[#1B3B6F]/15 to-[#5483B3]/10' 
        : 'from-[#C1E8FF]/40 via-white/95 to-[#7DA0CA]/25',
      borderColor: mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#1B3B6F]/40',
      textColor: mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]',
      subTextColor: mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#052659]',
      iconBg: 'bg-gradient-to-br from-[#021024] via-[#052659] to-[#1B3B6F]',
      iconGlow: mode === 'dark' 
        ? 'shadow-[0_0_30px_rgba(2,16,36,0.8)]' 
        : 'shadow-[0_0_25px_rgba(2,16,36,0.6)]',
      iconColor: 'text-[#C1E8FF]',
      pulseColor: mode === 'dark' ? 'bg-[#021024]/30' : 'bg-[#021024]/20',
      iconShadow: 'drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]'
    },
    {
      title: 'Ingresos Totales',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-[#052659] to-[#1B3B6F]',
      bgGradient: mode === 'dark' 
        ? 'from-[#1B3B6F]/20 via-[#5483B3]/15 to-[#7DA0CA]/10' 
        : 'from-[#7DA0CA]/35 via-white/90 to-[#C1E8FF]/30',
      borderColor: mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#5483B3]/40',
      textColor: mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]',
      subTextColor: mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#052659]',
      iconBg: 'bg-gradient-to-br from-[#052659] via-[#1B3B6F] to-[#5483B3]',
      iconGlow: mode === 'dark' 
        ? 'shadow-[0_0_30px_rgba(5,38,89,0.8)]' 
        : 'shadow-[0_0_25px_rgba(5,38,89,0.6)]',
      iconColor: 'text-[#C1E8FF]',
      pulseColor: mode === 'dark' ? 'bg-[#052659]/30' : 'bg-[#052659]/20',
      iconShadow: 'drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]'
    },
    {
      title: 'Total Balnearios',
      value: totalWaterParks.toString(),
      icon: Store,
      gradient: 'from-[#1B3B6F] to-[#5483B3]',
      bgGradient: mode === 'dark' 
        ? 'from-[#5483B3]/20 via-[#7DA0CA]/15 to-[#C1E8FF]/10' 
        : 'from-[#5483B3]/30 via-white/85 to-[#7DA0CA]/35',
      borderColor: mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#7DA0CA]/40',
      textColor: mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]',
      subTextColor: mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#052659]',
      iconBg: 'bg-gradient-to-br from-[#1B3B6F] via-[#5483B3] to-[#7DA0CA]',
      iconGlow: mode === 'dark' 
        ? 'shadow-[0_0_30px_rgba(27,59,111,0.8)]' 
        : 'shadow-[0_0_25px_rgba(27,59,111,0.6)]',
      iconColor: 'text-[#C1E8FF]',
      pulseColor: mode === 'dark' ? 'bg-[#1B3B6F]/30' : 'bg-[#1B3B6F]/20',
      iconShadow: 'drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]'
    },
    {
      title: 'Tickets Vendidos',
      value: totalSoldTickets.toLocaleString(),
      icon: TrendingUp,
      gradient: 'from-[#5483B3] to-[#7DA0CA]',
      bgGradient: mode === 'dark' 
        ? 'from-[#7DA0CA]/20 via-[#C1E8FF]/15 to-[#5483B3]/10' 
        : 'from-[#C1E8FF]/40 via-white/80 to-[#5483B3]/30',
      borderColor: mode === 'dark' ? 'border-[#C1E8FF]/30' : 'border-[#C1E8FF]/50',
      textColor: mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]',
      subTextColor: mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#052659]',
      iconBg: 'bg-gradient-to-br from-[#5483B3] via-[#7DA0CA] to-[#C1E8FF]',
      iconGlow: mode === 'dark' 
        ? 'shadow-[0_0_30px_rgba(84,131,179,0.8)]' 
        : 'shadow-[0_0_25px_rgba(84,131,179,0.6)]',
      iconColor: mode === 'dark' ? 'text-[#021024]' : 'text-[#C1E8FF]',
      pulseColor: mode === 'dark' ? 'bg-[#5483B3]/30' : 'bg-[#5483B3]/20',
      iconShadow: mode === 'dark' 
        ? 'drop-shadow-[0_0_6px_rgba(2,16,36,0.8)]' 
        : 'drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]'
    }
  ];
  
  return (
    <div className="responsive-grid mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={card.title}
            className={`card-compact bg-gradient-to-br ${card.bgGradient} border-3 ${card.borderColor} hover:shadow-2xl transition-all duration-500 animate-slide-up floating-card hover:scale-110 group relative overflow-hidden backdrop-blur-lg`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`absolute top-2 right-2 w-1 h-1 ${card.pulseColor} rounded-full animate-ping`}></div>
              <div className={`absolute bottom-3 left-3 w-0.5 h-0.5 ${card.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '0.5s' }}></div>
              <div className={`absolute top-1/2 right-1/4 w-0.5 h-0.5 ${card.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="flex items-center relative z-10">
              <div className={`${card.iconBg} ${card.iconGlow} border-3 border-[#C1E8FF]/60 backdrop-blur-lg flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 relative overflow-hidden
                               rounded-xl p-2
                               xs:rounded-2xl xs:p-2.5
                               sm:rounded-2xl sm:p-3
                               md:rounded-3xl md:p-4
                               lg:rounded-3xl lg:p-5`}>
                
                {/* Icon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C1E8FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C1E8FF]/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 skew-x-12"></div>
                
                {/* Borde interno brillante */}
                <div className="absolute inset-1 rounded-full border border-[#C1E8FF]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <Icon className={`${card.iconColor} relative z-10 transition-all duration-300 group-hover:scale-125 font-black
                                 h-4 w-4
                                 xs:h-4 xs:w-4
                                 sm:h-5 sm:w-5
                                 md:h-6 md:w-6
                                 lg:h-7 lg:w-7`}
                      style={{
                        filter: `${card.iconShadow} drop-shadow(0_2px_4px_rgba(0,0,0,0.5))`,
                        textShadow: mode === 'dark' 
                          ? '0 0 10px rgba(193, 232, 255, 0.8)' 
                          : '0 0 8px rgba(193, 232, 255, 0.9)'
                      }} />
              </div>
              
              <div className="min-w-0 flex-1
                              ml-2
                              xs:ml-3
                              sm:ml-4
                              lg:ml-6">
                <p className={`${card.subTextColor} truncate font-bold transition-all duration-300 group-hover:scale-105 origin-left opacity-90
                               text-xs mb-0.5
                               xs:text-xs xs:mb-1
                               sm:text-sm sm:mb-1
                               md:text-sm md:mb-1.5
                               lg:text-base lg:mb-2`}
                      style={{
                        textShadow: mode === 'dark' 
                          ? '0 0 4px rgba(125, 160, 202, 0.4)' 
                          : '0 1px 2px rgba(5, 38, 89, 0.1)'
                      }}>
                  {card.title}
                </p>
                <h3 className={`${card.textColor} truncate font-black transition-all duration-300 group-hover:scale-110 origin-left
                                text-sm
                                xs:text-base
                                sm:text-lg
                                md:text-xl
                                lg:text-2xl`}
                    style={{
                      textShadow: mode === 'dark' 
                        ? '0 0 6px rgba(193, 232, 255, 0.6), 0 2px 4px rgba(0,0,0,0.3)' 
                        : '0 2px 4px rgba(2, 16, 36, 0.15)'
                    }}>
                  {card.value}
                </h3>
              </div>
            </div>

            {/* Subtle animated border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-15 rounded-xl animate-pulse`}></div>
              <div className="absolute inset-0 border-2 border-[#C1E8FF]/30 rounded-xl animate-pulse"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;