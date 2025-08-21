import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Configuración de consentimiento para diferentes tipos de datos
 */
interface ConsentSettings {
  essential: boolean;      // Datos esenciales (siempre true)
  analytics: boolean;      // Datos de análisis de uso
  performance: boolean;    // Datos de rendimiento técnico
  functionality: boolean;  // Datos de funcionalidad y preferencias
  marketing: boolean;      // Datos para comunicaciones
}

/**
 * Evento de recopilación de datos
 */
interface DataCollectionEvent {
  id: string;
  type: keyof ConsentSettings;
  timestamp: number;
  description: string;
  data: Record<string, any>;
}

/**
 * Estado del store de privacidad
 */
interface PrivacyState {
  // Configuración de consentimiento
  consent: ConsentSettings;
  consentTimestamp: number | null;
  
  // Historial de recopilación
  collectionHistory: DataCollectionEvent[];
  
  // Estado de notificaciones
  showNotification: boolean;
  lastNotificationCheck: number;
  
  // Acciones
  updateConsent: (newConsent: Partial<ConsentSettings>) => void;
  recordDataCollection: (event: Omit<DataCollectionEvent, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  checkConsentExpiry: () => boolean;
  exportUserData: () => string;
  deleteUserData: () => void;
  setNotificationVisibility: (visible: boolean) => void;
}

/**
 * Store de Zustand para gestionar la privacidad y consentimiento de datos
 * Implementa funcionalidades requeridas por GDPR y CCPA
 */
export const usePrivacyStore = create<PrivacyState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      consent: {
        essential: true,
        analytics: false,
        performance: false,
        functionality: false,
        marketing: false
      },
      consentTimestamp: null,
      collectionHistory: [],
      showNotification: true,
      lastNotificationCheck: 0,

      /**
       * Actualizar configuración de consentimiento
       * @param newConsent Nuevas configuraciones de consentimiento
       */
      updateConsent: (newConsent) => {
        set(state => ({
          consent: { ...state.consent, ...newConsent },
          consentTimestamp: Date.now(),
          showNotification: false
        }));
      },

      /**
       * Registrar un evento de recopilación de datos
       * @param event Evento de recopilación sin ID ni timestamp
       */
      recordDataCollection: (event) => {
        const { consent } = get();
        
        // Solo registrar si el usuario ha dado consentimiento para este tipo de datos
        if (consent[event.type]) {
          const newEvent: DataCollectionEvent = {
            ...event,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now()
          };
          
          set(state => ({
            collectionHistory: [newEvent, ...state.collectionHistory].slice(0, 100) // Mantener solo los últimos 100 eventos
          }));
        }
      },

      /**
       * Limpiar historial de recopilación
       */
      clearHistory: () => {
        set({ collectionHistory: [] });
      },

      /**
       * Verificar si el consentimiento ha expirado (6 meses)
       * @returns true si ha expirado, false si sigue vigente
       */
      checkConsentExpiry: () => {
        const { consentTimestamp } = get();
        if (!consentTimestamp) return true;
        
        const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);
        const hasExpired = consentTimestamp < sixMonthsAgo;
        
        if (hasExpired) {
          set({ showNotification: true });
        }
        
        return hasExpired;
      },

      /**
       * Exportar todos los datos del usuario (derecho GDPR)
       * @returns JSON string con todos los datos del usuario
       */
      exportUserData: () => {
        const state = get();
        const userData = {
          consent: state.consent,
          consentTimestamp: state.consentTimestamp,
          collectionHistory: state.collectionHistory,
          exportTimestamp: Date.now(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        return JSON.stringify(userData, null, 2);
      },

      /**
       * Eliminar todos los datos del usuario (derecho GDPR)
       */
      deleteUserData: () => {
        set({
          consent: {
            essential: true,
            analytics: false,
            performance: false,
            functionality: false,
            marketing: false
          },
          consentTimestamp: null,
          collectionHistory: [],
          showNotification: true,
          lastNotificationCheck: 0
        });
        
        // Limpiar también localStorage de otros stores si es necesario
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('theme-storage');
      },

      /**
       * Controlar visibilidad de notificaciones
       * @param visible Si la notificación debe ser visible
       */
      setNotificationVisibility: (visible) => {
        set({ 
          showNotification: visible,
          lastNotificationCheck: Date.now()
        });
      }
    }),
    {
      name: 'privacy-storage',
      // Solo persistir configuraciones esenciales
      partialize: (state) => ({
        consent: state.consent,
        consentTimestamp: state.consentTimestamp,
        lastNotificationCheck: state.lastNotificationCheck
      })
    }
  )
);