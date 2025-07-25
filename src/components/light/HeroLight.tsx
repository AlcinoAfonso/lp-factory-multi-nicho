import Image from 'next/image';
import { HeroData } from '@/types/lp-config';

interface HeroLightProps {
  data: HeroData;
}

export function HeroLight({ data }: HeroLightProps) {
  return (
    <section
      id={data.id}
      className="hero-light"
      style={{
        '--bg': data.backgroundColor || '#f8f9fa',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="hero-content">
        <div className="hero-text">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <div className="hero-buttons">
            <a
              href={data.primaryButton.href}
              className={`btn btn-${data.primaryButton.variant || 'primary'}`}
            >
              {data.primaryButton.text}
            </a>
            {data.secondaryButton && (
              <a
                href={data.secondaryButton.href}
                className={`btn btn-${
                  data.secondaryButton.variant || 'outline'
                }`}
              >
                {data.secondaryButton.text}
              </a>
            )}
          </div>
        </div>
        <div className="hero-image">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={600}
            height={400}
            priority
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
