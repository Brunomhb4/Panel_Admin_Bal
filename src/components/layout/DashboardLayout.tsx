import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useThemeStore } from '../../stores/themeStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { mode } = useThemeStore();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen particle-bg overflow-hidden transition-all duration-300
                    ${mode === 'dark' 
                      ? 'bg-gradient-to-br from-[#021024] via-[#052659] to-[#1B3B6F]' 
                      : 'bg-gradient-to-br from-[#C1E8FF] via-white to-[#F8F9FA]'
                    }`}>
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`mobile-sidebar ${isSidebarOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-closed'}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header title={title} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto custom-scrollbar responsive-padding">
          <div className="container mx-auto max-w-7xl">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;