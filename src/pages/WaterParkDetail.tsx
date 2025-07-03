import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useWaterParksStore, WaterPark } from '../stores/waterParksStore';
import { useAuthStore } from '../stores/authStore';
import DailyChart from '../components/charts/DailyChart';
import MonthlyChart from '../components/charts/MonthlyChart';
import CheckersTable from '../components/tables/CheckersTable';
import { Ticket, TicketX, Printer, DollarSign, TrendingUp, Zap } from 'lucide-react';

const WaterParkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { 
    fetchWaterParkDetails, 
    fetchCheckers, 
    fetchDailyStats,
    fetchMonthlyStats
  } = useWaterParksStore();
  
  const [waterPark, setWaterPark] = useState<WaterPark | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    // Use either the route param id or the admin user's waterParkId
    const parkId = id || user?.waterParkId;
    if (parkId) {
      const parkDetails = fetchWaterParkDetails(parkId);
      setWaterPark(parkDetails);
    }
    setLoading(false);
  }, [id, user?.waterParkId, fetchWaterParkDetails]);
  
  if (loading || !waterPark) {
    return (
      <DashboardLayout title="Detalles del Balneario">
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
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="text-midnight-blue animate-pulse
                             h-3 w-3
                             xs:h-4 xs:w-4
                             sm:h-5 xs:w-5
                             md:h-6 md:w-6" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  const checkers = fetchCheckers(waterPark.id);
  const dailyStats = fetchDailyStats(waterPark.id);
  const monthlyStats = fetchMonthlyStats(waterPark.id);
  
  const statsCards = [
    {
      title: 'Tickets Activos',
      value: waterPark.activeTickets,
      icon: Ticket,
      bgColor: 'bg-gradient-to-br from-midnight-blue/10 to-navy-blue/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90',
      iconGlow: 'shadow-[0_0_25px_rgba(27,59,111,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-midnight-blue/20',
      pulseColor: 'bg-midnight-blue/30'
    },
    {
      title: 'Tickets Vendidos',
      value: waterPark.soldTickets,
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-sky-muted/10 to-blue-soft/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-sky-muted/90 to-blue-soft/90',
      iconGlow: 'shadow-[0_0_25px_rgba(84,131,179,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-sky-muted/20',
      pulseColor: 'bg-sky-muted/30'
    },
    {
      title: 'Tickets Impresos',
      value: waterPark.printedTickets,
      icon: Printer,
      bgColor: 'bg-gradient-to-br from-blue-soft/10 to-sky-light/30',
      iconColor: 'text-deep-navy',
      iconBg: 'bg-gradient-to-br from-blue-soft/90 to-sky-light/90',
      iconGlow: 'shadow-[0_0_25px_rgba(125,160,202,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-blue-soft/20',
      pulseColor: 'bg-blue-soft/30'
    },
    {
      title: 'Tickets Inactivos',
      value: waterPark.inactiveTickets,
      icon: TicketX,
      bgColor: 'bg-gradient-to-br from-navy-blue/10 to-deep-navy/20',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-navy-blue/90 to-deep-navy/90',
      iconGlow: 'shadow-[0_0_25px_rgba(5,38,89,0.4)]',
      textColor: 'text-deep-navy',
      borderColor: 'border-navy-blue/20',
      pulseColor: 'bg-navy-blue/30'
    }
  ];
  
  return (
    <DashboardLayout title={waterPark.name}>
      <div className="animate-fade-in">
        {/* Enhanced Summary Stats with blue palette */}
        <div className="responsive-grid mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.title}
                className={`card-compact ${stat.bgColor} border-2 ${stat.borderColor} floating-card animate-slide-up hover:scale-105 group relative overflow-hidden transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-2 right-2 w-1 h-1 ${stat.pulseColor} rounded-full animate-ping`}></div>
                  <div className={`absolute bottom-3 left-3 w-0.5 h-0.5 ${stat.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '0.5s' }}></div>
                  <div className={`absolute top-1/2 right-1/4 w-0.5 h-0.5 ${stat.pulseColor} rounded-full animate-ping`} style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="flex items-center relative z-10">
                  {/* Enhanced icon container with blue palette */}
                  <div className={`${stat.iconBg} ${stat.iconGlow} border-2 border-white/30 backdrop-blur-sm flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden
                                   rounded-xl p-2 mr-2
                                   xs:rounded-2xl xs:p-2.5 xs:mr-3
                                   sm:p-3 sm:mr-4
                                   md:rounded-3xl md:p-4 md:mr-5
                                   lg:p-5 lg:mr-6`}>
                    
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                    
                    <Icon className={`${stat.iconColor} relative z-10 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl group-hover:scale-110
                                     h-4 w-4
                                     xs:h-4 xs:w-4
                                     sm:h-5 sm:w-5
                                     md:h-6 md:w-6
                                     lg:h-7 lg:w-7`} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sky-muted truncate font-semibold transition-all duration-300 group-hover:text-opacity-80
                                  text-xs mb-0.5
                                  xs:text-xs xs:mb-1
                                  sm:text-sm sm:mb-1
                                  md:text-sm md:mb-1.5
                                  lg:text-base lg:mb-2">
                      {stat.title}
                    </p>
                    <h3 className={`${stat.textColor} truncate font-bold transition-all duration-300 group-hover:scale-105 origin-left
                                    text-sm
                                    xs:text-base
                                    sm:text-lg
                                    md:text-xl
                                    lg:text-2xl`}>
                      {stat.value.toLocaleString()}
                    </h3>
                  </div>
                </div>

                {/* Subtle animated border */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 ${stat.iconBg} opacity-5 rounded-xl animate-pulse`}></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Charts */}
        <div className="responsive-grid-2 mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <DailyChart data={dailyStats} />
          <MonthlyChart data={monthlyStats} />
        </div>
        
        {/* Checkers Table */}
        <CheckersTable checkers={checkers} />
      </div>
    </DashboardLayout>
  );
};

export default WaterParkDetail;