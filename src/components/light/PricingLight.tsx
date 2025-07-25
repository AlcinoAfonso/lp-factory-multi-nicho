import { PricingData } from '@/types/lp-config';

interface PricingLightProps {
  data: PricingData;
}

export function PricingLight({ data }: PricingLightProps) {
  return (
    <section 
      id={data.id}
      className="pricing-light"
      style={{
        '--bg': data.backgroundColor || '#f8f9fa',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        {data.subtitle && <p className="pricing-subtitle">{data.subtitle}</p>}
        <div className="pricing-grid">
          {data.plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            >
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="currency">{plan.currency}</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/{plan.period}</span>
              </div>
              <ul className="features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a 
                href={plan.button.href}
                className={`btn btn-${plan.button.variant || 'primary'} btn-block`}
              >
                {plan.button.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
