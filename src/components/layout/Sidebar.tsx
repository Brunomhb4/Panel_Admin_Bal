import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Waves, 
  ChefHat,
  UtensilsCrossed,
  Coffee,
  ShoppingBag,
  Briefcase,
  LogOut,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { userRole, logout } = useAuthStore();
  const { mode } = useThemeStore();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  const navItems = [
    {
      path: userRole === 'admin' ? '/admin' : '/superadmin',
      icon: LayoutDashboard,
      label: 'Dashboard',
      show: true,
      iconColor: mode === 'dark' ? '#C1E8FF' : '#021024',
      activeGradient: 'from-[#021024] via-[#052659] to-[#1B3B6F]',
      hoverBg: mode === 'dark' ? 'from-[#052659]/30 to-[#1B3B6F]/20' : 'from-[#C1E8FF]/40 to-[#7DA0CA]/30'
    },
    {
      path: '/superadmin/waterparks',
      icon: Waves,
      label: 'Gestión de Balnearios',
      show: userRole === 'superadmin',
      iconColor: mode === 'dark' ? '#C1E8FF' : '#021024',
      activeGradient: 'from-[#052659] via-[#1B3B6F] to-[#5483B3]',
      hoverBg: mode === 'dark' ? 'from-[#1B3B6F]/30 to-[#5483B3]/20' : 'from-[#7DA0CA]/40 to-[#C1E8FF]/30'
    },
    {
      key: 'food-services',
      icon: UtensilsCrossed,
      label: 'Servicios de Comida',
      show: userRole === 'superadmin',
      iconColor: mode === 'dark' ? '#C1E8FF' : '#021024',
      activeGradient: 'from-[#1B3B6F] via-[#5483B3] to-[#7DA0CA]',
      hoverBg: mode === 'dark' ? 'from-[#5483B3]/30 to-[#7DA0CA]/20' : 'from-[#5483B3]/40 to-[#7DA0CA]/30',
      submenu: [
        {
          path: '/superadmin/restaurant',
          icon: ChefHat,
          label: 'Restaurante',
          iconColor: mode === 'dark' ? '#C1E8FF' : '#021024',
          activeGradient: 'from-[#5483B3] via-[#7DA0CA] to-[#C1E8FF]',
          hoverBg: mode === 'dark' ? 'from-[#7DA0CA]/30 to-[#C1E8FF]/20' : 'from-[#7DA0CA]/40 to-[#C1E8FF]/30'
        },
        {
          path: '/superadmin/snacks',
          icon: Coffee,
          label: 'Snacks',
          iconColor: mode === 'dark' ? '#C1E8FF' : '#021024',
          activeGradient: 'from-[#7DA0CA] via-[#C1E8FF] to-white',
          hoverBg: mode === 'dark' ? 'from-[#C1E8FF]/30 to-white/20' : 'from-[#C1E8FF]/40 to-white/30'
        },
        {
          path: '/superadmin/store',
          icon: ShoppingBag,
          label: 'Tienda',
          iconColor: mode === 'dark' ? '#C1E8FF' : '#021024',
          activeGradient: 'from-[#1B3B6F] via-[#5483B3] to-[#7DA0CA]',
          hoverBg: mode === 'dark' ? 'from-[#1B3B6F]/30 to-[#5483B3]/20' : 'from-[#1B3B6F]/40 to-[#5483B3]/30'
        }
      ]
    },
    {
      path: '/superadmin/users',
      icon: Users,
      label: 'Gestión de Usuarios',
      show: userRole === 'superadmin',
      iconColor: mode === 'dark' ? '#C1E8FF' : '#021024',
      activeGradient: 'from-[#5483B3] via-[#7DA0CA] to-[#C1E8FF]',
      hoverBg: mode === 'dark' ? 'from-[#7DA0CA]/30 to-[#C1E8FF]/20' : 'from-[#1B3B6F]/40 to-[#5483B3]/30'
    }
  ];

  return (
    <aside className={`sidebar transition-all duration-300
                      ${mode === 'dark' 
                        ? 'bg-gradient-to-b from-[#021024]/95 via-[#052659]/90 to-[#1B3B6F]/85 border-r-2 border-[#C1E8FF]/25' 
                        : 'bg-gradient-to-b from-white/98 via-[#F8F9FA]/95 to-[#F1F5F9]/90 border-r-2 border-[#1B3B6F]/20'
                      } backdrop-blur-xl shadow-2xl`}>
      <div className={`sidebar-header transition-all duration-300
                      ${mode === 'dark' 
                        ? 'bg-gradient-to-r from-[#052659]/80 to-[#1B3B6F]/60 border-b-2 border-[#C1E8FF]/30' 
                        : 'bg-gradient-to-r from-[#F8F9FA]/90 to-white/95 border-b-2 border-[#1B3B6F]/15'
                      } backdrop-blur-sm`}>
        <div className="flex items-center min-w-0 flex-1">
          {/* Logo mejorado con máximo contraste */}
          <div className={`flex items-center justify-center shadow-2xl animate-float flex-shrink-0 group relative overflow-hidden border-3 transition-all duration-500 hover:scale-110 hover:rotate-6
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-br from-[#021024] via-[#052659] to-[#1B3B6F] border-[#C1E8FF]/50 shadow-[0_0_30px_rgba(193,232,255,0.4)]' 
                            : 'bg-gradient-to-br from-[#021024] via-[#052659] to-[#1B3B6F] border-[#C1E8FF]/80 shadow-[0_0_25px_rgba(2,16,36,0.3)]'
                          }
                          w-10 h-10 rounded-2xl
                          xs:w-11 xs:h-11 xs:rounded-2xl
                          sm:w-12 sm:h-12 sm:rounded-3xl
                          md:w-14 md:h-14 md:rounded-3xl
                          lg:w-16 lg:h-16 lg:rounded-3xl`}>
            
            {/* Efectos de fondo animados mejorados */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C1E8FF]/30 to-[#7DA0CA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
            
            {/* Efecto de brillo mejorado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C1E8FF]/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 skew-x-12"></div>
            
            {/* Borde interno brillante */}
            <div className="absolute inset-1 rounded-full border border-[#C1E8FF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <Waves className={`relative z-10 drop-shadow-2xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 font-black
                              ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#C1E8FF]'}
                              h-5 w-5
                              xs:h-6 xs:w-6
                              sm:h-6 sm:w-6
                              md:h-7 md:w-7
                              lg:h-8 lg:w-8`} 
                  style={{
                    filter: mode === 'dark' 
                      ? 'drop-shadow(0 0 8px rgba(193, 232, 255, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))' 
                      : 'drop-shadow(0 0 6px rgba(193, 232, 255, 0.9)) drop-shadow(0 2px 4px rgba(2,16,36,0.3))',
                    textShadow: '0 0 10px rgba(193, 232, 255, 0.8)'
                  }} />
          </div>
          
          <div className="min-w-0 flex-1 ml-3 xs:ml-4 sm:ml-5 lg:ml-6">
            <h1 className={`truncate font-bold transition-all duration-300 hover:scale-105 origin-left
                           ${mode === 'dark' 
                             ? 'text-[#C1E8FF] drop-shadow-lg' 
                             : 'text-[#021024] drop-shadow-sm'
                           }
                           text-sm
                           xs:text-base
                           sm:text-lg
                           lg:text-xl`}
                style={{
                  textShadow: mode === 'dark' 
                    ? '0 0 8px rgba(193, 232, 255, 0.6), 0 2px 4px rgba(0,0,0,0.3)' 
                    : '0 1px 2px rgba(2, 16, 36, 0.2)'
                }}>
              Balnearios
            </h1>
            <p className={`truncate font-semibold transition-all duration-300
                          ${mode === 'dark' 
                            ? 'text-[#7DA0CA] hover:text-[#C1E8FF]' 
                            : 'text-[#5483B3] hover:text-[#1B3B6F]'
                          }
                          text-xs
                          xs:text-xs
                          sm:text-sm`}>
              Panel Admin
            </p>
          </div>
        </div>
        
        {/* Botón de cerrar mejorado */}
        <button 
          onClick={onClose}
          className={`lg:hidden transition-all duration-300 hover:scale-110 flex-shrink-0 rounded-xl group relative overflow-hidden border-2
                     ${mode === 'dark' 
                       ? 'hover:bg-gradient-to-r hover:from-red-900/30 hover:to-pink-900/20 text-[#7DA0CA] hover:text-red-400 border-[#7DA0CA]/30 hover:border-red-400/50' 
                       : 'hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 text-[#5483B3] hover:text-red-600 border-[#5483B3]/30 hover:border-red-500/50'
                     }
                     p-1.5
                     xs:p-2
                     sm:p-2.5`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <X className="relative z-10 transition-all duration-300 group-hover:rotate-90
                        h-4 w-4
                        xs:h-5 xs:w-5
                        sm:h-6 sm:w-6" />
        </button>
      </div>
      
      <nav className="sidebar-nav custom-scrollbar">
        <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2">
          {navItems.filter(item => item.show).map((item) => {
            const Icon = item.icon; 
            const hasSubmenu = 'submenu' in item;
            const active = hasSubmenu ? false : isActive(item.path);
            const isSubmenuOpen = openSubmenu === item.key;
            const isSubmenuActive = hasSubmenu && item.submenu?.some(subItem => isActive(subItem.path));
            
            return (
              <li key={hasSubmenu ? item.key : item.path}>
                {hasSubmenu ? (
                  <div className="space-y-1">
                    {/* Submenu header */}
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className={`sidebar-nav-item group relative overflow-hidden transition-all duration-300 border-2 w-full flex items-center justify-between
                                 ${isSubmenuActive 
                                   ? `bg-gradient-to-r ${item.activeGradient} text-[#C1E8FF] shadow-2xl scale-105 border-[#C1E8FF]/60 shadow-[0_0_25px_rgba(193,232,255,0.4)]` 
                                   : `hover:bg-gradient-to-r hover:${item.hoverBg} hover:shadow-lg hover:scale-102 border-transparent hover:border-[#C1E8FF]/30 ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`
                                 }`}
                    >
                      {/* Fondo animado para elementos inactivos */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl
                                      ${mode === 'dark' 
                                        ? 'bg-gradient-to-r from-[#1B3B6F]/10 to-[#5483B3]/5' 
                                        : 'bg-gradient-to-r from-[#C1E8FF]/20 to-[#7DA0CA]/10'
                                      }`}></div>
                      
                      <div className="flex items-center flex-1">
                        {/* Contenedor de icono mejorado */}
                        <div className={`relative z-10 flex-shrink-0 transition-all duration-300 ${isSubmenuActive ? 'scale-125' : 'group-hover:scale-110'}`}>
                          <Icon className={`transition-all duration-300 drop-shadow-lg ${
                            isSubmenuActive 
                              ? 'text-[#C1E8FF]' 
                              : item.iconColor
                          }
                                         mr-2 h-4 w-4
                                         xs:mr-2.5 xs:h-5 xs:w-5
                                         sm:mr-3 sm:h-5 sm:w-5
                                         md:mr-3.5 md:h-6 md:w-6
                                         lg:mr-4 lg:h-7 lg:w-7`}
                                style={{
                                  filter: isSubmenuActive 
                                    ? 'drop-shadow(0 0 8px rgba(193, 232, 255, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))' 
                                    : mode === 'dark' 
                                      ? 'drop-shadow(0 0 4px rgba(193, 232, 255, 0.4)) drop-shadow(0 1px 2px rgba(0,0,0,0.2))' 
                                      : 'drop-shadow(0 1px 2px rgba(2, 16, 36, 0.2))',
                                  textShadow: isSubmenuActive ? '0 0 6px rgba(193, 232, 255, 0.6)' : 'none'
                                }} />
                        </div>
                        
                        <span className={`truncate font-semibold relative z-10 transition-all duration-300 ${
                          isSubmenuActive 
                            ? 'text-[#C1E8FF] drop-shadow-lg font-bold' 
                            : mode === 'dark' 
                              ? 'text-[#C1E8FF] group-hover:text-white' 
                              : 'text-[#021024] group-hover:text-[#052659]'
                        }
                                         text-xs
                                         xs:text-xs
                                         sm:text-sm
                                         md:text-sm
                                         lg:text-base`}
                              style={{
                                textShadow: isSubmenuActive 
                                  ? '0 0 6px rgba(193, 232, 255, 0.6), 0 1px 2px rgba(0,0,0,0.3)' 
                                  : mode === 'dark' 
                                    ? '0 0 2px rgba(193, 232, 255, 0.3)' 
                                    : '0 1px 1px rgba(2, 16, 36, 0.1)'
                              }}>
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Chevron icon */}
                      {isSubmenuOpen ? (
                        <ChevronDown className={`relative z-10 transition-all duration-300 ${
                          isSubmenuActive ? 'text-[#C1E8FF]' : item.iconColor
                        } h-4 w-4 xs:h-5 xs:w-5`} />
                      ) : (
                        <ChevronRight className={`relative z-10 transition-all duration-300 ${
                          isSubmenuActive ? 'text-[#C1E8FF]' : item.iconColor
                        } h-4 w-4 xs:h-5 xs:w-5`} />
                      )}
                      
                      {/* Indicador activo con brillo */}
                      {isSubmenuActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#C1E8FF]/20 to-transparent opacity-60 rounded-xl animate-pulse"></div>
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C1E8FF] to-[#7DA0CA] rounded-r-full shadow-[0_0_10px_rgba(193,232,255,0.8)]"></div>
                        </>
                      )}
                    </button>
                    
                    {/* Submenu items */}
                    <div className={`overflow-hidden transition-all duration-300 pl-4 ${isSubmenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="space-y-1 border-l-2 border-[#5483B3]/30 pl-2">
                        {item.submenu?.map(subItem => {
                          const SubIcon = subItem.icon;
                          const subActive = isActive(subItem.path);
                          
                          return (
                            <li key={subItem.path}>
                              <Link 
                                to={subItem.path}
                                className={`sidebar-nav-item group relative overflow-hidden transition-all duration-300 border-2 ${
                                  subActive 
                                    ? `bg-gradient-to-r ${subItem.activeGradient} text-[#C1E8FF] shadow-2xl scale-105 border-[#C1E8FF]/60 shadow-[0_0_25px_rgba(193,232,255,0.4)]` 
                                    : `hover:bg-gradient-to-r hover:${subItem.hoverBg} hover:shadow-lg hover:scale-102 border-transparent hover:border-[#C1E8FF]/30 ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`
                                }`}
                                onClick={onClose}
                              >
                                {/* Fondo animado para elementos inactivos */}
                                {!subActive && (
                                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl
                                                  ${mode === 'dark' 
                                                    ? 'bg-gradient-to-r from-[#1B3B6F]/10 to-[#5483B3]/5' 
                                                    : 'bg-gradient-to-r from-[#C1E8FF]/20 to-[#7DA0CA]/10'
                                                  }`}></div>
                                )}
                                
                                {/* Contenedor de icono mejorado */}
                                <div className={`relative z-10 flex-shrink-0 transition-all duration-300 ${subActive ? 'scale-125' : 'group-hover:scale-110'}`}>
                                  <SubIcon className={`transition-all duration-300 drop-shadow-lg ${
                                    subActive 
                                      ? 'text-[#C1E8FF]' 
                                      : subItem.iconColor
                                  }
                                                   mr-2 h-4 w-4
                                                   xs:mr-2.5 xs:h-5 xs:w-5
                                                   sm:mr-3 sm:h-5 sm:w-5
                                                   md:mr-3.5 md:h-6 md:w-6
                                                   lg:mr-4 lg:h-7 lg:w-7`}
                                        style={{
                                          filter: subActive 
                                            ? 'drop-shadow(0 0 8px rgba(193, 232, 255, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))' 
                                            : mode === 'dark' 
                                              ? 'drop-shadow(0 0 4px rgba(193, 232, 255, 0.4)) drop-shadow(0 1px 2px rgba(0,0,0,0.2))' 
                                              : 'drop-shadow(0 1px 2px rgba(2, 16, 36, 0.2))',
                                          textShadow: subActive ? '0 0 6px rgba(193, 232, 255, 0.6)' : 'none'
                                        }} />
                                </div>
                                
                                <span className={`truncate font-semibold relative z-10 transition-all duration-300 ${
                                  subActive 
                                    ? 'text-[#C1E8FF] drop-shadow-lg font-bold' 
                                    : mode === 'dark' 
                                      ? 'text-[#C1E8FF] group-hover:text-white' 
                                      : 'text-[#021024] group-hover:text-[#052659]'
                                }
                                                 text-xs
                                                 xs:text-xs
                                                 sm:text-sm
                                                 md:text-sm
                                                 lg:text-base`}
                                      style={{
                                        textShadow: subActive 
                                          ? '0 0 6px rgba(193, 232, 255, 0.6), 0 1px 2px rgba(0,0,0,0.3)' 
                                          : mode === 'dark' 
                                            ? '0 0 2px rgba(193, 232, 255, 0.3)' 
                                            : '0 1px 1px rgba(2, 16, 36, 0.1)'
                                      }}>
                                  {subItem.label}
                                </span>
                                
                                {/* Indicador activo con brillo */}
                                {subActive && (
                                  <>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#C1E8FF]/20 to-transparent opacity-60 rounded-xl animate-pulse"></div>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C1E8FF] to-[#7DA0CA] rounded-r-full shadow-[0_0_10px_rgba(193,232,255,0.8)]"></div>
                                  </>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={item.path}
                    className={`sidebar-nav-item group relative overflow-hidden transition-all duration-300 border-2 ${
                      active 
                        ? `bg-gradient-to-r ${item.activeGradient} text-[#C1E8FF] shadow-2xl scale-105 border-[#C1E8FF]/60 shadow-[0_0_25px_rgba(193,232,255,0.4)]` 
                        : `hover:bg-gradient-to-r hover:${item.hoverBg} hover:shadow-lg hover:scale-102 border-transparent hover:border-[#C1E8FF]/30 ${mode === 'dark' ? 'text-[#C1E8FF]' : 'text-[#021024]'}`
                    }`}
                    onClick={onClose}
                  >
                    {/* Fondo animado para elementos inactivos */}
                    {!active && (
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl
                                      ${mode === 'dark' 
                                        ? 'bg-gradient-to-r from-[#1B3B6F]/10 to-[#5483B3]/5' 
                                        : 'bg-gradient-to-r from-[#C1E8FF]/20 to-[#7DA0CA]/10'
                                      }`}></div>
                    )}
                    
                    {/* Contenedor de icono mejorado */}
                    <div className={`relative z-10 flex-shrink-0 transition-all duration-300 ${active ? 'scale-125' : 'group-hover:scale-110'}`}>
                      <Icon className={`transition-all duration-300 drop-shadow-lg ${
                        active 
                          ? 'text-[#C1E8FF]' 
                          : item.iconColor
                      }
                                       mr-2 h-4 w-4
                                       xs:mr-2.5 xs:h-5 xs:w-5
                                       sm:mr-3 sm:h-5 sm:w-5
                                       md:mr-3.5 md:h-6 md:w-6
                                       lg:mr-4 lg:h-7 lg:w-7`}
                            style={{
                              filter: active 
                                ? 'drop-shadow(0 0 8px rgba(193, 232, 255, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))' 
                                : mode === 'dark' 
                                  ? 'drop-shadow(0 0 4px rgba(193, 232, 255, 0.4)) drop-shadow(0 1px 2px rgba(0,0,0,0.2))' 
                                  : 'drop-shadow(0 1px 2px rgba(2, 16, 36, 0.2))',
                              textShadow: active ? '0 0 6px rgba(193, 232, 255, 0.6)' : 'none'
                            }} />
                    </div>
                    
                    <span className={`truncate font-semibold relative z-10 transition-all duration-300 ${
                      active 
                        ? 'text-[#C1E8FF] drop-shadow-lg font-bold' 
                        : mode === 'dark' 
                          ? 'text-[#C1E8FF] group-hover:text-white' 
                          : 'text-[#021024] group-hover:text-[#052659]'
                    }
                                     text-xs
                                     xs:text-xs
                                     sm:text-sm
                                     md:text-sm
                                     lg:text-base`}
                          style={{
                            textShadow: active 
                              ? '0 0 6px rgba(193, 232, 255, 0.6), 0 1px 2px rgba(0,0,0,0.3)' 
                              : mode === 'dark' 
                                ? '0 0 2px rgba(193, 232, 255, 0.3)' 
                                : '0 1px 1px rgba(2, 16, 36, 0.1)'
                          }}>
                      {item.label}
                    </span>
                    
                    {/* Indicador activo con brillo */}
                    {active && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#C1E8FF]/20 to-transparent opacity-60 rounded-xl animate-pulse"></div>
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C1E8FF] to-[#7DA0CA] rounded-r-full shadow-[0_0_10px_rgba(193,232,255,0.8)]"></div>
                      </>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Sección de logout mejorada */}
      <div className={`border-t-2 mt-auto backdrop-blur-sm transition-all duration-300
                      ${mode === 'dark' 
                        ? 'border-[#C1E8FF]/30 bg-gradient-to-r from-[#C1E8FF]/10 to-transparent' 
                        : 'border-[#1B3B6F]/20 bg-gradient-to-r from-[#F8F9FA]/80 to-transparent'
                      }
                      p-2
                      xs:p-3
                      sm:p-4
                      lg:p-6`}>
        <button 
          onClick={() => {
            logout();
            onClose();
          }} 
          className={`w-full flex items-center font-semibold group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:scale-105
                     ${mode === 'dark' 
                       ? 'text-red-400 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-900/30 hover:to-pink-900/20 border-red-400/30 hover:border-red-300/50' 
                       : 'text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 border-red-600/30 hover:border-red-700/50'
                     }
                     px-2 py-2 text-xs rounded-lg
                     xs:px-2.5 xs:py-2.5 xs:text-xs xs:rounded-xl
                     sm:px-3 sm:py-3 sm:text-sm sm:rounded-xl
                     md:px-4 md:py-3.5 md:text-sm md:rounded-2xl
                     lg:px-6 lg:py-4 lg:text-base lg:rounded-2xl`}
        >
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <LogOut className={`flex-shrink-0 relative z-10 transition-all duration-300 group-hover:scale-125 group-hover:-rotate-12 drop-shadow-lg
                             mr-2 h-4 w-4
                             xs:mr-2.5 xs:h-5 xs:w-5
                             sm:mr-3 sm:h-5 sm:w-5
                             md:mr-3.5 md:h-6 md:w-6
                             lg:mr-4 lg:h-7 lg:w-7`}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.4)) drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
                  }} />
          <span className="truncate relative z-10 drop-shadow-sm">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;