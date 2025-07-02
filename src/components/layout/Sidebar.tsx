import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Waves, 
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
      show: true
    },
    {
      path: '/superadmin/waterparks',
      icon: Waves,
      label: 'Gestión de Balnearios',
      show: userRole === 'superadmin'
    },
    {
      path: '/superadmin/users',
      icon: Users,
      label: 'Gestión de Usuarios',
      show: userRole === 'superadmin'
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="flex items-center min-w-0 flex-1">
          <div className="flex items-center justify-center bg-gradient-to-br from-midnight-blue via-navy-blue to-sky-muted shadow-large animate-float flex-shrink-0
                          w-8 h-8 rounded-xl
                          xs:w-9 xs:h-9 xs:rounded-2xl
                          sm:w-10 sm:h-10
                          md:w-12 md:h-12 md:rounded-2xl
                          lg:w-14 lg:h-14 lg:rounded-3xl">
            <Waves className="text-white
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
            <h1 className="gradient-text truncate font-bold
                           text-sm
                           xs:text-base
                           sm:text-lg
                           lg:text-xl">
              Balnearios
            </h1>
            <p className="text-sky-muted truncate font-semibold
                          text-xs
                          xs:text-xs
                          sm:text-sm">
              Panel Admin
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden transition-all duration-300 hover:scale-105 flex-shrink-0 rounded-xl hover:bg-sky-light/30 text-sky-muted hover:text-midnight-blue
                     p-1
                     xs:p-1.5
                     sm:p-2"
        >
          <X className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
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
                  className={`sidebar-nav-item ${
                    active ? 'sidebar-nav-item-active' : 'sidebar-nav-item-inactive'
                  }`}
                  onClick={onClose}
                >
                  <Icon className="flex-shrink-0
                                   mr-2 h-3 w-3
                                   xs:mr-2.5 xs:h-4 xs:w-4
                                   sm:mr-3 sm:h-4 sm:w-4
                                   md:mr-3.5 md:h-5 md:w-5
                                   lg:mr-4 lg:h-6 lg:w-6" />
                  <span className="truncate font-semibold
                                   text-xs
                                   xs:text-xs
                                   sm:text-sm
                                   md:text-sm
                                   lg:text-base">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
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
          className="w-full flex items-center text-error-600 transition-all duration-300 hover:shadow-soft hover:scale-105 hover:bg-error-50/80 font-semibold
                     px-2 py-2 text-xs rounded-lg
                     xs:px-2.5 xs:py-2.5 xs:text-xs xs:rounded-xl
                     sm:px-3 sm:py-3 sm:text-sm sm:rounded-xl
                     md:px-4 md:py-3.5 md:text-sm md:rounded-2xl
                     lg:px-6 lg:py-4 lg:text-base lg:rounded-2xl"
        >
          <LogOut className="flex-shrink-0
                             mr-2 h-3 w-3
                             xs:mr-2.5 xs:h-4 xs:w-4
                             sm:mr-3 sm:h-4 sm:w-4
                             md:mr-3.5 md:h-5 md:w-5
                             lg:mr-4 lg:h-6 lg:w-6" />
          <span className="truncate">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;