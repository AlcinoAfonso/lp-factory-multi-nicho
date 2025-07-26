import React from 'react';

interface GalleryProps {
  data: {
    id: string;
    type: 'gallery';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    subtitle?: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
  };
}

const Gallery: React.FC<GalleryProps> = ({ data }) => {
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
        {data.title && (
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            {data.title}
          </h2>
        )}
        
        {data.subtitle && (
          <p className="text-xl text-center mb-12 opacity-90">
            {data.subtitle}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
