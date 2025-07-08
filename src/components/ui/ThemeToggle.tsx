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
          relative p-3 rounded-xl transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          group overflow-hidden shadow-lg hover:shadow-xl border-2
          ${mode === 'dark' 
            ? 'bg-gradient-to-br from-[#052659]/90 via-[#1B3B6F]/80 to-[#5483B3]/70 hover:from-[#1B3B6F] hover:via-[#5483B3] hover:to-[#7DA0CA] border-[#C1E8FF]/50 focus:ring-[#C1E8FF]/50 text-[#C1E8FF] hover:text-white shadow-[0_0_20px_rgba(193,232,255,0.3)]' 
            : 'bg-gradient-to-br from-white/95 via-[#F8F9FA]/90 to-[#F1F5F9]/85 hover:from-white hover:via-[#F8F9FA] hover:to-white border-[#1B3B6F]/30 focus:ring-[#052659]/50 text-[#021024] hover:text-[#052659] shadow-[0_0_15px_rgba(2,16,36,0.2)]'
          }
        `}
        aria-label={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
        title={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
      >
        {/* Animación de fondo */}
        <div className={`
          absolute inset-0 transition-opacity duration-300 rounded-xl
          ${mode === 'dark' 
            ? 'bg-gradient-to-r from-[#5483B3]/20 to-[#7DA0CA]/20 opacity-0 group-hover:opacity-100' 
            : 'bg-gradient-to-r from-[#C1E8FF]/30 to-[#7DA0CA]/20 opacity-0 group-hover:opacity-100'
          }
        `}></div>
        
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12 rounded-xl"></div>
        
        {/* Contenedor de icono con transición suave */}
        <div className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
          {mode === 'dark' ? (
            <Sun className={`
              h-6 w-6 transition-all duration-300 
              text-[#C1E8FF] group-hover:text-white 
              group-hover:rotate-180 drop-shadow-lg
            `}
                 style={{
                   filter: 'drop-shadow(0 0 8px rgba(193, 232, 255, 0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                   textShadow: '0 0 6px rgba(193, 232, 255, 0.8)'
                 }} />
          ) : (
            <Moon className={`
              h-6 w-6 transition-all duration-300 
              text-[#021024] group-hover:text-[#052659] 
              group-hover:rotate-180 drop-shadow-lg
            `}
                  style={{
                    filter: 'drop-shadow(0 1px 2px rgba(2, 16, 36, 0.3))'
                  }} />
          )}
        </div>
        
        {/* Efecto de brillo sutil */}
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none
          ${mode === 'dark' 
            ? 'bg-[#C1E8FF]/10' 
            : 'bg-[#052659]/5'
          }
        `}></div>
        
        {/* Borde interno brillante */}
        <div className={`absolute inset-1 rounded-lg border opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        ${mode === 'dark' 
                          ? 'border-[#C1E8FF]/30' 
                          : 'border-[#1B3B6F]/20'
                        }`}></div>
      </button>
      
      {/* Indicador de accesibilidad */}
      <span className="sr-only">
        Modo actual: {mode === 'light' ? 'Claro' : 'Oscuro'}
      </span>
    </div>
  );
};

export default ThemeToggle;