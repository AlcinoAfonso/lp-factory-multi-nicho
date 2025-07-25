// ============================================
// SIMPLIFIED TYPES - clearer and correct
// ============================================

// ==========================================
// BASE TYPES
// ==========================================

export interface BaseSection {
  id: string;
  type: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface ButtonData {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

// Logo types
export interface TextLogo {
  type: 'text';
  text: string;
  subtitle?: string;
}

export interface ImageLogo {
  type: 'image';
  src: string;
  alt: string;
}

export type LogoData = TextLogo | ImageLogo;

// Type guard
export function isTextLogo(logo: LogoData): logo is TextLogo {
  return logo.type === 'text';
}

// ==========================================
// SECTION TYPES
// ==========================================

// Header
export interface HeaderData extends BaseSection {
  type: 'header';
  logo: LogoData;
  navigation: {
    label: string;
    href: string;
  }[];
  phone?: {
    display: string;
    link: string;
  };
}

// Hero
export interface HeroData extends BaseSection {
  type: 'hero';
  title: string;
  description: string;
  primaryButton: ButtonData;
  secondaryButton?: ButtonData;
  image: ImageData;
}

// Benefits
export interface BenefitsData extends BaseSection {
  type: 'benefits';
  title: string;
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
}

// Services
export interface ServicesData extends BaseSection {
  type: 'services';
  title: string;
  items: {
    icon: string;
    text: string;
  }[];
  image: ImageData;
  button?: ButtonData;
}

// Testimonials
export interface TestimonialsData extends BaseSection {
  type: 'testimonials';
  title: string;
  videos: {
    embedUrl: string;
    title?: string;
  }[];
}

// Steps
export interface StepsData extends BaseSection {
  type: 'steps';
  title: string;
  steps: {
    title: string;
    description: string;
  }[];
  button: ButtonData;
}

// Technology
export interface TechnologyData extends BaseSection {
  type: 'technology';
  title: string;
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
  image: ImageData;
  button: ButtonData;
}

// About
export interface AboutData extends BaseSection {
  type: 'about';
  title: string;
  description: string;
  image?: ImageData;
  button?: ButtonData;
}

// FAQ
export interface FAQData extends BaseSection {
  type: 'faq';
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
}

// CTA Final
export interface CTAFinalData extends BaseSection {
  type: 'ctaFinal' | 'cta';
  title: string;
  subtitle?: string;
  button: ButtonData;
}

// Gallery
export interface GalleryData extends BaseSection {
  type: 'gallery';
  title: string;
  subtitle?: string;
  images: ImageData[];
}

// Pricing
export interface PricingData extends BaseSection {
  type: 'pricing';
  title: string;
  subtitle?: string;
  plans: {
    name: string;
    price: string;
    currency: string;
    period: string;
    featured?: boolean;
    features: string[];
    button: ButtonData;
  }[];
}

// Contact
export interface ContactData extends BaseSection {
  type: 'contact';
  title: string;
  subtitle?: string;
  formAction: string;
  fields: {
    type: 'text' | 'email' | 'tel' | 'textarea';
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  }[];
  submitButton: ButtonData;
  info?: {
    icon: string;
    label: string;
    value: string;
  }[];
}

// Footer
export interface FooterData extends BaseSection {
  type: 'footer';
  instagram: {
    url: string;
    text: string;
  };
  copyright: string;
  legalLink: {
    text: string;
    href: string;
  };
}

// ==========================================
// MAIN TYPES
// ==========================================

export type SectionData =
  | HeaderData
  | HeroData
  | BenefitsData
  | ServicesData
  | TestimonialsData
  | StepsData
  | TechnologyData
  | AboutData
  | FAQData
  | CTAFinalData
  | GalleryData
  | PricingData
  | ContactData
  | FooterData;

export interface LandingPageData {
  metadata: {
    title: string;
    description: string;
    favicon?: string;
  };
  sections: SectionData[];
}

