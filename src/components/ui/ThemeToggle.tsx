import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useThemeStore();
  
  return (
    <button
      onClick={toggleMode}
      className="theme-toggle-btn group relative overflow-hidden"
      aria-label={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-theme-accent/10 to-theme-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        {mode === 'light' ? (
          <Moon className="h-5 w-5 text-theme-accent transition-all duration-300 group-hover:text-theme-highlight group-hover:rotate-12" />
        ) : (
          <Sun className="h-5 w-5 text-theme-highlight transition-all duration-300 group-hover:text-theme-light group-hover:rotate-12" />
        )}
      </div>
      
      {/* Pulse effect */}
      <div className="absolute inset-0 bg-theme-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
    </button>
  );
};

export default ThemeToggle;