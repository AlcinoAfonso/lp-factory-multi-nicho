import React from 'react';

interface AboutProps {
  data: {
    id: string;
    type: 'about';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    description: string;
    image?: {
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

const About: React.FC<AboutProps> = ({ data }) => {
  const hasImage = data.image !== undefined;

  return (
    <section
      id={data.id}
      className="py-16 lg:py-24"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {hasImage && (
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={data.image!.src}
                alt={data.image!.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className={hasImage ? '' : 'md:col-span-2 max-w-3xl mx-auto text-center'}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {data.title}
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line text-lg leading-relaxed">
                {data.description}
              </p>
            </div>

            {data.button && (
              <div className="mt-8">
                <a
                  href={data.button.href}
                  className="inline-block px-6 py-3 rounded-lg font-semibold transition-all bg-orange-500 text-white hover:bg-orange-600"
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
};

export default About;
