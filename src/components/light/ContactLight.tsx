import { ContactData } from '@/types/lp-config';

interface ContactLightProps {
  data: ContactData;
}

export function ContactLight({ data }: ContactLightProps) {
  return (
    <section 
      id={data.id}
      className="contact-light"
      style={{
        '--bg': data.backgroundColor || '#ffffff',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        {data.subtitle && <p className="contact-subtitle">{data.subtitle}</p>}
        
        <div className="contact-content">
          <form className="contact-form" action={data.formAction} method="POST">
            {data.fields.map((field, index) => (
              <div key={index} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="btn btn-primary btn-block">
              {data.submitButton.text}
            </button>
          </form>
          
          {data.info && (
            <div className="contact-info">
              {data.info.map((item, index) => (
                <div key={index} className="info-item">
                  <span className="info-icon">{item.icon}</span>
                  <div>
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
