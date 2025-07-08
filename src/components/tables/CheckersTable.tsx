import React from 'react';
import { User, Mail, Award, Sparkles } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface Checker {
  id: string;
  name: string;
  email: string;
  soldTickets: number;
}

interface CheckersTableProps {
  checkers: Checker[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CheckersTable: React.FC<CheckersTableProps> = ({ 
  checkers, 
  showActions = false,
  onEdit,
  onDelete
}) => {
  const { mode } = useThemeStore();
  
  return (
    <div className={`card floating-card transition-all duration-300
                    ${mode === 'dark' 
                      ? 'bg-gradient-to-br from-[#052659]/90 to-[#1B3B6F]/70 border-[#C1E8FF]/25' 
                      : 'bg-white/95 border-gray-200 shadow-lg'
                    }`}>
      <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2 xs:mb-2.5 sm:mb-3 md:mb-3">
          {/* Enhanced title with icon using blue palette */}
          <div className="flex items-center gap-2">
            <div className={`shadow-[0_0_20px_rgba(27,59,111,0.3)] border-2 border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 group relative overflow-hidden
                            ${mode === 'dark' 
                              ? 'bg-gradient-to-br from-[#1B3B6F]/90 to-[#052659]/90' 
                              : 'bg-gradient-to-br from-[#052659] to-[#1B3B6F]'
                            }
                            rounded-xl p-2
                            xs:rounded-2xl xs:p-2.5
                            sm:p-3
                            md:rounded-3xl md:p-3.5`}>
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12 rounded-xl"></div>
              
              <User className="text-white relative z-10 drop-shadow-lg transition-all duration-300 group-hover:scale-110
                              h-4 w-4
                              xs:h-4 xs:w-4
                              sm:h-5 sm:w-5
                              md:h-6 md:w-6" />
            </div>
            
            <h3 className={`font-bold transition-all duration-300 hover:scale-105 origin-left
                           ${mode === 'dark' ? 'gradient-text' : 'text-gray-900'}
                           text-base
                           xs:text-lg
                           sm:text-xl
                           md:text-2xl`}>
              Checadores
            </h3>
            
            {/* Sparkle effect with blue palette */}
            <Sparkles className={`animate-pulse opacity-70
                                 ${mode === 'dark' ? 'text-[#5483B3]' : 'text-blue-500'}
                               h-4 w-4
                               xs:h-5 xs:w-5
                               sm:h-6 sm:w-6`} />
          </div>
        </div>
        
        <p className={`font-medium transition-all duration-300
                       ${mode === 'dark' 
                         ? 'text-[#5483B3] hover:text-[#7DA0CA]' 
                         : 'text-gray-600 hover:text-gray-800'
                       }
                      text-xs
                      xs:text-sm
                      sm:text-base`}>
          Personal encargado de la venta de tickets
        </p>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Nombre</th>
              <th className="table-header-cell hidden xs:table-cell">Email</th>
              <th className="table-header-cell">Tickets Vendidos</th>
              {showActions && <th className="table-header-cell">Acciones</th>}
            </tr>
          </thead>
          <tbody className="table-body">
            {checkers.map((checker, index) => (
              <tr 
                key={checker.id} 
                className="table-row animate-slide-up hover:bg-gradient-to-r hover:from-sky-light/10 hover:to-blue-soft/5 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="table-body-cell">
                  <div className="flex items-center">
                    {/* Enhanced avatar with blue palette */}
                    <div className={`text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center group relative overflow-hidden border-2 border-white/20
                                    ${mode === 'dark' 
                                      ? 'bg-gradient-to-br from-[#1B3B6F] via-[#052659] to-[#5483B3]' 
                                      : 'bg-gradient-to-br from-[#052659] via-[#1B3B6F] to-[#5483B3]'
                                    }
                                    h-8 w-8 rounded-xl text-xs mr-2
                                    xs:h-9 xs:w-9 xs:rounded-2xl xs:text-sm xs:mr-3
                                    sm:h-10 sm:w-10 sm:text-sm sm:mr-4
                                    md:h-12 md:w-12 md:rounded-2xl md:text-base md:mr-5`}>
                      
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                      
                      {/* Pulse effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
                      
                      <span className="relative z-10 drop-shadow-lg">{checker.name.charAt(0).toUpperCase()}</span>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold block truncate transition-all duration-300 hover:scale-105 origin-left
                                       ${mode === 'dark' 
                                         ? 'text-[#C1E8FF] hover:text-white' 
                                         : 'text-[#021024] hover:text-[#1B3B6F]'
                                       }
                                       text-xs
                                       xs:text-sm
                                       sm:text-base`}>
                        {checker.name}
                      </span>
                      
                      {/* Mobile email display */}
                      <div className="xs:hidden flex items-center mt-0.5">
                        <Mail className={`mr-1 h-3 w-3
                                         ${mode === 'dark' ? 'text-[#5483B3]' : 'text-blue-500'}`} />
                        <span className={`font-medium block truncate text-xs
                                         ${mode === 'dark' ? 'text-[#5483B3]' : 'text-blue-500'}`}>
                          {checker.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="table-body-cell hidden xs:table-cell">
                  <div className="flex items-center">
                    <Mail className={`mr-2 transition-all duration-300 hover:scale-110
                                     ${mode === 'dark' 
                                       ? 'text-[#5483B3] hover:text-[#7DA0CA]' 
                                       : 'text-blue-500 hover:text-blue-600'
                                     }
                                    h-3 w-3
                                    xs:h-4 xs:w-4
                                    sm:h-4 sm:w-4`} />
                    <span className={`font-medium transition-all duration-300
                                     ${mode === 'dark' 
                                       ? 'text-[#5483B3] hover:text-[#7DA0CA]' 
                                       : 'text-blue-500 hover:text-blue-600'
                                     }
                                     text-xs
                                     xs:text-sm
                                     sm:text-base`}>
                      {checker.email}
                    </span>
                  </div>
                </td>
                
                <td className="table-body-cell">
                  <div className="flex items-center">
                    {/* Enhanced badge with blue palette */}
                    <div className={`backdrop-blur-sm flex items-center transition-all duration-300 hover:scale-105 hover:shadow-md group border
                                    ${mode === 'dark' 
                                      ? 'bg-gradient-to-r from-[#5483B3]/10 to-[#7DA0CA]/20 border-[#5483B3]/30' 
                                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                                    }
                                    px-2 py-1 rounded-lg
                                    xs:px-2.5 xs:py-1.5 xs:rounded-xl
                                    sm:px-3 sm:py-1.5 sm:rounded-xl`}>
                      
                      <Award className={`mr-1.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                                        ${mode === 'dark' ? 'text-[#5483B3]' : 'text-blue-600'}
                                       h-3 w-3
                                       xs:h-3 xs:w-3
                                       sm:h-4 sm:w-4`} />
                      
                      <span className={`font-bold
                                       ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#1B3B6F]'}
                                       text-xs
                                       xs:text-xs
                                       sm:text-sm`}>
                        {checker.soldTickets.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </td>
                
                {showActions && (
                  <td className="table-body-cell">
                    <div className="flex space-x-2 xs:space-x-3 sm:space-x-4">
                      <button 
                        onClick={() => onEdit && onEdit(checker.id)}
                        className={`transition-all duration-300 font-semibold hover:scale-105 rounded-lg px-2 py-1
                                   ${mode === 'dark' 
                                     ? 'text-[#5483B3] hover:text-[#C1E8FF] hover:bg-[#5483B3]/20' 
                                     : 'text-[#1B3B6F] hover:text-[#021024] hover:bg-[#C1E8FF]/20'
                                   }
                                   text-xs
                                   xs:text-sm
                                   sm:text-base`}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => onDelete && onDelete(checker.id)}
                        className={`transition-all duration-300 font-semibold hover:scale-105 rounded-lg px-2 py-1
                                   ${mode === 'dark' 
                                     ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' 
                                     : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                                   }
                                   text-xs
                                   xs:text-sm
                                   sm:text-base`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckersTable;