import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';
import App from './App';
import './index.css';

// Initialize theme on app start
const initializeTheme = () => {
  const theme = useThemeStore.getState().theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);