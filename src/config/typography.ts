export const typography = {
  // Hero
  heroTitle: {
    tag: 'h1' as const,
    classes: 'text-[2.5rem] font-bold leading-[1.2] tracking-tight font-inter',
  },
  heroDescription: {
    tag: 'p' as const,
    classes: 'text-[1.25rem] font-semibold leading-[1.4] tracking-normal font-inter max-w-xl mx-auto md:mx-0',
  },
  
  // Títulos de seção
  sectionTitle: {
    tag: 'h2' as const,
    classes: 'text-[2rem] font-bold leading-[1.2] tracking-tight font-inter mb-4',
  },
  sectionSubtitle: {
    tag: 'h3' as const,
    classes: 'text-[1.25rem] font-semibold leading-[1.4] tracking-normal font-inter mt-4 mb-2',
  },
  
  // Textos
  bodyText: {
    tag: 'p' as const,
    classes: 'text-base font-normal leading-[1.5] tracking-normal font-inter mb-4',
  },
  smallText: {
    tag: 'small' as const,
    classes: 'text-[0.8125rem] font-light leading-[1.6] tracking-normal font-inter text-gray-500 mb-4',
  },
  footnote: {
    tag: 'small' as const,
    classes: 'text-xs font-normal leading-[1.5] tracking-normal font-inter',
  },
  
  // Header
  logoText: {
    tag: 'div' as const,
    classes: 'text-xl md:text-2xl font-bold tracking-tight font-inter',
  },
  logoSubtitle: {
    tag: 'div' as const,
    classes: 'text-xs md:text-sm font-normal tracking-wide uppercase opacity-80 font-inter',
  },
  navLink: {
    tag: 'a' as const,
    classes: 'text-base font-medium font-inter',
  },
  
  // Botões
  button: {
    base: 'inline-block text-base font-semibold leading-[1.4] tracking-tight font-inter px-8 py-4 rounded-[16px] transition-all duration-200 text-center',
    variants: {
      primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline: 'border-2 border-current hover:opacity-80',
      whatsapp: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl',
    },
  },
};
