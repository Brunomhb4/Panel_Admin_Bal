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
      // Dark mode variables using exact palette
      root.style.setProperty('--theme-bg-primary', '#021024');
      root.style.setProperty('--theme-bg-secondary', '#052659');
      root.style.setProperty('--theme-bg-tertiary', '#1B3B6F');
      root.style.setProperty('--theme-text-primary', '#C1E8FF');
      root.style.setProperty('--theme-text-secondary', '#7DA0CA');
      root.style.setProperty('--theme-text-muted', '#5483B3');
      root.style.setProperty('--theme-accent', '#5483B3');
      root.style.setProperty('--theme-highlight', '#7DA0CA');
      root.style.setProperty('--theme-light', '#C1E8FF');
      root.style.setProperty('--theme-border', 'rgba(193, 232, 255, 0.2)');
      root.style.setProperty('--theme-shadow', 'rgba(2, 16, 36, 0.3)');
    } else {
      // Light mode variables using specified palette
      root.style.setProperty('--theme-bg-primary', '#C1E8FF');      // Very Light Blue background
      root.style.setProperty('--theme-bg-secondary', '#FFFFFF');     // White for cards
      root.style.setProperty('--theme-bg-tertiary', '#F8F9FA');      // Very light gray
      root.style.setProperty('--theme-text-primary', '#021024');     // Very Dark Blue for text
      root.style.setProperty('--theme-text-secondary', '#052659');   // Deep Navy for headers
      root.style.setProperty('--theme-text-muted', '#1B3B6F');       // Classic Midnight Blue
      root.style.setProperty('--theme-accent', '#052659');           // Deep Navy for interactive
      root.style.setProperty('--theme-highlight', '#5483B3');        // Muted Sky Blue for highlights
      root.style.setProperty('--theme-light', '#7DA0CA');            // Soft Grayish Blue
      root.style.setProperty('--theme-border', '#E0E7FF');           // Light border
      root.style.setProperty('--theme-shadow', 'rgba(2, 16, 36, 0.08)'); // Subtle shadows
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