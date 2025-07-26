import React from 'react';

interface BenefitsProps {
  data: {
    id: string;
    type: 'benefits';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

function Benefits({ data }: BenefitsProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {[0, 1].map((col) => (
            <div key={col} className="space-y-8">
              {data.items.slice(col * 3, col * 3 + 3).map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3
                    className="text-xl font-semibold mt-4 mb-2"
                    style={{ color: data.textColor }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-base mb-4"
                    style={{ color: data.textColor }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
