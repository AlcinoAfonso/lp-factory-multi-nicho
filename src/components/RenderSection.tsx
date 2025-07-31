// src/components/RenderSection.tsx
'use client'

import dynamic from 'next/dynamic'
import type { Database } from '@/types/database'

// Importar componentes de seção dinamicamente com tipo any
const Header = dynamic<any>(() => import('./sections/Header'))
const Hero = dynamic<any>(() => import('./sections/Hero'))
const About = dynamic<any>(() => import('./sections/About'))
const Services = dynamic<any>(() => import('./sections/Services'))
const Benefits = dynamic<any>(() => import('./sections/Benefits'))
const Technology = dynamic<any>(() => import('./sections/Technology'))
const Steps = dynamic<any>(() => import('./sections/Steps'))
const Testimonials = dynamic<any>(() => import('./sections/Testimonials'))
const FAQ = dynamic<any>(() => import('./sections/FAQ'))
const Gallery = dynamic<any>(() => import('./sections/Gallery'))
const Pricing = dynamic<any>(() => import('./sections/Pricing'))
const Contact = dynamic<any>(() => import('./sections/Contact'))
const CTAFinal = dynamic<any>(() => import('./sections/CTAFinal'))
const Footer = dynamic<any>(() => import('./sections/Footer'))

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

  // Renderizar componente baseado no tipo
  switch (section.section_type) {
    case 'header':
      return <Header data={sectionData} />
    case 'hero':
      return <Hero data={sectionData} />
    case 'about':
      return <About data={sectionData} />
    case 'services':
      return <Services data={sectionData} />
    case 'benefits':
      return <Benefits data={sectionData} />
    case 'technology':
      return <Technology data={sectionData} />
    case 'steps':
      return <Steps data={sectionData} />
    case 'testimonials':
      return <Testimonials data={sectionData} />
    case 'faq':
      return <FAQ data={sectionData} />
    case 'gallery':
      return <Gallery data={sectionData} />
    case 'pricing':
      return <Pricing data={sectionData} />
    case 'contact':
      return <Contact data={sectionData} />
    case 'ctaFinal':
      return <CTAFinal data={sectionData} />
    case 'footer':
      return <Footer data={sectionData} />
    default:
      console.warn(`Tipo de seção não reconhecido: ${section.section_type}`)
      return null
  }
}
