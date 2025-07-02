import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  const { user } = useAuthStore();
  
  return (
    <header className="header">
      <div className="flex items-center min-w-0 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-sky-muted/20 transition-all duration-300 hover:scale-105 rounded-xl hover:bg-sky-light/30 text-midnight-blue
                     p-1.5 mr-2
                     xs:p-2 xs:mr-3
                     sm:p-2.5 sm:mr-3
                     md:p-3 md:mr-4"
        >
          <Menu className="h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="gradient-text truncate font-bold
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
        <button className="focus:outline-none focus:ring-2 focus:ring-sky-muted/20 transition-all duration-300 relative hover:scale-105 rounded-xl hover:bg-sky-light/30 text-midnight-blue
                           p-1.5
                           xs:p-2
                           sm:p-2.5
                           md:p-3
                           lg:p-3">
          <Bell className="h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          <span className="absolute bg-gradient-to-r from-error-500 to-error-600 rounded-full shadow-soft animate-pulse
                           -top-0.5 -right-0.5 h-2.5 w-2.5
                           xs:-top-1 xs:-right-1 xs:h-3 xs:w-3
                           sm:h-3.5 sm:w-3.5
                           md:h-4 md:w-4"></span>
        </button>
        
        <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 md:space-x-4">
          <div className="hidden sm:block text-right">
            <p className="font-bold text-deep-navy truncate
                           text-xs max-w-16
                           sm:text-sm sm:max-w-24
                           md:text-sm md:max-w-32
                           lg:text-base lg:max-w-none">
              {user?.name}
            </p>
            <p className="text-sky-muted capitalize font-medium
                           text-xs
                           sm:text-xs
                           md:text-sm">
              {user?.role}
            </p>
          </div>
          <div className="text-white flex items-center justify-center font-bold shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 animate-float bg-gradient-to-br from-midnight-blue via-navy-blue to-sky-muted
                          h-8 w-8 rounded-xl text-xs
                          xs:h-9 xs:w-9 xs:rounded-2xl xs:text-sm
                          sm:h-10 sm:w-10 sm:text-sm
                          md:h-12 md:w-12 md:rounded-2xl md:text-base
                          lg:h-14 lg:w-14 lg:rounded-3xl lg:text-lg">
            {user?.name ? (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            ) : (
              <User className="h-3 w-3 xs:h-4 xs:w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;