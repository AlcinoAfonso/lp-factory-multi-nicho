import React from 'react';

interface TechnologyProps {
  data: {
    id: string;
    type: 'technology';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    image: {
      src: string;
      alt: string;
    };
    button: {
      text: string;
      href: string;
      variant?: string;
    };
  };
}

function Technology({ data }: TechnologyProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-12">
          <div className="space-y-8">
            {data.items.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: data.textColor }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: data.textColor }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
            <img
              src={data.image.src}
              alt={data.image.alt}
              className="w-full h-full object-cover"
            />
          </div>
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

export default Technology;
