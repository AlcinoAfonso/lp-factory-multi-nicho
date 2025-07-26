import React from 'react';

interface ServicesProps {
  data: {
    id: string;
    type: 'services';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    items: Array<{
      icon: string;
      text: string;
    }>;
    image: {
      src: string;
      alt: string;
    };
    button?: {
      text: string;
      href: string;
      variant?: string;
    };
  };
}

function Services({ data }: ServicesProps) {
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

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-12">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={data.image.src}
                alt={data.image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {data.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-2xl flex-shrink-0 mt-1">{item.icon}</span>
                <p
                  className="text-base mb-0"
                  style={{ color: data.textColor }}
                  dangerouslySetInnerHTML={{
                    __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </div>
            ))}

            {data.button && (
              <div className="mt-8">
                <a
                  href={data.button.href}
                  className="inline-block px-8 py-4 rounded-2xl font-semibold transition-all duration-200 text-center bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
                  target={data.button.href.startsWith('http') ? '_blank' : undefined}
                  rel={data.button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {data.button.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
