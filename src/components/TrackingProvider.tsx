'use client'

import { createContext, useContext, useCallback } from 'react'
import { DatabaseService } from '@/services/database.service'

interface TrackingContextType {
  trackEvent: (eventName: string, properties?: any) => void
  trackConversion: (type: string, value?: number) => void
}

const TrackingContext = createContext<TrackingContextType | null>(null)

export function TrackingProvider({
  children,
  accountId,
  lpId,
}: {
  children: React.ReactNode
  accountId: string
  lpId: string
}) {
  const trackEvent = useCallback(async (eventName: string, properties?: any) => {
    try {
      // Enviar para analytics interno
      await DatabaseService.trackAnalytics({
        account_id: accountId,
        lp_id: lpId,
        event_name: eventName,
        properties,
      })

      // Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, properties)
      }

      // Meta Pixel
      if (window.fbq && eventName === 'ViewContent') {
        window.fbq('track', 'ViewContent', properties)
      }
    } catch (error) {
      console.error('Erro ao rastrear evento:', error)
    }
  }, [accountId, lpId])

  const trackConversion = useCallback(async (type: string, value: number = 1) => {
    try {
      // Registrar no banco
      await DatabaseService.trackConversion({
        account_id: accountId,
        lp_id: lpId,
        event_type: type,
        value,
      })

      // Google Ads (se configurado)
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          event_category: 'LP',
          event_label: type,
          value,
        })
      }

      // Meta Pixel
      if (window.fbq) {
        const eventMap: Record<string, string> = {
          form: 'Lead',
          whatsapp: 'Contact',
          phone: 'Contact',
          purchase: 'Purchase',
        }

        const fbEvent = eventMap[type] || 'Lead'
        window.fbq('track', fbEvent, { value, currency: 'BRL' })
      }
    } catch (error) {
      console.error('Erro ao rastrear conversão:', error)
    }
  }, [accountId, lpId])

  return (
    <TrackingContext.Provider value={{ trackEvent, trackConversion }}>
      {children}
    </TrackingContext.Provider>
  )
}

export const useTracking = () => {
  const context = useContext(TrackingContext)
  if (!context) {
    throw new Error('useTracking deve ser usado dentro de TrackingProvider')
  }
  return context
}

