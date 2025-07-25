import Image from 'next/image';
import { TechnologyData } from '@/types/lp-config';

interface TechnologyLightProps {
  data: TechnologyData;
}

export function TechnologyLight({ data }: TechnologyLightProps) {
  return (
    <section
      id={data.id}
      className="technology-light"
      style={{
        '--bg': data.backgroundColor || '#f8f9fa',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        <div className="technology-content">
          <div className="technology-items">
            {data.items.map((item, index) => (
              <div key={index} className="tech-item">
                <span className="tech-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="technology-image">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="technology-button">
          <a
            href={data.button.href}
            className={`btn btn-${data.button.variant || 'primary'}`}
          >
            {data.button.text}
          </a>
        </div>
      </div>
    </section>
  );
}
