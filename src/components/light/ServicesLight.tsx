import Image from 'next/image';
import { ServicesData } from '@/types/lp-config';

interface ServicesLightProps {
  data: ServicesData;
}

export function ServicesLight({ data }: ServicesLightProps) {
  return (
    <section
      id={data.id}
      className="services-light"
      style={{
        '--bg': data.backgroundColor || '#f8f9fa',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        <div className="services-content">
          <div className="services-image">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="services-list">
            {data.items.map((item, index) => (
              <div key={index} className="service-item">
                <span>{item.icon}</span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </div>
            ))}
            {data.button && (
              <a href={data.button.href} className={`btn btn-${data.button.variant || 'primary'}`}>
                {data.button.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
