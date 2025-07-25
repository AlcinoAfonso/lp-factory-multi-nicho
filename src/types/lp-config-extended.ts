import { BaseSection, ButtonData, ImageData } from './lp-config';

// Gallery Section
export interface GalleryData extends BaseSection {
  type: 'gallery';
  title: string;
  subtitle?: string;
  images: ImageData[];
}

// Pricing Section
export interface PricingData extends BaseSection {
  type: 'pricing';
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export interface PricingPlan {
  name: string;
  price: string;
  currency: string;
  period: string;
  featured?: boolean;
  features: string[];
  button: ButtonData;
}

// Contact Section
export interface ContactData extends BaseSection {
  type: 'contact';
  title: string;
  subtitle?: string;
  formAction: string;
  fields: FormField[];
  submitButton: ButtonData;
  info?: ContactInfo[];
}

export interface FormField {
  type: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}
