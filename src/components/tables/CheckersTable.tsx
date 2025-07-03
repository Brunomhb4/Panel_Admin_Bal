import React from 'react';
import { User, Mail, Award, Sparkles } from 'lucide-react';

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
  return (
    <div className="card floating-card">
      <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2 xs:mb-2.5 sm:mb-3 md:mb-3">
          {/* Enhanced title with icon */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500/90 to-purple-600/90 shadow-[0_0_15px_rgba(99,102,241,0.3)] border-2 border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3
                            rounded-xl p-2
                            xs:rounded-2xl xs:p-2.5
                            sm:p-3
                            md:rounded-3xl md:p-3.5">
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 skew-x-12 rounded-xl"></div>
              
              <User className="text-white relative z-10 drop-shadow-lg
                              h-4 w-4
                              xs:h-4 xs:w-4
                              sm:h-5 sm:w-5
                              md:h-6 md:w-6" />
            </div>
            
            <h3 className="gradient-text font-bold transition-all duration-300 hover:scale-105 origin-left
                           text-base
                           xs:text-lg
                           sm:text-xl
                           md:text-2xl">
              Checadores
            </h3>
            
            {/* Sparkle effect */}
            <Sparkles className="text-sky-muted animate-pulse opacity-70
                               h-4 w-4
                               xs:h-5 xs:w-5
                               sm:h-6 sm:w-6" />
          </div>
        </div>
        
        <p className="text-sky-muted font-medium transition-all duration-300 hover:text-blue-soft
                      text-xs
                      xs:text-sm
                      sm:text-base">
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
                    {/* Enhanced avatar */}
                    <div className="text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 group relative overflow-hidden border-2 border-white/20
                                    h-8 w-8 rounded-xl text-xs mr-2
                                    xs:h-9 xs:w-9 xs:rounded-2xl xs:text-sm xs:mr-3
                                    sm:h-10 sm:w-10 sm:text-sm sm:mr-4
                                    md:h-12 md:w-12 md:rounded-2xl md:text-base md:mr-5">
                      
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                      
                      {/* Pulse effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
                      
                      <span className="relative z-10 drop-shadow-lg">{checker.name.charAt(0).toUpperCase()}</span>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-deep-navy block truncate transition-all duration-300 hover:text-midnight-blue hover:scale-105 origin-left
                                       text-xs
                                       xs:text-sm
                                       sm:text-base">
                        {checker.name}
                      </span>
                      
                      {/* Mobile email display */}
                      <div className="xs:hidden flex items-center mt-0.5">
                        <Mail className="text-sky-muted mr-1 h-3 w-3" />
                        <span className="text-sky-muted font-medium block truncate text-xs">
                          {checker.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="table-body-cell hidden xs:table-cell">
                  <div className="flex items-center">
                    <Mail className="text-sky-muted mr-2 transition-all duration-300 hover:text-blue-soft hover:scale-110
                                    h-3 w-3
                                    xs:h-4 xs:w-4
                                    sm:h-4 sm:w-4" />
                    <span className="text-sky-muted font-medium transition-all duration-300 hover:text-blue-soft
                                     text-xs
                                     xs:text-sm
                                     sm:text-base">
                      {checker.email}
                    </span>
                  </div>
                </td>
                
                <td className="table-body-cell">
                  <div className="flex items-center">
                    {/* Enhanced badge with icon */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-green-600/10 border border-emerald-500/20 backdrop-blur-sm flex items-center transition-all duration-300 hover:scale-105 hover:shadow-md group
                                    px-2 py-1 rounded-lg
                                    xs:px-2.5 xs:py-1.5 xs:rounded-xl
                                    sm:px-3 sm:py-1.5 sm:rounded-xl">
                      
                      <Award className="text-emerald-600 mr-1.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                                       h-3 w-3
                                       xs:h-3 xs:w-3
                                       sm:h-4 sm:w-4" />
                      
                      <span className="font-bold text-emerald-700
                                       text-xs
                                       xs:text-xs
                                       sm:text-sm">
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
                        className="text-midnight-blue hover:text-deep-navy transition-all duration-300 font-semibold hover:scale-105 hover:bg-sky-light/20 rounded-lg px-2 py-1
                                   text-xs
                                   xs:text-sm
                                   sm:text-base"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => onDelete && onDelete(checker.id)}
                        className="text-error-600 hover:text-error-900 transition-all duration-300 font-semibold hover:scale-105 hover:bg-red-50 rounded-lg px-2 py-1
                                   text-xs
                                   xs:text-sm
                                   sm:text-base"
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