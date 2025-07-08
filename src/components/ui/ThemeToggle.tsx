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
          relative p-2.5 rounded-xl transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          group overflow-hidden shadow-sm hover:shadow-md
          ${mode === 'dark' 
            ? 'bg-[#052659]/90 hover:bg-[#1B3B6F] border border-[#5483B3]/40 focus:ring-[#C1E8FF]/50 text-[#C1E8FF] hover:text-white' 
            : 'bg-white/95 hover:bg-white border border-[#1B3B6F]/20 focus:ring-[#052659]/50 text-[#021024] hover:text-[#052659]'
          }
        `}
        aria-label={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
        title={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
      >
        {/* Background animation */}
        <div className={`
          absolute inset-0 transition-opacity duration-300 rounded-xl
          ${mode === 'dark' 
            ? 'bg-gradient-to-r from-[#5483B3]/20 to-[#7DA0CA]/20 opacity-0 group-hover:opacity-100' 
            : 'bg-gradient-to-r from-[#C1E8FF]/30 to-[#7DA0CA]/20 opacity-0 group-hover:opacity-100'
          }
        `}></div>
        
        {/* Icon container with smooth transition */}
        <div className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          {mode === 'dark' ? (
            <Sun className={`
              h-5 w-5 transition-all duration-300 
              text-[#C1E8FF] group-hover:text-white 
              group-hover:rotate-12 drop-shadow-sm
            `} />
          ) : (
            <Moon className={`
              h-5 w-5 transition-all duration-300 
              text-[#021024] group-hover:text-[#052659] 
              group-hover:rotate-12 drop-shadow-sm
            `} />
          )}
        </div>
        
        {/* Subtle glow effect */}
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none
          ${mode === 'dark' 
            ? 'bg-[#C1E8FF]/10' 
            : 'bg-[#052659]/5'
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