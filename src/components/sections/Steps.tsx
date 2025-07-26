import React from 'react';

interface StepsProps {
  data: {
    id: string;
    type: 'steps';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
    button: {
      text: string;
      href: string;
      variant?: string;
    };
  };
}

function Steps({ data }: StepsProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section id={data.id} className="py-12 md:py-16" style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-12">
          {data.steps.map((step, index) => (
            <div key={index} className="text-center md:text-left space-y-4">
              <h3
                className="text-xl font-semibold mt-4 mb-2"
                style={{ color: data.textColor }}
              >
                {step.title}
              </h3>
              <p
                className="text-base mb-4"
                style={{ color: data.textColor }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
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

export default Steps;
