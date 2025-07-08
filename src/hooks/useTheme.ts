import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

export const useTheme = () => {
  const { mode, toggleMode, setMode } = useThemeStore();

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(mode);
    
    // Update CSS custom properties based on theme
    if (mode === 'dark') {
      root.style.setProperty('--theme-bg-primary', '#021024');
      root.style.setProperty('--theme-bg-secondary', '#052659');
      root.style.setProperty('--theme-bg-tertiary', '#1B3B6F');
      root.style.setProperty('--theme-text-primary', '#C1E8FF');
      root.style.setProperty('--theme-text-secondary', '#7DA0CA');
      root.style.setProperty('--theme-text-muted', '#5483B3');
      root.style.setProperty('--theme-accent', '#5483B3');
      root.style.setProperty('--theme-highlight', '#7DA0CA');
      root.style.setProperty('--theme-border', 'rgba(193, 232, 255, 0.2)');
      root.style.setProperty('--theme-shadow', 'rgba(2, 16, 36, 0.3)');
    } else {
      root.style.setProperty('--theme-bg-primary', '#FFFFFF');
      root.style.setProperty('--theme-bg-secondary', '#F8FAFC');
      root.style.setProperty('--theme-bg-tertiary', '#F1F5F9');
      root.style.setProperty('--theme-text-primary', '#021024');
      root.style.setProperty('--theme-text-secondary', '#052659');
      root.style.setProperty('--theme-text-muted', '#5483B3');
      root.style.setProperty('--theme-accent', '#1B3B6F');
      root.style.setProperty('--theme-highlight', '#5483B3');
      root.style.setProperty('--theme-border', 'rgba(27, 59, 111, 0.2)');
      root.style.setProperty('--theme-shadow', 'rgba(2, 16, 36, 0.1)');
    }
  }, [mode]);

  return {
    mode,
    toggleMode,
    setMode,
    isDark: mode === 'dark',
    isLight: mode === 'light'
  };
};