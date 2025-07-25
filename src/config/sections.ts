export const sectionDefaults = {
  header: {
    structure: 'Logo à esquerda, menu/telefone à direita',
    classes: 'w-full py-4 mb-0 bg-opacity-95 backdrop-blur-sm',
    container: 'container-lp',
    grid: 'flex items-center justify-between',
    logoContainer: 'flex-shrink-0',
    navContainer: 'flex items-center gap-6',
    mobileMenu: 'Menu hambúrguer em telas menores que md',
  },

  hero: {
    structure: 'Dois containers: texto (vertical) e imagem. Mobile empilha, desktop lado a lado.',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    layout: 'flex flex-col md:flex-row gap-12 md:gap-16 items-center',
    textContainer: 'flex-1 flex flex-col space-y-6 text-center md:text-left',
    imageContainer: 'flex-1 w-full md:w-auto',
  },

  benefits: {
    structure: 'Título centralizado, 2 containers lado a lado com 3 benefícios cada',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    layout: 'grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16',
    column: 'space-y-8',
    cardContainer: 'flex flex-col items-center text-center space-y-4',
    iconContainer: 'text-4xl mb-2',
  },

  services: {
    structure: 'Título centralizado, imagem à esquerda e textos à direita, botão centralizado abaixo',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    contentLayout: 'flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-12',
    imageContainer: 'flex-1 w-full md:w-auto',
    textContainer: 'flex-1 space-y-6',
    textItem: 'flex gap-4',
    iconInline: 'text-2xl flex-shrink-0 mt-1',
    buttonContainer: 'text-center',
  },

  testimonials: {
    structure: 'Título centralizado, carrossel de vídeos mostrando 3 por vez',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    carouselContainer: 'relative',
    carouselTrack: 'flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide',
    videoCard: 'flex-none w-full md:w-[calc(33.333%-1rem)] snap-center',
    navigationContainer: 'flex justify-center gap-4 mt-8',
    arrowButton: 'p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors',
  },

  steps: {
    structure: 'Título centralizado, 2 containers lado a lado com h3 e texto, botão centralizado abaixo',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    layout: 'grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-12',
    stepContainer: 'text-center md:text-left space-y-4',
    buttonContainer: 'text-center',
  },

  technology: {
    structure: 'Título centralizado, 4 itens à esquerda e imagem à direita, botão centralizado abaixo',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    contentLayout: 'flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-12',
    itemsContainer: 'flex-1 space-y-6',
    item: 'flex gap-4',
    iconContainer: 'text-2xl flex-shrink-0 mt-1',
    textContainer: 'flex-1',
    imageContainer: 'flex-1 w-full md:w-auto',
    buttonContainer: 'text-center',
  },

  about: {
    structure: 'Imagem à esquerda, título h2 e texto à direita',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    layout: 'flex flex-col md:flex-row gap-12 md:gap-16 items-center',
    imageContainer: 'flex-1 w-full md:w-auto',
    textContainer: 'flex-1 space-y-6 text-center md:text-left',
  },

  faq: {
    structure: 'Título centralizado, accordion abaixo',
    classes: 'py-12 md:py-16',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    accordionContainer: 'max-w-3xl mx-auto space-y-4',
    accordionItem: 'border border-gray-200 rounded-lg overflow-hidden',
    accordionTrigger: 'w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors',
    accordionContent: 'px-6 pb-6',
  },

  ctaFinal: {
    structure: 'Título h1, subtítulo h3 e botão centralizados verticalmente',
    classes: 'py-16 md:py-24',
    container: 'container-lp',
    contentContainer: 'max-w-2xl mx-auto text-center space-y-6',
  },

  footer: {
    structure: 'Instagram e texto à esquerda, link à direita',
    classes: 'py-8 border-t',
    container: 'container-lp',
    layout: 'flex flex-col md:flex-row justify-between items-center gap-6',
    leftContainer: 'flex flex-col items-center md:items-start gap-2',
    rightContainer: 'text-center md:text-right',
  },
};
