import { cn } from '@/lib/utils';

interface StepsPropsV2 {
  data: {
    id: string;
    type: 'steps';
    backgroundColor?: string;
    textColor?: string;
    h2?: string;
    title?: string;
    steps: Array<{
      h3?: string;
      title?: string;
      descricao?: string;
      description?: string;
    }>;
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

function StepsV2({ data }: StepsPropsV2) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  };

  // Compatibilidade entre formatos
  const title = data.h2 || data.title || '';
  const button = data.button || (data.botao_whatsapp ? {
    text: data.botao_whatsapp.rotulo,
    href: `https://wa.me/${data.botao_whatsapp.numero}?text=${encodeURIComponent(data.botao_whatsapp.mensagem)}`,
    variant: 'primary'
  } : null);

  return (
    <section id={data.id} className="py-12 md:py-16" style={sectionStyle}>
      <div className="container-lp">
        <div className="text-center mb-12">
          <h2
            className="text-[2rem] font-bold leading-[1.2] tracking-tight font-inter mb-4"
            style={{ color: data.textColor }}
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-12">
          {data.steps.map((step, index) => (
            <div key={index} className="text-center md:text-left space-y-4">
              <h3
                className="text-[1.25rem] font-semibold leading-[1.4] tracking-normal font-inter mt-4 mb-2"
                style={{ color: data.textColor }}
              >
                {step.h3 || step.title}
              </h3>
              <p
                className="text-base font-normal leading-[1.5] tracking-normal font-inter mb-4"
                style={{ color: data.textColor }}
              >
                {step.descricao || step.description}
              </p>
            </div>
          ))}
        </div>

        {button && (
          <div className="text-center">
            <a
              href={button.href}
              className="inline-block text-base font-semibold leading-[1.4] tracking-tight font-inter px-8 py-4 rounded-[16px] transition-all duration-200 text-center bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
              target={button.href.startsWith('http') ? '_blank' : undefined}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {button.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default StepsV2;
