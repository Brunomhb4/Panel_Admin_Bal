import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { Menu, Bell, User } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  const { user } = useAuthStore();
  const { mode } = useThemeStore();
  
  return (
    <header className={`header transition-all duration-300
                       ${mode === 'dark' 
                         ? 'bg-gradient-to-r from-[#021024]/95 via-[#052659]/90 to-[#1B3B6F]/85 border-b-2 border-[#C1E8FF]/25' 
                         : 'bg-gradient-to-r from-white/98 via-[#F8F9FA]/95 to-[#F1F5F9]/90 border-b-2 border-[#1B3B6F]/20'
                       } backdrop-blur-xl shadow-lg`}>
      <div className="flex items-center min-w-0 flex-1">
        <button 
          onClick={toggleSidebar}
          className={`lg:hidden focus:outline-none focus:ring-2 transition-all duration-300 hover:scale-110 rounded-xl group relative overflow-hidden border-2
                      ${mode === 'dark' 
                        ? 'focus:ring-[#C1E8FF]/20 hover:bg-gradient-to-r hover:from-[#5483B3]/30 hover:to-[#7DA0CA]/20 text-[#C1E8FF] border-[#C1E8FF]/30 hover:border-[#C1E8FF]/50' 
                        : 'focus:ring-blue-500/20 hover:bg-gray-100 text-[#021024] border-[#1B3B6F]/20 hover:border-[#1B3B6F]/40'
                      }
                     p-1.5 mr-2
                     xs:p-2 xs:mr-3
                     sm:p-2.5 sm:mr-3
                     md:p-3 md:mr-4`}
        >
          {/* Fondo animado */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-r from-[#5483B3]/10 to-[#7DA0CA]/5' 
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                          }`}></div>
          
          {/* Icono con mejor contraste */}
          <Menu className={`relative z-10 transition-all duration-300 group-hover:rotate-180 drop-shadow-lg
                          h-4 w-4
                          xs:h-5 xs:w-5
                          sm:h-5 sm:w-5
                          md:h-6 md:w-6`}
                style={{
                  filter: mode === 'dark' 
                    ? 'drop-shadow(0 0 4px rgba(193, 232, 255, 0.6)) drop-shadow(0 1px 2px rgba(0,0,0,0.3))' 
                    : 'drop-shadow(0 1px 2px rgba(2, 16, 36, 0.2))'
                }} />
        </button>
        
        <div className="min-w-0 flex-1">
          <h1 className={`truncate font-bold transition-all duration-300 hover:scale-105 origin-left
                         ${mode === 'dark' 
                           ? 'text-[#C1E8FF] drop-shadow-lg' 
                           : 'text-[#021024] drop-shadow-sm'
                         }
                         text-sm
                         xs:text-base
                         sm:text-lg
                         md:text-xl
                         lg:text-2xl
                         xl:text-3xl`}
              style={{
                textShadow: mode === 'dark' 
                  ? '0 0 8px rgba(193, 232, 255, 0.6), 0 2px 4px rgba(0,0,0,0.3)' 
                  : '0 1px 2px rgba(2, 16, 36, 0.2)'
              }}>
            {title}
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 xl:space-x-8">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Botón de notificaciones mejorado */}
        <button className={`focus:outline-none focus:ring-2 transition-all duration-300 relative hover:scale-110 rounded-xl group overflow-hidden border-2
                           ${mode === 'dark' 
                             ? 'focus:ring-[#C1E8FF]/20 hover:bg-gradient-to-r hover:from-[#5483B3]/30 hover:to-[#7DA0CA]/20 text-[#C1E8FF] border-[#C1E8FF]/30 hover:border-[#C1E8FF]/50' 
                             : 'focus:ring-blue-500/20 hover:bg-gray-100 text-[#021024] border-[#1B3B6F]/20 hover:border-[#1B3B6F]/40'
                           }
                           p-1.5
                           xs:p-2
                           sm:p-2.5
                           md:p-3
                           lg:p-3`}>
          
          {/* Fondo animado */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-br from-[#5483B3]/15 via-[#7DA0CA]/10 to-[#C1E8FF]/5' 
                            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
                          }`}>
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
          </div>
          
          {/* Icono de campana con mejor contraste */}
          <Bell className={`relative z-10 transition-all duration-300 group-hover:rotate-12 drop-shadow-lg
                          h-4 w-4
                          xs:h-5 xs:w-5
                          sm:h-5 sm:w-5
                          md:h-6 md:w-6`}
                style={{
                  filter: mode === 'dark' 
                    ? 'drop-shadow(0 0 4px rgba(193, 232, 255, 0.6)) drop-shadow(0 1px 2px rgba(0,0,0,0.3))' 
                    : 'drop-shadow(0 1px 2px rgba(2, 16, 36, 0.2))'
                }} />
          
          {/* Badge de notificación mejorado */}
          <span className="absolute bg-gradient-to-br from-red-500 via-red-600 to-pink-600 rounded-full shadow-xl border-2 border-white/90
                           -top-0.5 -right-0.5 h-2.5 w-2.5
                           xs:-top-1 xs:-right-1 xs:h-3 xs:w-3
                           sm:h-3.5 sm:w-3.5
                           md:h-4 md:w-4
                           animate-pulse"
                style={{
                  boxShadow: '0 0 12px rgba(239, 68, 68, 0.8), 0 4px 8px rgba(0,0,0,0.3)'
                }}>
            {/* Efecto de brillo interno mejorado */}
            <span className="absolute inset-0.5 bg-gradient-to-br from-red-300 to-pink-300 rounded-full animate-ping opacity-60"></span>
            {/* Punto central brillante */}
            <span className="absolute inset-1 bg-white rounded-full opacity-80"></span>
          </span>
        </button>
        
        <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 md:space-x-4">
          <div className="hidden sm:block text-right">
            <p className={`font-bold truncate transition-all duration-300
                           ${mode === 'dark' 
                             ? 'text-[#C1E8FF] hover:text-white' 
                             : 'text-[#021024] hover:text-[#1B3B6F]'
                           }
                           text-xs max-w-16
                           sm:text-sm sm:max-w-24
                           md:text-sm md:max-w-32
                           lg:text-base lg:max-w-none`}
                  style={{
                    textShadow: mode === 'dark' 
                      ? '0 0 4px rgba(193, 232, 255, 0.4)' 
                      : '0 1px 1px rgba(2, 16, 36, 0.1)'
                  }}>
              {user?.name}
            </p>
            <p className={`capitalize font-medium transition-all duration-300
                           ${mode === 'dark' 
                             ? 'text-[#7DA0CA] hover:text-[#C1E8FF]' 
                             : 'text-[#5483B3] hover:text-[#1B3B6F]'
                           }
                           text-xs
                           sm:text-xs
                           md:text-sm`}>
              {user?.role}
            </p>
          </div>
          
          {/* Avatar de usuario mejorado */}
          <div className={`text-white flex items-center justify-center font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 animate-float group relative overflow-hidden border-3
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-br from-[#021024] via-[#052659] to-[#1B3B6F] border-[#C1E8FF]/50 shadow-[0_0_25px_rgba(193,232,255,0.4)]' 
                            : 'bg-gradient-to-br from-[#021024] via-[#052659] to-[#1B3B6F] border-[#C1E8FF]/80 shadow-[0_0_20px_rgba(2,16,36,0.3)]'
                          }
                          h-8 w-8 rounded-xl text-xs
                          xs:h-9 xs:w-9 xs:rounded-2xl xs:text-sm
                          sm:h-10 sm:w-10 sm:text-sm
                          md:h-12 md:w-12 md:rounded-2xl md:text-base
                          lg:h-14 lg:w-14 lg:rounded-3xl lg:text-lg`}>
            
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C1E8FF]/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 skew-x-12"></div>
            
            {/* Efecto de pulso sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7DA0CA]/25 to-[#C1E8FF]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
            
            {/* Borde interno brillante */}
            <div className="absolute inset-1 rounded-full border border-[#C1E8FF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {user?.name ? (
              <span className="relative z-10 drop-shadow-2xl text-[#C1E8FF] font-extrabold"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(193, 232, 255, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      textShadow: '0 0 10px rgba(193, 232, 255, 0.8)'
                    }}>
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User className="relative z-10 drop-shadow-2xl text-[#C1E8FF]
                              h-3 w-3
                              xs:h-4 xs:w-4
                              sm:h-4 sm:w-4
                              md:h-5 md:w-5
                              lg:h-6 lg:w-6"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(193, 232, 255, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    }} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;