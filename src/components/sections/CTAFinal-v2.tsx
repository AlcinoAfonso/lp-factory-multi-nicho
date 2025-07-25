interface CTAFinalPropsV2 {
  data: {
    id: string;
    type: 'ctaFinal';
    backgroundColor?: string;
    textColor?: string;
    h2?: string;
    title?: string;
    h3?: string;
    subtitle?: string;
    botao_whatsapp?: {
      rotulo: string;
      numero: string;
      mensagem: string;
    };
    button?: {
      text: string;
      href: string;
      variant?: string;
    };
  };
}

function CTAFinalV2({ data }: CTAFinalPropsV2) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  };

  // Compatibilidade entre formatos
  const title = data.h2 || data.title || '';
  const subtitle = data.h3 || data.subtitle || '';
  const button = data.button || (data.botao_whatsapp ? {
    text: data.botao_whatsapp.rotulo,
    href: `https://wa.me/${data.botao_whatsapp.numero}?text=${encodeURIComponent(data.botao_whatsapp.mensagem)}`,
    variant: 'primary'
  } : null);

  return (
    <section id={data.id} className="py-16 md:py-24" style={sectionStyle}>
      <div className="container-lp">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2
            className="text-[2.5rem] font-bold leading-[1.2] tracking-tight font-inter"
            style={{ color: data.textColor }}
          >
            {title}
          </h2>
          {subtitle && (
            <h3
              className="text-[1.25rem] font-semibold leading-[1.4] tracking-normal font-inter max-w-2xl mx-auto"
              style={{ color: data.textColor }}
            >
              {subtitle}
            </h3>
          )}
          {button && (
            <a
              href={button.href}
              className="inline-block text-base font-semibold leading-[1.4] tracking-tight font-inter px-8 py-4 rounded-[16px] transition-all duration-200 text-center bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
              target={button.href.startsWith('http') ? '_blank' : undefined}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {button.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTAFinalV2;
