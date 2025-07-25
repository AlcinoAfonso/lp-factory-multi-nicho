import Image from 'next/image';
import { AboutData } from '@/types/lp-config';

interface AboutLightProps {
  data: AboutData;
}

export function AboutLight({ data }: AboutLightProps) {
  const hasImage = data.image !== undefined;
  
  return (
    <section
      id={data.id}
      className="about-light"
      style={{
        '--bg': data.backgroundColor || '#ffffff',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <div className={`about-content ${hasImage ? 'with-image' : 'text-only'}`}> 
          {hasImage && (
            <div className="about-image">
              <Image
                src={data.image!.src}
                alt={data.image!.alt}
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
          )}
          <div className="about-text">
            <h2>{data.title}</h2>
            <p className="about-description">{data.description}</p>
            {data.button && (
              <a
                href={data.button.href}
                className={`btn btn-${data.button.variant || 'primary'}`}
              >
                {data.button.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
