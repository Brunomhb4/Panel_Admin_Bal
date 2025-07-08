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
    <header className="header">
      <div className="flex items-center min-w-0 flex-1">
        <button 
          onClick={toggleSidebar}
          className={`lg:hidden focus:outline-none focus:ring-2 transition-all duration-300 hover:scale-110 rounded-xl group relative overflow-hidden
                      ${mode === 'dark' 
                        ? 'focus:ring-sky-muted/20 hover:bg-gradient-to-r hover:from-sky-light/30 hover:to-blue-soft/20 text-midnight-blue' 
                        : 'focus:ring-blue-500/20 hover:bg-gray-100 text-gray-700'
                      }
                     p-1.5 mr-2
                     xs:p-2 xs:mr-3
                     sm:p-2.5 sm:mr-3
                     md:p-3 md:mr-4`}
        >
          {/* Animated background */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl
                          ${mode === 'dark' 
                            ? 'bg-gradient-to-r from-midnight-blue/10 to-sky-muted/10' 
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                          }`}></div>
          
          {/* Icon with enhanced styling */}
          <Menu className="relative z-10 transition-all duration-300 group-hover:rotate-180 drop-shadow-sm
                          h-4 w-4
                          xs:h-5 xs:w-5
                          sm:h-5 sm:w-5
                          md:h-6 md:w-6" />
        </button>
        
        <div className="min-w-0 flex-1">
          <h1 className="gradient-text truncate font-bold transition-all duration-300 hover:scale-105 origin-left
                         text-sm
                         xs:text-base
                         sm:text-lg
                         md:text-xl
                         lg:text-2xl
                         xl:text-3xl">
            {title}
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-6 xl:space-x-8">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Enhanced notification button */}
        <button className="focus:outline-none focus:ring-2 focus:ring-sky-muted/20 transition-all duration-300 relative hover:scale-110 rounded-xl hover:bg-gradient-to-r hover:from-sky-light/30 hover:to-blue-soft/20 text-midnight-blue group overflow-hidden
                           p-1.5
                           xs:p-2
                           sm:p-2.5
                           md:p-3
                           lg:p-3">
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/10 to-sky-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          {/* Bell icon with enhanced styling */}
          <Bell className="relative z-10 transition-all duration-300 group-hover:rotate-12 drop-shadow-sm
                          h-4 w-4
                          xs:h-5 xs:w-5
                          sm:h-5 sm:w-5
                          md:h-6 md:w-6" />
          
          {/* Enhanced notification badge */}
          <span className="absolute bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse border-2 border-white
                           -top-0.5 -right-0.5 h-2.5 w-2.5
                           xs:-top-1 xs:-right-1 xs:h-3 xs:w-3
                           sm:h-3.5 sm:w-3.5
                           md:h-4 md:w-4">
            {/* Inner glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-ping opacity-75"></span>
          </span>
        </button>
        
        <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 md:space-x-4">
          <div className="hidden sm:block text-right">
            <p className="font-bold text-deep-navy truncate transition-all duration-300 hover:text-midnight-blue
                           text-xs max-w-16
                           sm:text-sm sm:max-w-24
                           md:text-sm md:max-w-32
                           lg:text-base lg:max-w-none">
              {user?.name}
            </p>
            <p className="text-sky-muted capitalize font-medium transition-all duration-300 hover:text-blue-soft
                           text-xs
                           sm:text-xs
                           md:text-sm">
              {user?.role}
            </p>
          </div>
          
          {/* Enhanced user avatar */}
          <div className="text-white flex items-center justify-center font-bold shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 animate-float bg-gradient-to-br from-midnight-blue via-navy-blue to-sky-muted group relative overflow-hidden border-2 border-white/20
                          h-8 w-8 rounded-xl text-xs
                          xs:h-9 xs:w-9 xs:rounded-2xl xs:text-sm
                          sm:h-10 sm:w-10 sm:text-sm
                          md:h-12 md:w-12 md:rounded-2xl md:text-base
                          lg:h-14 lg:w-14 lg:rounded-3xl lg:text-lg">
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
            
            {/* Subtle pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-light/20 to-blue-soft/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse"></div>
            
            {user?.name ? (
              <span className="relative z-10 drop-shadow-lg">{user.name.charAt(0).toUpperCase()}</span>
            ) : (
              <User className="relative z-10 drop-shadow-lg
                              h-3 w-3
                              xs:h-4 xs:w-4
                              sm:h-4 sm:w-4
                              md:h-5 md:w-5
                              lg:h-6 lg:w-6" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;