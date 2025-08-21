import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../../stores/themeStore';
import { 
  Shield, 
  Eye, 
  Clock, 
  Database, 
  Settings, 
  Check, 
  X, 
  Info,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/**
 * Tipos de datos que se recopilan en la aplicación
 */
interface DataCollectionType {
  id: string;
  name: string;
  description: string;
  purpose: string;
  duration: string;
  essential: boolean;
  icon: React.ComponentType<any>;
  examples: string[];
}

/**
 * Configuración de consentimiento del usuario
 */
interface ConsentSettings {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
  functionality: boolean;
  marketing: boolean;
}

/**
 * Componente principal del sistema de notificaciones de recopilación de datos
 * Cumple con GDPR, CCPA y otras regulaciones de privacidad
 */
const DataCollectionNotification: React.FC = () => {
  const { mode } = useThemeStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentDataType, setCurrentDataType] = useState<string | null>(null);
  const [consent, setConsent] = useState<ConsentSettings>({
    essential: true, // Siempre requerido
    analytics: false,
    performance: false,
    functionality: false,
    marketing: false
  });

  /**
   * Definición de todos los tipos de datos que recopila la aplicación
   */
  const dataTypes: DataCollectionType[] = [
    {
      id: 'essential',
      name: 'Datos Esenciales',
      description: 'Información necesaria para el funcionamiento básico de la aplicación',
      purpose: 'Autenticación, navegación y funcionalidad básica del dashboard',
      duration: 'Durante la sesión activa',
      essential: true,
      icon: Shield,
      examples: [
        'Token de autenticación',
        'Preferencias de idioma',
        'Estado de sesión',
        'Configuración de tema (claro/oscuro)'
      ]
    },
    {
      id: 'analytics',
      name: 'Datos de Análisis',
      description: 'Información sobre cómo interactúas con la aplicación',
      purpose: 'Mejorar la experiencia de usuario y optimizar funcionalidades',
      duration: '24 meses',
      essential: false,
      icon: Eye,
      examples: [
        'Páginas visitadas',
        'Tiempo en cada sección',
        'Clics en botones',
        'Patrones de navegación'
      ]
    },
    {
      id: 'performance',
      name: 'Datos de Rendimiento',
      description: 'Métricas técnicas para optimizar la velocidad y estabilidad',
      purpose: 'Detectar errores y mejorar el rendimiento de la aplicación',
      duration: '12 meses',
      essential: false,
      icon: Database,
      examples: [
        'Tiempo de carga de páginas',
        'Errores de JavaScript',
        'Uso de memoria',
        'Velocidad de conexión'
      ]
    },
    {
      id: 'functionality',
      name: 'Datos de Funcionalidad',
      description: 'Preferencias y configuraciones personalizadas',
      purpose: 'Recordar tus preferencias y personalizar la experiencia',
      duration: '36 meses',
      essential: false,
      icon: Settings,
      examples: [
        'Configuración de dashboard',
        'Filtros guardados',
        'Orden de columnas en tablas',
        'Preferencias de visualización'
      ]
    },
    {
      id: 'marketing',
      name: 'Datos de Marketing',
      description: 'Información para comunicaciones y mejoras del producto',
      purpose: 'Enviar actualizaciones relevantes y mejorar nuestros servicios',
      duration: '24 meses',
      essential: false,
      icon: AlertTriangle,
      examples: [
        'Preferencias de comunicación',
        'Interés en nuevas funcionalidades',
        'Feedback sobre la aplicación',
        'Patrones de uso para mejoras'
      ]
    }
  ];

  /**
   * Verificar si ya se ha dado consentimiento previamente
   */
  useEffect(() => {
    const savedConsent = localStorage.getItem('data-collection-consent');
    const consentTimestamp = localStorage.getItem('consent-timestamp');
    
    if (!savedConsent || !consentTimestamp) {
      // Mostrar notificación si no hay consentimiento previo
      setIsVisible(true);
    } else {
      // Verificar si el consentimiento ha expirado (6 meses)
      const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);
      if (parseInt(consentTimestamp) < sixMonthsAgo) {
        setIsVisible(true);
      } else {
        // Cargar configuración guardada
        setConsent(JSON.parse(savedConsent));
      }
    }
  }, []);

  /**
   * Simular recopilación de datos en tiempo real
   */
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular diferentes tipos de recopilación de datos
      const activeTypes = Object.entries(consent)
        .filter(([_, enabled]) => enabled)
        .map(([type]) => type);
      
      if (activeTypes.length > 0) {
        const randomType = activeTypes[Math.floor(Math.random() * activeTypes.length)];
        setCurrentDataType(randomType);
        
        // Limpiar después de 3 segundos
        setTimeout(() => setCurrentDataType(null), 3000);
      }
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval);
  }, [consent]);

  /**
   * Guardar configuración de consentimiento
   */
  const saveConsent = (newConsent: ConsentSettings) => {
    setConsent(newConsent);
    localStorage.setItem('data-collection-consent', JSON.stringify(newConsent));
    localStorage.setItem('consent-timestamp', Date.now().toString());
    setIsVisible(false);
  };

  /**
   * Aceptar todas las configuraciones
   */
  const acceptAll = () => {
    const allAccepted: ConsentSettings = {
      essential: true,
      analytics: true,
      performance: true,
      functionality: true,
      marketing: true
    };
    saveConsent(allAccepted);
  };

  /**
   * Rechazar todas las configuraciones opcionales
   */
  const rejectAll = () => {
    const onlyEssential: ConsentSettings = {
      essential: true,
      analytics: false,
      performance: false,
      functionality: false,
      marketing: false
    };
    saveConsent(onlyEssential);
  };

  /**
   * Alternar configuración específica
   */
  const toggleConsent = (type: keyof ConsentSettings) => {
    if (type === 'essential') return; // No se puede desactivar
    
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  /**
   * Obtener el tipo de datos actualmente siendo recopilado
   */
  const getCurrentDataType = () => {
    return dataTypes.find(type => type.id === currentDataType);
  };

  if (!isVisible) {
    // Indicador discreto de recopilación activa
    return currentDataType ? (
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300
                      ${mode === 'dark' 
                        ? 'bg-theme-bg-primary/90 border-theme-border text-theme-text-primary' 
                        : 'bg-white/90 border-gray-300 text-gray-900'
                      } backdrop-blur-md border rounded-lg p-3 shadow-lg`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">
            Recopilando: {getCurrentDataType()?.name}
          </span>
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />
      
      {/* Notification Panel */}
      <div className={`
        relative w-full max-w-4xl max-h-[90vh] overflow-hidden
        rounded-2xl shadow-2xl backdrop-blur-xl border-2
        transition-all duration-500 animate-slide-up
        ${mode === 'dark' 
          ? 'bg-theme-bg-primary/95 border-theme-border' 
          : 'bg-white/95 border-gray-200'
        }
      `}>
        {/* Header */}
        <div className={`p-6 border-b
                        ${mode === 'dark' ? 'border-theme-border/50' : 'border-gray-200/50'}`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl
                            ${mode === 'dark' 
                              ? 'bg-theme-accent/20 text-theme-accent' 
                              : 'bg-blue-100 text-blue-600'
                            }`}>
              <Shield className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className={`font-bold text-xl mb-2
                             ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
                Transparencia en Recopilación de Datos
              </h2>
              <p className={`text-sm leading-relaxed
                            ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
                Te informamos sobre todos los datos que recopilamos, cuándo los recopilamos y para qué los utilizamos. 
                Tu privacidad es importante para nosotros.
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-lg transition-all duration-300
                         ${mode === 'dark' 
                           ? 'hover:bg-theme-bg-secondary text-theme-text-muted' 
                           : 'hover:bg-gray-100 text-gray-500'
                         }`}
            >
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`overflow-y-auto custom-scrollbar ${isExpanded ? 'max-h-96' : 'max-h-48'} transition-all duration-300`}>
          <div className="p-6 space-y-4">
            {dataTypes.map((dataType) => {
              const Icon = dataType.icon;
              const isEnabled = consent[dataType.id as keyof ConsentSettings];
              
              return (
                <div 
                  key={dataType.id}
                  className={`
                    border rounded-xl p-4 transition-all duration-300
                    ${isEnabled 
                      ? mode === 'dark' 
                        ? 'border-theme-accent/50 bg-theme-accent/10' 
                        : 'border-blue-200 bg-blue-50/50'
                      : mode === 'dark' 
                        ? 'border-theme-border bg-theme-bg-secondary/30' 
                        : 'border-gray-200 bg-gray-50/50'
                    }
                    ${currentDataType === dataType.id ? 'ring-2 ring-green-500/50' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg flex-shrink-0
                                    ${isEnabled 
                                      ? mode === 'dark' 
                                        ? 'bg-theme-accent/20 text-theme-accent' 
                                        : 'bg-blue-100 text-blue-600'
                                      : mode === 'dark' 
                                        ? 'bg-theme-bg-tertiary text-theme-text-muted' 
                                        : 'bg-gray-100 text-gray-400'
                                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold
                                       ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
                          {dataType.name}
                        </h3>
                        {dataType.essential && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full
                                           ${mode === 'dark' 
                                             ? 'bg-theme-accent/20 text-theme-accent' 
                                             : 'bg-blue-100 text-blue-600'
                                           }`}>
                            Esencial
                          </span>
                        )}
                        {currentDataType === dataType.id && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600 animate-pulse">
                            Recopilando ahora
                          </span>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-3
                                    ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
                        {dataType.description}
                      </p>
                      
                      {isExpanded && (
                        <div className="space-y-3">
                          <div>
                            <h4 className={`font-medium text-sm mb-1
                                           ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-800'}`}>
                              Propósito:
                            </h4>
                            <p className={`text-sm
                                          ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
                              {dataType.purpose}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className={`font-medium text-sm mb-1
                                           ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-800'}`}>
                              Duración del almacenamiento:
                            </h4>
                            <p className={`text-sm
                                          ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
                              {dataType.duration}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className={`font-medium text-sm mb-2
                                           ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-800'}`}>
                              Ejemplos de datos:
                            </h4>
                            <ul className="space-y-1">
                              {dataType.examples.map((example, index) => (
                                <li key={index} className={`text-sm flex items-center gap-2
                                                           ${mode === 'dark' ? 'text-theme-text-secondary' : 'text-gray-600'}`}>
                                  <div className="w-1 h-1 bg-current rounded-full"></div>
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Toggle Switch */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => toggleConsent(dataType.id as keyof ConsentSettings)}
                        disabled={dataType.essential}
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
                          ${dataType.essential ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-6 border-t
                        ${mode === 'dark' ? 'border-theme-border/50' : 'border-gray-200/50'}`}>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <div className="flex items-center gap-2">
              <Info className={`h-4 w-4
                               ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`} />
              <span className={`text-xs
                               ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
                Puedes cambiar estas preferencias en cualquier momento
              </span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={rejectAll}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-300
                  ${mode === 'dark' 
                    ? 'border-theme-border text-theme-text-secondary hover:bg-theme-bg-secondary' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                Solo Esenciales
              </button>
              
              <button
                onClick={() => saveConsent(consent)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-300
                  ${mode === 'dark' 
                    ? 'border-theme-accent bg-theme-accent/20 text-theme-accent hover:bg-theme-accent/30' 
                    : 'border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }
                `}
              >
                Guardar Preferencias
              </button>
              
              <button
                onClick={acceptAll}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${mode === 'dark' 
                    ? 'bg-theme-accent text-white hover:bg-theme-highlight' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }
                `}
              >
                Aceptar Todo
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Data Collection Indicator */}
        {currentDataType && (
          <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg
                          ${mode === 'dark' 
                            ? 'bg-green-900/30 border-green-500/50 text-green-400' 
                            : 'bg-green-50 border-green-200 text-green-700'
                          } border backdrop-blur-sm`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-xs font-medium">Datos en tiempo real</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCollectionNotification;