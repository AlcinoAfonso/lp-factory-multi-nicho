export const globalConfig = {
  // Configurações do HTML
  lang: 'pt-BR',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1.0',
  
  // Variáveis CSS globais
  cssVariables: {
    larguraPagina: 'clamp(20rem, 100vw, 75rem)',
    fontePrincipal: 'Inter, sans-serif',
    tamanhoBase: '1rem',
    paddingLateralMobile: '1rem',
    paddingLateralMd: '1.5rem',
  },
  
  // Configurações de scroll
  scrollBehavior: 'smooth',
  
  // Breakpoints (para referência)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};
