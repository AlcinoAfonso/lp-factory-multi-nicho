import dynamic from 'next/dynamic';
import { LandingPageData } from '@/types/lp-config';
import { ThemeProvider } from '@/components/ThemeProvider';

// Import dos componentes light
import { HeroLight } from './HeroLight';
import { BenefitsLight } from './BenefitsLight';
import { ServicesLight } from './ServicesLight';
import { TestimonialsLight } from './TestimonialsLight';
import { FAQLight } from './FAQLight';
import { StepsLight } from './StepsLight';
import { TechnologyLight } from './TechnologyLight';
import { HeaderLight } from './HeaderLight';
import { FooterLight } from './FooterLight';
import { AboutLight } from './AboutLight';
import { CTAFinalLight } from './CTAFinalLight';

// Lazy load para componentes abaixo da dobra
const GalleryLight = dynamic(() => import('./GalleryLight').then(m => ({ default: m.GalleryLight })));
const PricingLight = dynamic(() => import('./PricingLight').then(m => ({ default: m.PricingLight })));
const ContactLight = dynamic(() => import('./ContactLight').then(m => ({ default: m.ContactLight })));

interface LandingPageLightProps {
  data: LandingPageData & { theme?: string };
}

export function LandingPageLight({ data }: LandingPageLightProps) {
  return (
    <ThemeProvider defaultTheme={data.theme || 'default'}>
      <div className="landing-page-light">
        {data.sections.map((section) => {
          switch (section.type) {
            case 'header':
              return <HeaderLight key={section.id} data={section as any} />;
            case 'hero':
              return <HeroLight key={section.id} data={section as any} />;
            case 'benefits':
              return <BenefitsLight key={section.id} data={section as any} />;
            case 'services':
              return <ServicesLight key={section.id} data={section as any} />;
            case 'steps':
              return <StepsLight key={section.id} data={section as any} />;
            case 'technology':
              return <TechnologyLight key={section.id} data={section as any} />;
            case 'about':
              return <AboutLight key={section.id} data={section as any} />;
            case 'testimonials':
              return <TestimonialsLight key={section.id} data={section as any} />;
            case 'faq':
              return <FAQLight key={section.id} data={section as any} />;
            case 'gallery':
              return <GalleryLight key={section.id} data={section as any} />;
            case 'pricing':
              return <PricingLight key={section.id} data={section as any} />;
            case 'contact':
              return <ContactLight key={section.id} data={section as any} />;
            case 'ctaFinal':
            case 'cta':
              return <CTAFinalLight key={section.id} data={section as any} />;
            case 'footer':
              return <FooterLight key={section.id} data={section as any} />;
            default:
              return null;
          }
        })}
      </div>
    </ThemeProvider>
  );
}
