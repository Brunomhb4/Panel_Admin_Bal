import { useEffect, useCallback } from 'react';
import { usePrivacyStore } from '../stores/privacyStore';
import { useLocation } from 'react-router-dom';

/**
 * Tipos de eventos de recopilación de datos
 */
type DataCollectionType = 'essential' | 'analytics' | 'performance' | 'functionality' | 'marketing';

/**
 * Hook personalizado para gestionar la recopilación transparente de datos
 * Registra automáticamente los eventos de recopilación según el consentimiento del usuario
 */
export const useDataCollection = () => {
  const { consent, recordDataCollection } = usePrivacyStore();
  const location = useLocation();

  /**
   * Registrar un evento de recopilación de datos
   * @param type Tipo de datos que se están recopilando
   * @param description Descripción del evento
   * @param data Datos específicos que se recopilan
   */
  const collectData = useCallback((
    type: DataCollectionType,
    description: string,
    data: Record<string, any> = {}
  ) => {
    // Solo recopilar si el usuario ha dado consentimiento
    if (consent[type]) {
      recordDataCollection({
        type,
        description,
        data: {
          ...data,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer
        }
      });
      
      // Log para desarrollo (remover en producción)
      console.log(`[Data Collection] ${type}: ${description}`, data);
    }
  }, [consent, recordDataCollection]);

  /**
   * Recopilar datos de navegación (analytics)
   */
  const collectPageView = useCallback((pageName: string, additionalData?: Record<string, any>) => {
    collectData('analytics', `Visita a página: ${pageName}`, {
      page: pageName,
      loadTime: performance.now(),
      ...additionalData
    });
  }, [collectData]);

  /**
   * Recopilar datos de interacción (analytics)
   */
  const collectUserInteraction = useCallback((action: string, element: string, additionalData?: Record<string, any>) => {
    collectData('analytics', `Interacción: ${action} en ${element}`, {
      action,
      element,
      ...additionalData
    });
  }, [collectData]);

  /**
   * Recopilar datos de rendimiento (performance)
   */
  const collectPerformanceData = useCallback((metric: string, value: number, additionalData?: Record<string, any>) => {
    collectData('performance', `Métrica de rendimiento: ${metric}`, {
      metric,
      value,
      ...additionalData
    });
  }, [collectData]);

  /**
   * Recopilar datos de funcionalidad (functionality)
   */
  const collectFunctionalityData = useCallback((feature: string, setting: any, additionalData?: Record<string, any>) => {
    collectData('functionality', `Configuración de funcionalidad: ${feature}`, {
      feature,
      setting,
      ...additionalData
    });
  }, [collectData]);

  /**
   * Recopilar datos esenciales (essential)
   */
  const collectEssentialData = useCallback((action: string, additionalData?: Record<string, any>) => {
    collectData('essential', `Acción esencial: ${action}`, additionalData);
  }, [collectData]);

  /**
   * Recopilar datos de marketing (marketing)
   */
  const collectMarketingData = useCallback((event: string, additionalData?: Record<string, any>) => {
    collectData('marketing', `Evento de marketing: ${event}`, additionalData);
  }, [collectData]);

  // Recopilar datos de navegación automáticamente cuando cambia la ruta
  useEffect(() => {
    if (consent.analytics) {
      collectPageView(location.pathname, {
        previousPath: document.referrer,
        timestamp: new Date().toISOString()
      });
    }
  }, [location.pathname, consent.analytics, collectPageView]);

  // Recopilar datos de rendimiento automáticamente
  useEffect(() => {
    if (consent.performance) {
      // Métricas de Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          collectPerformanceData(entry.name, entry.duration, {
            entryType: entry.entryType,
            startTime: entry.startTime
          });
        }
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, [consent.performance, collectPerformanceData]);

  // Recopilar datos de navegación automáticamente
  useEffect(() => {
    if (consent.analytics) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          collectPageView('Page Hidden', {
            timeOnPage: performance.now(),
            scrollPosition: window.scrollY
          });
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, [consent.analytics, collectPageView]);

  return {
    // Estado de consentimiento
    consent,
    
    // Funciones de recopilación específicas
    collectPageView,
    collectUserInteraction,
    collectPerformanceData,
    collectFunctionalityData,
    collectEssentialData,
    collectMarketingData,
    
    // Función genérica
    collectData,
    
    // Utilidades
    canCollect: (type: DataCollectionType) => consent[type]
  };
};