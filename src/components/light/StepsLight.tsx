import { StepsData } from '@/types/lp-config';

interface StepsLightProps {
  data: StepsData;
}

export function StepsLight({ data }: StepsLightProps) {
  return (
    <section
      id={data.id}
      className="steps-light"
      style={{
        '--bg': data.backgroundColor || '#ffffff',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        <div className="steps-grid">
          {data.steps.map((step, index) => (
            <div key={index} className="step-item">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        <div className="steps-button">
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
