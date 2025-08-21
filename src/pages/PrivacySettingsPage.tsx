import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PrivacyDashboard from '../components/privacy/PrivacyDashboard';

/**
 * Página de configuración de privacidad
 * Permite a los usuarios gestionar sus datos y configuraciones de privacidad
 */
const PrivacySettingsPage: React.FC = () => {
  return (
    <DashboardLayout title="Configuración de Privacidad">
      <PrivacyDashboard />
    </DashboardLayout>
  );
};

export default PrivacySettingsPage;