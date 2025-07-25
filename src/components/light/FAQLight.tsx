import { FAQData } from '@/types/lp-config';

interface FAQLightProps {
  data: FAQData;
}

export function FAQLight({ data }: FAQLightProps) {
  return (
    <section
      id={data.id}
      className="faq-light"
      style={{
        '--bg': data.backgroundColor || '#ffffff',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        <div className="faq-list">
          {data.items.map((item, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">
                {item.question}
                <span className="faq-icon">▼</span>
              </summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
