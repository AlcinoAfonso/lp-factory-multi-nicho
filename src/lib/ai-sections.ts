export function generateAISection(section: string): any {
  switch (section) {
    case 'benefits':
      return {
        id: 'benefits',
        type: 'benefits',
        title: 'Principais Benefícios',
        items: [
          { icon: '🎯', title: 'Resultado Eficaz', description: '...' },
          { icon: '⚡', title: 'Processo Rápido', description: '...' },
          { icon: '🚀', title: 'Suporte Completo', description: '...' },
          { icon: '💎', title: 'Tecnologia Avançada', description: '...' },
          { icon: '🔒', title: 'Totalmente Seguro', description: '...' },
          { icon: '✨', title: 'Experiência Única', description: '...' },
        ],
      };
    case 'faq':
      return {
        id: 'faq',
        type: 'faq',
        title: 'Perguntas Frequentes',
        items: [
          {
            question: 'Como funciona o tratamento?',
            answer:
              'O tratamento utiliza tecnologia avançada para identificar e harmonizar desequilíbrios.',
          },
          {
            question: 'Quando verei resultados?',
            answer: 'Os primeiros resultados podem ser percebidos em poucos dias.',
          },
          { question: 'É seguro?', answer: 'Sim, completamente seguro e não invasivo.' },
          {
            question: 'Preciso comparecer presencialmente?',
            answer: 'Não, todo o processo pode ser feito à distância.',
          },
          {
            question: 'Quantas sessões são necessárias?',
            answer:
              'O número varia conforme cada caso e é definido após avaliação inicial.',
          },
        ],
      };
    default:
      return { id: section, type: section };
  }
}
