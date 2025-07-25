import Image from 'next/image';
import { GalleryData } from '@/types/lp-config';

interface GalleryLightProps {
  data: GalleryData;
}

export function GalleryLight({ data }: GalleryLightProps) {
  return (
    <section 
      id={data.id}
      className="gallery-light"
      style={{
        '--bg': data.backgroundColor || '#ffffff',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        {data.subtitle && <p className="gallery-subtitle">{data.subtitle}</p>}
        <div className="gallery-grid">
          {data.images.map((image, index) => (
            <div key={index} className="gallery-item">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="gallery-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
