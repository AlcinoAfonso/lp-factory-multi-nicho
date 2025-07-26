import React from 'react';

interface CTAFinalProps {
  data: {
    id: string;
    type: 'ctaFinal';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    subtitle?: string;
    button: {
      text: string;
      href: string;
      variant?: string;
    };
  };
}

function CTAFinal({ data }: CTAFinalProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section id={data.id} className="py-16 md:py-24" style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2
            className="text-4xl font-bold"
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
          {data.subtitle && (
            <h3
              className="text-xl font-semibold max-w-2xl mx-auto"
              style={{ color: data.textColor }}
            >
              {data.subtitle}
            </h3>
          )}
          <a
            href={data.button.href}
            className="inline-block px-8 py-4 rounded-2xl font-semibold transition-all duration-200 text-center bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
            target={data.button.href.startsWith('http') ? '_blank' : undefined}
            rel={data.button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {data.button.text}
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTAFinal;
