import { CTAFinalData } from '@/types/lp-config';

interface CTAFinalLightProps {
  data: CTAFinalData;
}

export function CTAFinalLight({ data }: CTAFinalLightProps) {
  return (
    <section
      id={data.id}
      className="cta-final-light"
      style={{
        '--bg': data.backgroundColor || '#1a1a1a',
        '--color': data.textColor || '#ffffff',
      } as React.CSSProperties}
    >
      <div className="container">
        <div className="cta-content">
          <h2>{data.title}</h2>
          {data.subtitle && <p className="cta-subtitle">{data.subtitle}</p>}
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
