import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useWaterParksStore } from '../../stores/waterParksStore';
import { useThemeStore } from '../../stores/themeStore';
import { ExternalLink, Activity, Sparkles } from 'lucide-react';

const WaterParksTable: React.FC = () => {
  const { waterParks } = useWaterParksStore();
  const { userRole } = useAuthStore();
  const { mode } = useThemeStore();
  
  const basePath = userRole === 'admin' ? '/admin' : '/superadmin';
  
  return (
    <div className={`card floating-card transition-all duration-300
                    ${mode === 'dark' 
                      ? 'bg-gradient-to-br from-[#052659]/90 to-[#1B3B6F]/70 border-[#C1E8FF]/25' 
                      : 'bg-white/95 border-gray-200 shadow-lg'
                    }`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6
                      mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
        <div className="min-w-0 flex-1">
          <h2 className={`font-bold transition-all duration-300 hover:scale-105 origin-left
                         ${mode === 'dark' ? 'gradient-text' : 'text-gray-900'}
                         text-base mb-1
                         xs:text-lg xs:mb-1.5
                         sm:text-xl sm:mb-2
                         md:text-2xl md:mb-2.5
                         lg:text-3xl lg:mb-3`}>
            Resumen de Balnearios
          </h2>
          <p className={`font-medium transition-all duration-300
                        ${mode === 'dark' 
                          ? 'text-sky-muted hover:text-blue-soft' 
                          : 'text-gray-600 hover:text-gray-800'
                        }
                        text-xs
                        xs:text-sm
                        sm:text-base
                        md:text-base`}>
            Información general de todos los balnearios
          </p>
        </div>
        
        {/* Enhanced activity indicator */}
        <div className={`flex items-center backdrop-blur-sm shadow-soft flex-shrink-0 group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border
                        ${mode === 'dark' 
                          ? 'text-[#C1E8FF] bg-gradient-to-r from-[#5483B3]/40 to-[#7DA0CA]/20 border-[#5483B3]/40' 
                          : 'text-[#1B3B6F] bg-gradient-to-r from-[#C1E8FF]/40 to-[#7DA0CA]/20 border-[#C1E8FF]/40'
                        }
                        px-2 py-1.5 text-xs rounded-lg
                        xs:px-3 xs:py-2 xs:text-xs xs:rounded-xl
                        sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl
                        md:px-5 md:py-3 md:text-sm md:rounded-2xl
                        lg:px-6 lg:py-3 lg:text-base lg:rounded-2xl`}>
          
          {/* Animated background */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-r from-[#5483B3]/10 to-[#7DA0CA]/5' 
                            : 'bg-gradient-to-r from-[#1B3B6F]/5 to-[#5483B3]/5'
                          }`}></div>
          
          {/* Enhanced activity icon */}
          <div className="relative z-10 mr-1.5 xs:mr-2 sm:mr-3">
            <Activity className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-sm
                               h-3 w-3
                               xs:h-4 xs:w-4
                               sm:h-4 sm:w-4
                               md:h-5 md:w-5" />
            
            {/* Pulse effect */}
            <div className={`absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-75
                            ${mode === 'dark' ? 'bg-[#5483B3]/20' : 'bg-[#1B3B6F]/20'}`}></div>
          </div>
          
          <span className="font-semibold relative z-10">{waterParks.length} balnearios</span>
          
          {/* Sparkle effect */}
          <Sparkles className={`ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse
                              ${mode === 'dark' ? 'text-[#7DA0CA]' : 'text-[#5483B3]'}
                              h-3 w-3
                              xs:h-4 xs:w-4
                              sm:h-4 sm:w-4`} />
        </div>
      </div>
      
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Nombre del Balneario</th>
                <th className="table-header-cell">Tickets Activos</th>
                <th className="table-header-cell hidden sm:table-cell">Tickets Vendidos</th>
                <th className="table-header-cell hidden md:table-cell">Ingresos</th>
                <th className="table-header-cell">Acciones</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {waterParks.map((park, index) => (
                <tr 
                  key={park.id} 
                  className="table-row animate-slide-up hover:bg-gradient-to-r hover:from-sky-light/10 hover:to-blue-soft/5 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="table-body-cell">
                    <div className="flex items-center">
                      {/* Enhanced avatar */}
                      <div className="text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#1B3B6F] via-[#052659] to-[#5483B3] group relative overflow-hidden border-2 border-white/20
                                      h-8 w-8 rounded-xl text-xs mr-2
                                      xs:h-9 xs:w-9 xs:rounded-2xl xs:text-sm xs:mr-3
                                      sm:h-10 sm:w-10 sm:text-sm sm:mr-3
                                      md:h-12 md:w-12 md:rounded-2xl md:text-base md:mr-4
                                      lg:h-14 lg:w-14 lg:rounded-3xl lg:text-lg lg:mr-5">
                        
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                        
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#C1E8FF]/20 to-[#7DA0CA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
                        
                        <span className="relative z-10 drop-shadow-lg">{park.name.charAt(0)}</span>
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className={`font-bold truncate transition-all duration-300 hover:scale-105 origin-left
                                        ${mode === 'dark' 
                                          ? 'text-[#C1E8FF] hover:text-white' 
                                          : 'text-[#021024] hover:text-[#1B3B6F]'
                                        }
                                        text-xs
                                        xs:text-sm
                                        sm:text-base
                                        md:text-base
                                        lg:text-lg`}>
                          {park.name}
                        </div>
                        <div className={`font-medium transition-all duration-300
                                        ${mode === 'dark' 
                                          ? 'text-[#5483B3] hover:text-[#7DA0CA]' 
                                          : 'text-blue-500 hover:text-blue-600'
                                        }
                                        text-xs mt-0.5
                                        xs:text-xs xs:mt-0.5
                                        sm:text-xs sm:mt-1
                                        md:text-sm`}>
                          ID: {park.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-body-cell">
                    <span className="badge badge-primary font-bold transition-all duration-300 hover:scale-105 hover:shadow-md
                                     text-xs
                                     xs:text-xs
                                     sm:text-sm">
                      {park.activeTickets.toLocaleString()}
                    </span>
                  </td>
                  
                  <td className="table-body-cell hidden sm:table-cell">
                    <span className="badge badge-success font-bold transition-all duration-300 hover:scale-105 hover:shadow-md
                                     text-xs
                                     xs:text-xs
                                     sm:text-sm">
                      {park.soldTickets.toLocaleString()}
                    </span>
                  </td>
                  
                  <td className="table-body-cell hidden md:table-cell">
                    <span className={`font-bold transition-all duration-300 hover:scale-105 origin-left
                                     ${mode === 'dark' 
                                       ? 'text-[#5483B3] hover:text-[#7DA0CA]' 
                                       : 'text-blue-600 hover:text-blue-700'
                                     }
                                     text-xs
                                     xs:text-sm
                                     sm:text-base
                                     lg:text-lg`}>
                      ${park.totalRevenue.toLocaleString()}
                    </span>
                  </td>
                  
                  <td className="table-body-cell">
                    <Link
                      to={`${basePath}/waterpark/${park.id}`}
                      className={`inline-flex items-center font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border backdrop-blur-sm group relative overflow-hidden
                                 ${mode === 'dark' 
                                   ? 'text-[#C1E8FF] hover:text-white hover:bg-gradient-to-r hover:from-[#5483B3] hover:to-[#1B3B6F] border-[#5483B3]/40 bg-[#052659]/50' 
                                   : 'text-[#1B3B6F] hover:text-white hover:bg-gradient-to-r hover:from-[#1B3B6F] hover:to-[#052659] border-[#C1E8FF]/40 bg-white/50'
                                 }
                                 px-2 py-1.5 text-xs rounded-lg
                                 xs:px-3 xs:py-2 xs:text-xs xs:rounded-xl
                                 sm:px-4 sm:py-2.5 sm:text-sm sm:rounded-xl
                                 md:px-5 md:py-3 md:text-sm md:rounded-2xl
                                 lg:px-6 lg:py-3 lg:text-base lg:rounded-2xl`}
                    >
                      {/* Animated background */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl
                                      ${mode === 'dark' 
                                        ? 'bg-gradient-to-r from-[#5483B3]/10 to-[#1B3B6F]/5' 
                                        : 'bg-gradient-to-r from-[#1B3B6F]/5 to-[#052659]/5'
                                      }`}></div>
                      
                      <span className="mr-1.5 xs:mr-2 sm:mr-3 hidden xs:inline relative z-10">Ver detalles</span>
                      <span className="mr-1.5 xs:hidden relative z-10">Ver</span>
                      
                      {/* Enhanced external link icon */}
                      <ExternalLink className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-sm
                                             h-3 w-3
                                             xs:h-3 xs:w-3
                                             sm:h-4 sm:w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaterParksTable;