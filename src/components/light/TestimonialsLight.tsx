import { TestimonialsData } from '@/types/lp-config';

interface TestimonialsLightProps {
  data: TestimonialsData;
}

export function TestimonialsLight({ data }: TestimonialsLightProps) {
  return (
    <section
      id={data.id}
      className="testimonials-light"
      style={{
        '--bg': data.backgroundColor || '#f8f9fa',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container">
        <h2>{data.title}</h2>
        <div className="testimonials-grid">
          {data.videos.map((video, index) => (
            <div key={index} className="video-container">
              <iframe
                src={video.embedUrl}
                title={video.title || `Depoimento ${index + 1}`}
                className="video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
