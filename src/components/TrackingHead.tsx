'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import type { Database } from '@/types/database'

interface TrackingHeadProps {
  trackingConfig: Database['public']['Tables']['tracking_configs']['Row'] | null
  conversionTags: Database['public']['Tables']['lp_conversion_tags']['Row'][]
  lpData: Database['public']['Tables']['lps']['Row']
}

export function TrackingHead({ trackingConfig, conversionTags, lpData }: TrackingHeadProps) {
  // Tracking de conversões
  useEffect(() => {
    // Função para disparar eventos de conversão
    const trackConversion = (type: string) => {
      // Google Ads
      const googleTag = conversionTags.find(tag => 
        tag.tag_type === 'google_ads' && tag.event_label === type
      )
      if (googleTag && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: googleTag.tag_id,
          value: googleTag.event_value || 1,
          currency: 'BRL',
        })
      }

      // Meta/Facebook
      const metaTag = conversionTags.find(tag => 
        tag.tag_type === 'meta_pixel' && tag.event_label === type
      )
      if (metaTag && window.fbq) {
        window.fbq('track', 'Lead', {
          value: metaTag.event_value || 1,
          currency: 'BRL',
        })
      }

      // Registrar no banco
      DatabaseService.trackConversion({
        account_id: lpData.account_id,
        lp_id: lpData.id,
        event_type: type,
        value: 1,
      }).catch(console.error)
    }

    // Adicionar listeners para botões de conversão
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link) {
        const href = link.getAttribute('href')
        if (href?.includes('wa.me') || href?.includes('whatsapp')) {
          trackConversion('whatsapp')
        } else if (href?.startsWith('tel:')) {
          trackConversion('phone')
        }
      }
    }

    // Adicionar listener para formulários
    const handleSubmit = (e: Event) => {
      trackConversion('form')
    }

    document.addEventListener('click', handleClick)
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', handleSubmit)
    })

    // Tracking de pageview
    DatabaseService.trackAnalytics({
      account_id: lpData.account_id,
      lp_id: lpData.id,
      event_name: 'pageview',
      properties: {
        referrer: document.referrer,
        url: window.location.href,
      }
    }).catch(console.error)

    return () => {
      document.removeEventListener('click', handleClick)
      document.querySelectorAll('form').forEach(form => {
        form.removeEventListener('submit', handleSubmit)
      })
    }
  }, [conversionTags, lpData])

  if (!trackingConfig) return null

  return (
    <>
      {/* Google Analytics 4 */}
      {trackingConfig.ga4_id && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingConfig.ga4_id}`}
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${trackingConfig.ga4_id}');
              `,
            }}
          />
        </>
      )}

      {/* Meta Pixel */}
      {trackingConfig.meta_pixel_id && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${trackingConfig.meta_pixel_id}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* Google Ads Global Tag */}
      {trackingConfig.google_ads_global_tag && (
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: trackingConfig.google_ads_global_tag,
          }}
        />
      )}
    </>
  )
}
