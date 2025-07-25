import { cn } from '@/lib/utils';

interface BenefitsPropsV2 {
  data: {
    id: string;
    type: 'benefits';
    backgroundColor?: string;
    textColor?: string;
    h2?: string;
    title?: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

function BenefitsV2({ data }: BenefitsPropsV2) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  };

  // Compatibilidade entre formatos
  const title = data.h2 || data.title || '';

  return (
    <section id={data.id} className="py-12 md:py-16" style={sectionStyle}>
      <div className="container-lp">
        {/* Título centralizado */}
        <div className="text-center mb-12">
          <h2
            className="text-[2rem] font-bold leading-[1.2] tracking-tight font-inter mb-4"
            style={{ color: data.textColor }}
          >
            {title}
          </h2>
        </div>

        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {[0, 1].map((col) => (
            <div key={col} className="space-y-8">
              {data.items.slice(col * 3, col * 3 + 3).map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3
                    className="text-[1.25rem] font-semibold leading-[1.4] tracking-normal font-inter mt-4 mb-2"
                    style={{ color: data.textColor }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-base font-normal leading-[1.5] tracking-normal font-inter mb-4"
                    style={{ color: data.textColor }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsV2;
