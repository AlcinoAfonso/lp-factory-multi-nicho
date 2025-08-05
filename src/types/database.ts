// src/components/RenderSection.tsx
'use client'

import dynamic from 'next/dynamic'
import type { Database } from '@/types/database'

// Importar componentes sem tipagem genérica
const Header = dynamic(() => import('./sections/Header'))
const Hero = dynamic(() => import('./sections/Hero'))
const About = dynamic(() => import('./sections/About'))
const Services = dynamic(() => import('./sections/Services'))
const Benefits = dynamic(() => import('./sections/Benefits'))
const Technology = dynamic(() => import('./sections/Technology'))
const Steps = dynamic(() => import('./sections/Steps'))
const Testimonials = dynamic(() => import('./sections/Testimonials'))
const FAQ = dynamic(() => import('./sections/FAQ'))
const Gallery = dynamic(() => import('./sections/Gallery'))
const Pricing = dynamic(() => import('./sections/Pricing'))
const Contact = dynamic(() => import('./sections/Contact'))
const CTAFinal = dynamic(() => import('./sections/CTAFinal'))
const Footer = dynamic(() => import('./sections/Footer'))

interface RenderSectionProps {
  section: Database['public']['Tables']['lp_sections']['Row']
  accountData: Database['public']['Tables']['accounts']['Row']
}

export function RenderSection({ section, accountData }: RenderSectionProps) {
  // Preparar dados da seção
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

  // Aplicar configuração de branding da conta se disponível
  if (accountData.branding_config && typeof accountData.branding_config === 'object') {
    const brandingConfig = accountData.branding_config as any
    
    // Aplicar cores se disponíveis no branding_config
    if (brandingConfig.colors) {
      if (!sectionData.backgroundColor && brandingConfig.colors.primary) {
        sectionData.backgroundColor = brandingConfig.colors.primary
      }
      if (!sectionData.textColor && brandingConfig.colors.secondary) {
        sectionData.textColor = brandingConfig.colors.secondary
      }
    }
  }

  // Aplicar logo da conta no header se disponível
  if (section.section_type === 'header' && accountData.branding_config) {
    const brandingConfig = accountData.branding_config as any
    if (brandingConfig.logo?.url) {
      sectionData.logo = {
        ...sectionData.logo,
        type: 'image',
        src: brandingConfig.logo.url,
        alt: brandingConfig.logo.alt || accountData.name,
      }
    }
  }

  // Criar props com tipo any para evitar conflitos
  const props = { data: sectionData } as any

  // Renderizar componente baseado no tipo
  switch (section.section_type) {
    case 'header':
      return <Header {...props} />
    case 'hero':
      return <Hero {...props} />
    case 'about':
      return <About {...props} />
    case 'services':
      return <Services {...props} />
    case 'benefits':
      return <Benefits {...props} />
    case 'technology':
      return <Technology {...props} />
    case 'steps':
      return <Steps {...props} />
    case 'testimonials':
      return <Testimonials {...props} />
    case 'faq':
      return <FAQ {...props} />
    case 'gallery':
      return <Gallery {...props} />
    case 'pricing':
      return <Pricing {...props} />
    case 'contact':
      return <Contact {...props} />
    case 'ctaFinal':
      return <CTAFinal {...props} />
    case 'footer':
      return <Footer {...props} />
    default:
      console.warn(`Tipo de seção não reconhecido: ${section.section_type}`)
      return null
  }
}
