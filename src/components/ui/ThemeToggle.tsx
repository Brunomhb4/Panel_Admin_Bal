import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useThemeStore();
  
  return (
    <div className="relative">
      <button
        onClick={toggleMode}
        className={`
          relative p-2 rounded-xl transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          group overflow-hidden
          ${mode === 'light' 
            ? 'bg-gray-100 hover:bg-gray-200 focus:ring-blue-500 text-gray-700' 
            : 'bg-gray-800 hover:bg-gray-700 focus:ring-blue-400 text-gray-300'
          }
        `}
        aria-label={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
        title={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
      >
        {/* Background animation */}
        <div className={`
          absolute inset-0 transition-opacity duration-300
          ${mode === 'light' 
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100' 
            : 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 opacity-0 group-hover:opacity-100'
          }
        `}></div>
        
        {/* Icon container with smooth transition */}
        <div className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          {mode === 'light' ? (
            <Moon className={`
              h-5 w-5 transition-all duration-300 
              text-gray-600 group-hover:text-indigo-600 
              group-hover:rotate-12 drop-shadow-sm
            `} />
          ) : (
            <Sun className={`
              h-5 w-5 transition-all duration-300 
              text-yellow-400 group-hover:text-yellow-300 
              group-hover:rotate-12 drop-shadow-sm
            `} />
          )}
        </div>
        
        {/* Subtle glow effect */}
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none
          ${mode === 'light' 
            ? 'bg-blue-500/10' 
            : 'bg-yellow-400/10'
          }
        `}></div>
      </button>
      
      {/* Accessibility indicator */}
      <span className="sr-only">
        Modo actual: {mode === 'light' ? 'Claro' : 'Oscuro'}
      </span>
    </div>
  );
};

export default ThemeToggle;