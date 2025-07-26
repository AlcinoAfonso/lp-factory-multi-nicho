export const SECTION_IDS = {
  HERO: 'hero',
  BENEFITS: 'benefits',
  FAQ: 'faq',
  CTA_FINAL: 'cta-final',
} as const;

export const DEFAULT_ORDER = [
  SECTION_IDS.HERO,
  SECTION_IDS.BENEFITS,
  SECTION_IDS.FAQ,
  SECTION_IDS.CTA_FINAL,
] as const;

export const TYPOGRAPHY_CLASSES = {
  h1: 'text-4xl font-bold',
  h2: 'text-2xl font-semibold',
  p: 'text-base',
} as const;
