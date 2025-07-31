export interface SectionField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'url' | 'color' | 'select' | 'array'
  required?: boolean
  placeholder?: string
  helper?: string
  path?: string[]
  options?: { value: string; label: string }[]
}

export function getSectionFields(sectionType: string): SectionField[] {
  const schemas: Record<string, SectionField[]> = {
    header: [
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
      {
        name: 'logo.text',
        label: 'Texto do Logo',
        type: 'text',
        path: ['logo', 'text'],
      },
      {
        name: 'logo.subtitle',
        label: 'Subtítulo do Logo',
        type: 'text',
        path: ['logo', 'subtitle'],
      },
      {
        name: 'phone.display',
        label: 'Telefone (Exibição)',
        type: 'text',
        path: ['phone', 'display'],
        placeholder: '(11) 99999-9999',
      },
      {
        name: 'phone.link',
        label: 'Telefone (Link)',
        type: 'text',
        path: ['phone', 'link'],
        placeholder: 'tel:+5511999999999',
      },
    ],

    hero: [
      {
        name: 'title',
        label: 'Título Principal',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        label: 'Descrição',
        type: 'textarea',
        required: true,
      },
      {
        name: 'primaryButton.text',
        label: 'Texto do Botão Principal',
        type: 'text',
        path: ['primaryButton', 'text'],
        required: true,
      },
      {
        name: 'primaryButton.href',
        label: 'Link do Botão Principal',
        type: 'url',
        path: ['primaryButton', 'href'],
        required: true,
      },
      {
        name: 'secondaryButton.text',
        label: 'Texto do Botão Secundário',
        type: 'text',
        path: ['secondaryButton', 'text'],
      },
      {
        name: 'secondaryButton.href',
        label: 'Link do Botão Secundário',
        type: 'url',
        path: ['secondaryButton', 'href'],
      },
      {
        name: 'image.src',
        label: 'URL da Imagem',
        type: 'url',
        path: ['image', 'src'],
        required: true,
      },
      {
        name: 'image.alt',
        label: 'Texto Alternativo da Imagem',
        type: 'text',
        path: ['image', 'alt'],
        required: true,
      },
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
    ],

    about: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        label: 'Descrição',
        type: 'textarea',
        required: true,
      },
      {
        name: 'image.src',
        label: 'URL da Imagem',
        type: 'url',
        path: ['image', 'src'],
      },
      {
        name: 'image.alt',
        label: 'Texto Alternativo da Imagem',
        type: 'text',
        path: ['image', 'alt'],
      },
      {
        name: 'button.text',
        label: 'Texto do Botão',
        type: 'text',
        path: ['button', 'text'],
      },
      {
        name: 'button.href',
        label: 'Link do Botão',
        type: 'url',
        path: ['button', 'href'],
      },
    ],

    services: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'image.src',
        label: 'URL da Imagem',
        type: 'url',
        path: ['image', 'src'],
        required: true,
      },
      {
        name: 'image.alt',
        label: 'Texto Alternativo da Imagem',
        type: 'text',
        path: ['image', 'alt'],
        required: true,
      },
      {
        name: 'button.text',
        label: 'Texto do Botão',
        type: 'text',
        path: ['button', 'text'],
      },
      {
        name: 'button.href',
        label: 'Link do Botão',
        type: 'url',
        path: ['button', 'href'],
      },
      {
        name: 'items',
        label: 'Serviços',
        type: 'array',
        required: true,
      },
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
    ],
    benefits: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
    ],

    steps: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'button.text',
        label: 'Texto do Botão',
        type: 'text',
        path: ['button', 'text'],
        required: true,
      },
      {
        name: 'button.href',
        label: 'Link do Botão',
        type: 'url',
        path: ['button', 'href'],
        required: true,
      },
    ],

    testimonials: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
    ],

    faq: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
    ],

    contact: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'subtitle',
        label: 'Subtítulo',
        type: 'text',
      },
      {
        name: 'formAction',
        label: 'URL de Ação do Formulário',
        type: 'url',
        required: true,
        helper: 'Para onde o formulário será enviado',
      },
      {
        name: 'submitButton.text',
        label: 'Texto do Botão de Envio',
        type: 'text',
        path: ['submitButton', 'text'],
        required: true,
      },
    ],

    pricing: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'subtitle',
        label: 'Subtítulo',
        type: 'text',
      },
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
    ],

    gallery: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'subtitle',
        label: 'Subtítulo',
        type: 'text',
      },
    ],

    technology: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'image.src',
        label: 'URL da Imagem',
        type: 'url',
        path: ['image', 'src'],
        required: true,
      },
      {
        name: 'image.alt',
        label: 'Texto Alternativo da Imagem',
        type: 'text',
        path: ['image', 'alt'],
        required: true,
      },
      {
        name: 'button.text',
        label: 'Texto do Botão',
        type: 'text',
        path: ['button', 'text'],
        required: true,
      },
      {
        name: 'button.href',
        label: 'Link do Botão',
        type: 'url',
        path: ['button', 'href'],
        required: true,
      },
    ],

    ctaFinal: [
      {
        name: 'title',
        label: 'Título',
        type: 'text',
        required: true,
      },
      {
        name: 'subtitle',
        label: 'Subtítulo',
        type: 'text',
      },
      {
        name: 'button.text',
        label: 'Texto do Botão',
        type: 'text',
        path: ['button', 'text'],
        required: true,
      },
      {
        name: 'button.href',
        label: 'Link do Botão',
        type: 'url',
        path: ['button', 'href'],
        required: true,
      },
      {
        name: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
      },
      {
        name: 'textColor',
        label: 'Cor do Texto',
        type: 'color',
      },
    ],

    footer: [
      {
        name: 'instagram.url',
        label: 'URL do Instagram',
        type: 'url',
        path: ['instagram', 'url'],
        required: true,
      },
      {
        name: 'instagram.text',
        label: 'Texto do Instagram',
        type: 'text',
        path: ['instagram', 'text'],
        required: true,
      },
      {
        name: 'copyright',
        label: 'Texto de Copyright',
        type: 'text',
        required: true,
      },
      {
        name: 'legalLink.text',
        label: 'Texto do Link Legal',
        type: 'text',
        path: ['legalLink', 'text'],
      },
      {
        name: 'legalLink.href',
        label: 'URL do Link Legal',
        type: 'url',
        path: ['legalLink', 'href'],
      },
    ],
  }

  return schemas[sectionType] || []
}
