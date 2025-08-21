import React, { useState } from 'react';
import { usePrivacyStore } from '../../stores/privacyStore';
import { useThemeStore } from '../../stores/themeStore';
import { 
  Shield, 
  Download, 
  Trash2, 
  Eye, 
  Clock, 
  Database,
  Settings,
  AlertTriangle,
  RefreshCw,
  FileText,
  Calendar
} from 'lucide-react';

/**
 * Dashboard de privacidad para que los usuarios gestionen sus datos
 * Cumple con los derechos GDPR: acceso, portabilidad, rectificación y eliminación
 */
const PrivacyDashboard: React.FC = () => {
  const { mode } = useThemeStore();
  const { 
    consent, 
    collectionHistory, 
    updateConsent, 
    clearHistory, 
    exportUserData, 
    deleteUserData,
    checkConsentExpiry 
  } = usePrivacyStore();
  
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [exportedData, setExportedData] = useState<string | null>(null);

  /**
   * Exportar datos del usuario
   */
  const handleExportData = () => {
    const data = exportUserData();
    setExportedData(data);
    
    // Crear y descargar archivo
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mis-datos-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Eliminar todos los datos del usuario
   */
  const handleDeleteData = () => {
    deleteUserData();
    setShowConfirmDelete(false);
    alert('Todos tus datos han sido eliminados exitosamente.');
  };

  /**
   * Alternar configuración de consentimiento
   */
  const toggleConsent = (type: keyof ConsentSettings) => {
    if (type === 'essential') return; // No se puede desactivar
    
    updateConsent({
      [type]: !consent[type]
    });
  };

  const dataTypes = [
    {
      id: 'essential' as keyof ConsentSettings,
      name: 'Datos Esenciales',
      icon: Shield,
      description: 'Necesarios para el funcionamiento básico',
      color: mode === 'dark' ? 'text-blue-400' : 'text-blue-600'
    },
    {
      id: 'analytics' as keyof ConsentSettings,
      name: 'Análisis de Uso',
      icon: Eye,
      description: 'Para mejorar la experiencia de usuario',
      color: mode === 'dark' ? 'text-green-400' : 'text-green-600'
    },
    {
      id: 'performance' as keyof ConsentSettings,
      name: 'Rendimiento',
      icon: Database,
      description: 'Para optimizar velocidad y estabilidad',
      color: mode === 'dark' ? 'text-purple-400' : 'text-purple-600'
    },
    {
      id: 'functionality' as keyof ConsentSettings,
      name: 'Funcionalidad',
      icon: Settings,
      description: 'Para recordar tus preferencias',
      color: mode === 'dark' ? 'text-orange-400' : 'text-orange-600'
    },
    {
      id: 'marketing' as keyof ConsentSettings,
      name: 'Marketing',
      icon: AlertTriangle,
      description: 'Para comunicaciones relevantes',
      color: mode === 'dark' ? 'text-red-400' : 'text-red-600'
    }
  ];

  const recentEvents = collectionHistory.slice(0, 10);
  const isConsentExpired = checkConsentExpiry();

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-6
                    ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
      
      {/* Header */}
      <div className={`rounded-xl p-6 border-2
                      ${mode === 'dark' 
                        ? 'bg-theme-bg-primary border-theme-border' 
                        : 'bg-white border-gray-200'
                      }`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl
                          ${mode === 'dark' 
                            ? 'bg-theme-accent/20 text-theme-accent' 
                            : 'bg-blue-100 text-blue-600'
                          }`}>
            <Shield className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Centro de Privacidad</h1>
            <p className={`text-sm
                          ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
              Gestiona tus datos y configuraciones de privacidad
            </p>
          </div>
        </div>
        
        {isConsentExpired && (
          <div className={`p-4 rounded-lg border-2 border-yellow-500/50
                          ${mode === 'dark' 
                            ? 'bg-yellow-900/20 text-yellow-400' 
                            : 'bg-yellow-50 text-yellow-800'
                          }`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Tu consentimiento ha expirado. Por favor, revisa tus preferencias.</span>
            </div>
          </div>
        )}
      </div>

      {/* Configuración de Consentimiento */}
      <div className={`rounded-xl p-6 border-2
                      ${mode === 'dark' 
                        ? 'bg-theme-bg-primary border-theme-border' 
                        : 'bg-white border-gray-200'
                      }`}>
        <h2 className="text-xl font-semibold mb-4">Configuración de Consentimiento</h2>
        
        <div className="space-y-4">
          {dataTypes.map((dataType) => {
            const Icon = dataType.icon;
            const isEnabled = consent[dataType.id];
            
            return (
              <div key={dataType.id} className={`flex items-center justify-between p-4 rounded-lg border
                                                 ${mode === 'dark' 
                                                   ? 'border-theme-border bg-theme-bg-secondary/30' 
                                                   : 'border-gray-200 bg-gray-50/50'
                                                 }`}>
                <div className="flex items-center gap-4">
                  <Icon className={`h-5 w-5 ${dataType.color}`} />
                  <div>
                    <h3 className="font-medium">{dataType.name}</h3>
                    <p className={`text-sm
                                  ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
                      {dataType.description}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleConsent(dataType.id)}
                  disabled={dataType.id === 'essential'}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${isEnabled 
                      ? mode === 'dark' 
                        ? 'bg-theme-accent focus:ring-theme-accent/50' 
                        : 'bg-blue-600 focus:ring-blue-500/50'
                      : mode === 'dark' 
                        ? 'bg-theme-bg-tertiary focus:ring-theme-border' 
                        : 'bg-gray-200 focus:ring-gray-300'
                    }
                    ${dataType.id === 'essential' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                      ${isEnabled ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historial de Recopilación */}
      <div className={`rounded-xl p-6 border-2
                      ${mode === 'dark' 
                        ? 'bg-theme-bg-primary border-theme-border' 
                        : 'bg-white border-gray-200'
                      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Historial de Recopilación</h2>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className={`p-2 rounded-lg transition-all duration-300
                         ${mode === 'dark' 
                           ? 'hover:bg-theme-bg-secondary text-theme-text-muted' 
                           : 'hover:bg-gray-100 text-gray-500'
                         }`}
              title="Actualizar"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={clearHistory}
              className={`p-2 rounded-lg transition-all duration-300
                         ${mode === 'dark' 
                           ? 'hover:bg-red-900/20 text-red-400' 
                           : 'hover:bg-red-50 text-red-600'
                         }`}
              title="Limpiar historial"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {recentEvents.length === 0 ? (
          <p className={`text-center py-8
                        ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
            No hay eventos de recopilación registrados
          </p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentEvents.map((event) => (
              <div key={event.id} className={`p-3 rounded-lg border
                                             ${mode === 'dark' 
                                               ? 'border-theme-border bg-theme-bg-secondary/20' 
                                               : 'border-gray-200 bg-gray-50'
                                             }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                                       ${mode === 'dark' 
                                         ? 'bg-theme-accent/20 text-theme-accent' 
                                         : 'bg-blue-100 text-blue-600'
                                       }`}>
                        {event.type}
                      </span>
                      <span className={`text-xs
                                       ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Acciones de Datos */}
      <div className={`rounded-xl p-6 border-2
                      ${mode === 'dark' 
                        ? 'bg-theme-bg-primary border-theme-border' 
                        : 'bg-white border-gray-200'
                      }`}>
        <h2 className="text-xl font-semibold mb-4">Tus Derechos de Datos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Exportar Datos */}
          <button
            onClick={handleExportData}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105
                       ${mode === 'dark' 
                         ? 'border-theme-border hover:border-theme-accent bg-theme-bg-secondary/30 hover:bg-theme-accent/10' 
                         : 'border-gray-200 hover:border-blue-300 bg-gray-50 hover:bg-blue-50'
                       }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Download className={`h-5 w-5
                                   ${mode === 'dark' ? 'text-theme-accent' : 'text-blue-600'}`} />
              <h3 className="font-semibold">Exportar Mis Datos</h3>
            </div>
            <p className={`text-sm
                          ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
              Descarga una copia de todos tus datos en formato JSON
            </p>
          </button>

          {/* Eliminar Datos */}
          <button
            onClick={() => setShowConfirmDelete(true)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105
                       ${mode === 'dark' 
                         ? 'border-red-500/50 hover:border-red-400 bg-red-900/20 hover:bg-red-900/30' 
                         : 'border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100'
                       }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trash2 className={`h-5 w-5
                                 ${mode === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className="font-semibold">Eliminar Mis Datos</h3>
            </div>
            <p className={`text-sm
                          ${mode === 'dark' ? 'text-red-300' : 'text-red-600'}`}>
              Elimina permanentemente todos tus datos de nuestros sistemas
            </p>
          </button>
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirmDelete(false)} />
          
          <div className={`relative max-w-md w-full rounded-xl p-6 border-2
                          ${mode === 'dark' 
                            ? 'bg-theme-bg-primary border-theme-border' 
                            : 'bg-white border-gray-200'
                          }`}>
            <div className="text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4
                              ${mode === 'dark' 
                                ? 'bg-red-900/30 text-red-400' 
                                : 'bg-red-100 text-red-600'
                              }`}>
                <Trash2 className="h-6 w-6" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">¿Eliminar todos los datos?</h3>
              <p className={`text-sm mb-6
                            ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
                Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos, 
                configuraciones y historial.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all duration-300
                             ${mode === 'dark' 
                               ? 'border-theme-border text-theme-text-secondary hover:bg-theme-bg-secondary' 
                               : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                             }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteData}
                  className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300
                             ${mode === 'dark' 
                               ? 'bg-red-600 text-white hover:bg-red-700' 
                               : 'bg-red-600 text-white hover:bg-red-700'
                             }`}
                >
                  Eliminar Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Datos Exportados */}
      {exportedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setExportedData(null)} />
          
          <div className={`relative max-w-2xl w-full max-h-96 rounded-xl p-6 border-2
                          ${mode === 'dark' 
                            ? 'bg-theme-bg-primary border-theme-border' 
                            : 'bg-white border-gray-200'
                          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Datos Exportados</h3>
              <button
                onClick={() => setExportedData(null)}
                className={`p-2 rounded-lg transition-all duration-300
                           ${mode === 'dark' 
                             ? 'hover:bg-theme-bg-secondary text-theme-text-muted' 
                             : 'hover:bg-gray-100 text-gray-500'
                           }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className={`p-4 rounded-lg border overflow-auto max-h-64
                            ${mode === 'dark' 
                              ? 'border-theme-border bg-theme-bg-secondary/30' 
                              : 'border-gray-200 bg-gray-50'
                            }`}>
              <pre className={`text-xs font-mono
                              ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
                {exportedData}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyDashboard;