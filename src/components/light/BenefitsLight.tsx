import { BenefitsData } from '@/types/lp-config';

interface BenefitsLightProps {
  data: BenefitsData;
}

export function BenefitsLight({ data }: BenefitsLightProps) {
  return (
    <section
      id={data.id}
      className="benefits-light"
      style={{
        '--bg': data.backgroundColor || '#ffffff',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        <div className="benefits-grid">
          {data.items.map((item, index) => (
            <div key={index} className="benefit-card">
              <span className="benefit-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
