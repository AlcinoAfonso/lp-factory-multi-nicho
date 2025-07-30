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
  const Component = sectionComponents[section.section_type as keyof typeof sectionComponents]

  if (!Component) {
    console.warn(`Tipo de seção não reconhecido: ${section.section_type}`)
    return null
  }

  // Aplicar customizações da conta (cores, logo, etc)
  const sectionData = {
    ...section.content_json,
    // Aplicar paleta de cores da conta se disponível
    ...(accountData.palette && {
      backgroundColor: section.content_json.backgroundColor || accountData.palette.primary,
      textColor: section.content_json.textColor || accountData.palette.secondary,
    }),
    // Aplicar logo da conta no header se disponível
    ...(section.section_type === 'header' && accountData.logo_url && {
      logo: {
        ...section.content_json.logo,
        src: accountData.logo_url,
        alt: accountData.name,
      }
    }),
  }

  return <Component data={sectionData} />
}
