'use client';

import { useState, useRef } from 'react';

interface TestimonialsProps {
  data: {
    id: string;
    type: 'testimonials';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    videos: Array<{
      embedUrl: string;
      title?: string;
    }>;
  };
}

function Testimonials({ data }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 3;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

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

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={checkScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {data.videos.map((video, index) => (
              <div key={index} className="flex-none w-full md:w-[calc(33.333%-1rem)] snap-center">
                <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={video.embedUrl}
                    title={video.title || `Depoimento ${index + 1}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ${
                !canScrollLeft && 'opacity-50 cursor-not-allowed'
              }`}
              aria-label="Anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ${
                !canScrollRight && 'opacity-50 cursor-not-allowed'
              }`}
              aria-label="Próximo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
