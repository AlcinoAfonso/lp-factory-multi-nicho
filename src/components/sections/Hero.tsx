import React from 'react';

interface HeroProps {
  data: {
    id: string;
    type: 'hero';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    description: string;
    primaryButton: {
      text: string;
      href: string;
      variant?: string;
    };
    secondaryButton?: {
      text: string;
      href: string;
      variant?: string;
    };
    image: {
      src: string;
      alt: string;
    };
  };
}

function Hero({ data }: HeroProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  };

  return (
    <section id={data.id} className="py-12 md:py-20" style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: data.textColor }}
            >
              {data.title}
            </h1>
            
            <p 
              className="text-xl mb-8"
              style={{ color: data.textColor }}
            >
              {data.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href={data.primaryButton.href}
                className="px-8 py-4 rounded-2xl font-semibold transition-all duration-200 text-center bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl"
                target={data.primaryButton.href.startsWith('http') ? '_blank' : undefined}
                rel={data.primaryButton.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {data.primaryButton.text}
              </a>
              {data.secondaryButton && (
                <a
                  href={data.secondaryButton.href}
                  className="px-8 py-4 rounded-2xl font-semibold transition-all duration-200 text-center border-2 border-current hover:bg-current hover:text-white"
                  target={data.secondaryButton.href.startsWith('http') ? '_blank' : undefined}
                  rel={data.secondaryButton.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {data.secondaryButton.text}
                </a>
              )}
            </div>
          </div>

          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={data.image.src}
              alt={data.image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
