import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProjectDashboard from '../components/ui/ProjectDashboard';

const ProjectDashboardPage: React.FC = () => {
  return (
    <DashboardLayout title="Tablero de Proyecto">
      <ProjectDashboard />
    </DashboardLayout>
  );
};

export default ProjectDashboardPage;