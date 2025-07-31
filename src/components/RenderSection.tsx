// src/components/RenderSection.tsx
import dynamic from 'next/dynamic'
import type { Database } from '@/types/database'

// Importar componentes de seção dinamicamente
const sectionComponents = {
  header: dynamic(() => import('./sections/Header')),
  hero: dynamic(() => import('./sections/Hero')),
  about: dynamic(() => import('./sections/About')),
  services: dynamic(() => import('./sections/Services')),
  benefits: dynamic(() => import('./sections/Benefits')),
  technology: dynamic(() => import('./sections/Technology')),
  steps: dynamic(() => import('./sections/Steps')),
  testimonials: dynamic(() => import('./sections/Testimonials')),
  faq: dynamic(() => import('./sections/FAQ')),
  gallery: dynamic(() => import('./sections/Gallery')),
  pricing: dynamic(() => import('./sections/Pricing')),
  contact: dynamic(() => import('./sections/Contact')),
  ctaFinal: dynamic(() => import('./sections/CTAFinal')),
  footer: dynamic(() => import('./sections/Footer')),
}

interface RenderSectionProps {
  section: Database['public']['Tables']['lp_sections']['Row']
  accountData: Database['public']['Tables']['accounts']['Row']
}

export function RenderSection({ section, accountData }: RenderSectionProps) {
  // Obter o componente baseado no tipo da seção
  const sectionType = section.section_type as keyof typeof sectionComponents
  const Component = sectionComponents[sectionType]

  if (!Component) {
    console.warn(`Tipo de seção não reconhecido: ${section.section_type}`)
    return null
  }

  // Preparar dados da seção com customizações da conta
  let sectionData: any = section.content_json || {}

  // Converter para objeto caso seja string JSON
  if (typeof sectionData === 'string') {
    try {
      sectionData = JSON.parse(sectionData)
    } catch (e) {
      console.error('Erro ao parsear content_json:', e)
      return null
    }
  }

  // Aplicar paleta de cores da conta se disponível
  if (accountData.palette && typeof accountData.palette === 'object') {
    const palette = accountData.palette as any
    if (!sectionData.backgroundColor && palette.primary) {
      sectionData.backgroundColor = palette.primary
    }
    if (!sectionData.textColor && palette.secondary) {
      sectionData.textColor = palette.secondary
    }
  }

  // Aplicar logo da conta no header se disponível
  if (section.section_type === 'header' && accountData.logo_url) {
    sectionData.logo = {
      ...sectionData.logo,
      src: accountData.logo_url,
      alt: accountData.name,
    }
  }

  // Renderizar componente com type assertion para any
  return <Component data={sectionData as any} />
}
