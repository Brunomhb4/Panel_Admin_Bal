import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none focus:ring-2 focus:ring-sky-muted/20 transition-all duration-300 relative hover:scale-110 rounded-xl hover:bg-gradient-to-r hover:from-sky-light/30 hover:to-blue-soft/20 dark:hover:from-midnight-blue/30 dark:hover:to-navy-blue/20 text-midnight-blue dark:text-sky-light group overflow-hidden
                 p-1.5
                 xs:p-2
                 sm:p-2.5
                 md:p-3
                 lg:p-3"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/10 to-sky-muted/10 dark:from-sky-light/10 dark:to-blue-soft/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      
      {/* Icon with enhanced styling */}
      {theme === 'light' ? (
        <Moon className="relative z-10 transition-all duration-300 group-hover:rotate-12 drop-shadow-sm
                        h-4 w-4
                        xs:h-5 xs:w-5
                        sm:h-5 sm:w-5
                        md:h-6 md:w-6" />
      ) : (
        <Sun className="relative z-10 transition-all duration-300 group-hover:rotate-12 drop-shadow-sm
                       h-4 w-4
                       xs:h-5 xs:w-5
                       sm:h-5 sm:w-5
                       md:h-6 md:w-6" />
      )}
    </button>
  );
};

export default ThemeToggle;