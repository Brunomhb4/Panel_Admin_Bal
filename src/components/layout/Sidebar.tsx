import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Waves, 
  FileText,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { userRole, logout } = useAuthStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    {
      path: userRole === 'admin' ? '/admin' : '/superadmin',
      icon: LayoutDashboard,
      label: 'Dashboard',
      show: true,
      iconColor: 'text-blue-500',
      activeColor: 'from-blue-500 to-blue-600'
    },
    {
      path: '/superadmin/notes',
      icon: FileText,
      label: 'Gestión de Notas',
      show: userRole === 'superadmin',
      iconColor: 'text-green-500',
      activeColor: 'from-green-500 to-green-600'
    },
    {
      path: '/superadmin/waterparks',
      icon: Waves,
      label: 'Gestión de Balnearios',
      show: userRole === 'superadmin',
      iconColor: 'text-cyan-500',
      activeColor: 'from-cyan-500 to-blue-500'
    },
    {
      path: '/superadmin/users',
      icon: Users,
      label: 'Gestión de Usuarios',
      show: userRole === 'superadmin',
      iconColor: 'text-purple-500',
      activeColor: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="flex items-center min-w-0 flex-1">
          {/* Enhanced logo */}
          <div className="flex items-center justify-center bg-gradient-to-br from-midnight-blue via-navy-blue to-sky-muted shadow-2xl animate-float flex-shrink-0 group relative overflow-hidden border-2 border-white/20
                          w-8 h-8 rounded-xl
                          xs:w-9 xs:h-9 xs:rounded-2xl
                          sm:w-10 sm:h-10
                          md:w-12 md:h-12 md:rounded-2xl
                          lg:w-14 lg:h-14 lg:rounded-3xl">
            
            {/* Animated background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-light/20 to-blue-soft/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
            
            <Waves className="text-white relative z-10 drop-shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                              h-4 w-4
                              xs:h-5 xs:w-5
                              sm:h-5 sm:w-5
                              md:h-6 md:w-6
                              lg:h-7 lg:w-7" />
          </div>
          
          <div className="min-w-0 flex-1
                          ml-2
                          xs:ml-3
                          sm:ml-4
                          lg:ml-5">
            <h1 className="gradient-text truncate font-bold transition-all duration-300 hover:scale-105 origin-left
                           text-sm
                           xs:text-base
                           sm:text-lg
                           lg:text-xl">
              Balnearios
            </h1>
            <p className="text-sky-muted truncate font-semibold transition-all duration-300 hover:text-blue-soft
                          text-xs
                          xs:text-xs
                          sm:text-sm">
              Panel Admin
            </p>
          </div>
        </div>
        
        {/* Enhanced close button */}
        <button 
          onClick={onClose}
          className="lg:hidden transition-all duration-300 hover:scale-110 flex-shrink-0 rounded-xl hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 text-sky-muted hover:text-red-500 group relative overflow-hidden
                     p-1
                     xs:p-1.5
                     sm:p-2"
        >
          {/* Animated background */}
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
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`sidebar-nav-item group relative overflow-hidden transition-all duration-300 ${
                    active 
                      ? `sidebar-nav-item-active bg-gradient-to-r ${item.activeColor} text-white shadow-lg scale-105 border-l-4 border-white/50` 
                      : 'sidebar-nav-item-inactive hover:bg-gradient-to-r hover:from-sky-light/30 hover:to-blue-soft/20 hover:shadow-soft hover:scale-102'
                  }`}
                  onClick={onClose}
                >
                  {/* Animated background for inactive items */}
                  {!active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/5 to-sky-muted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  )}
                  
                  {/* Enhanced icon container */}
                  <div className={`relative z-10 flex-shrink-0 transition-all duration-300 ${active ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon className={`transition-all duration-300 drop-shadow-sm ${
                      active 
                        ? 'text-white' 
                        : `${item.iconColor} group-hover:text-midnight-blue`
                    }
                                     mr-2 h-3 w-3
                                     xs:mr-2.5 xs:h-4 xs:w-4
                                     sm:mr-3 sm:h-4 sm:w-4
                                     md:mr-3.5 md:h-5 md:w-5
                                     lg:mr-4 lg:h-6 lg:w-6`} />
                  </div>
                  
                  <span className={`truncate font-semibold relative z-10 transition-all duration-300 ${
                    active ? 'text-white drop-shadow-sm' : 'text-midnight-blue group-hover:text-deep-navy'
                  }
                                   text-xs
                                   xs:text-xs
                                   sm:text-sm
                                   md:text-sm
                                   lg:text-base`}>
                    {item.label}
                  </span>
                  
                  {/* Active indicator glow */}
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50 rounded-xl animate-pulse"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Enhanced logout section */}
      <div className="border-t border-sky-light/30 mt-auto bg-gradient-to-r from-sky-light/10 to-transparent
                      p-2
                      xs:p-3
                      sm:p-4
                      lg:p-6">
        <button 
          onClick={() => {
            logout();
            onClose();
          }} 
          className="w-full flex items-center text-error-600 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 font-semibold group relative overflow-hidden border border-transparent hover:border-red-200
                     px-2 py-2 text-xs rounded-lg
                     xs:px-2.5 xs:py-2.5 xs:text-xs xs:rounded-xl
                     sm:px-3 sm:py-3 sm:text-sm sm:rounded-xl
                     md:px-4 md:py-3.5 md:text-sm md:rounded-2xl
                     lg:px-6 lg:py-4 lg:text-base lg:rounded-2xl"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <LogOut className="flex-shrink-0 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 drop-shadow-sm
                             mr-2 h-3 w-3
                             xs:mr-2.5 xs:h-4 xs:w-4
                             sm:mr-3 sm:h-4 sm:w-4
                             md:mr-3.5 md:h-5 md:w-5
                             lg:mr-4 lg:h-6 lg:w-6" />
          <span className="truncate relative z-10">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;