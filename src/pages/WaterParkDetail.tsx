import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useWaterParksStore, WaterPark } from '../stores/waterParksStore';
import { useAuthStore } from '../stores/authStore';
import DailyChart from '../components/charts/DailyChart';
import MonthlyChart from '../components/charts/MonthlyChart';
import CheckersTable from '../components/tables/CheckersTable';
import { Ticket, TicketX, Printer, DollarSign } from 'lucide-react';

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
          <div className="animate-spin rounded-full border-b-4 border-midnight-blue
                          h-8 w-8
                          xs:h-10 xs:w-10
                          sm:h-12 sm:w-12
                          md:h-16 md:w-16"></div>
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
      iconColor: 'text-midnight-blue',
      textColor: 'text-deep-navy',
      borderColor: 'border-midnight-blue/20'
    },
    {
      title: 'Tickets Vendidos',
      value: waterPark.soldTickets,
      icon: DollarSign,
      bgColor: 'bg-gradient-to-br from-sky-muted/10 to-blue-soft/20',
      iconColor: 'text-sky-muted',
      textColor: 'text-deep-navy',
      borderColor: 'border-sky-muted/20'
    },
    {
      title: 'Tickets Impresos',
      value: waterPark.printedTickets,
      icon: Printer,
      bgColor: 'bg-gradient-to-br from-blue-soft/10 to-sky-light/30',
      iconColor: 'text-blue-soft',
      textColor: 'text-deep-navy',
      borderColor: 'border-blue-soft/20'
    },
    {
      title: 'Tickets Inactivos',
      value: waterPark.inactiveTickets,
      icon: TicketX,
      bgColor: 'bg-gradient-to-br from-error-100/80 to-error-200/60',
      iconColor: 'text-error-600',
      textColor: 'text-deep-navy',
      borderColor: 'border-error-200/40'
    }
  ];
  
  return (
    <DashboardLayout title={waterPark.name}>
      <div className="animate-fade-in">
        {/* Summary Stats */}
        <div className="responsive-grid mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.title}
                className={`card-compact ${stat.bgColor} border-2 ${stat.borderColor} floating-card animate-slide-up hover:scale-105`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center">
                  <div className={`bg-white/80 backdrop-blur-sm shadow-soft border border-white/40 flex-shrink-0
                                   rounded-xl p-2 mr-2
                                   xs:rounded-2xl xs:p-2.5 xs:mr-3
                                   sm:p-3 sm:mr-4
                                   md:rounded-3xl md:p-4 md:mr-5
                                   lg:p-5 lg:mr-6`}>
                    <Icon className={`${stat.iconColor}
                                      h-4 w-4
                                      xs:h-4 xs:w-4
                                      sm:h-5 sm:w-5
                                      md:h-6 md:w-6
                                      lg:h-7 lg:w-7`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sky-muted truncate font-semibold
                                  text-xs mb-0.5
                                  xs:text-xs xs:mb-1
                                  sm:text-sm sm:mb-1
                                  md:text-sm md:mb-1.5
                                  lg:text-base lg:mb-2">
                      {stat.title}
                    </p>
                    <h3 className={`${stat.textColor} truncate font-bold
                                    text-sm
                                    xs:text-base
                                    sm:text-lg
                                    md:text-xl
                                    lg:text-2xl`}>
                      {stat.value.toLocaleString()}
                    </h3>
                  </div>
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