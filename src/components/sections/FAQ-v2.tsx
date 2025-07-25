'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FAQPropsV2 {
  data: {
    id: string;
    type: 'faq';
    backgroundColor?: string;
    textColor?: string;
    h2?: string;
    title?: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

function FAQV2({ data }: FAQPropsV2) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  };

  // Compatibilidade entre formatos
  const title = data.h2 || data.title || '';

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={data.id} className="py-12 md:py-16" style={sectionStyle}>
      <div className="container-lp">
        <div className="text-center mb-12">
          <h2
            className="text-[2rem] font-bold leading-[1.2] tracking-tight font-inter mb-4"
            style={{ color: data.textColor }}
          >
            {title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {data.items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                style={{ color: data.textColor }}
              >
                <span className="text-[1.25rem] font-semibold leading-[1.4] tracking-normal font-inter mb-0">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p
                    className="text-base font-normal leading-[1.5] tracking-normal font-inter mb-0"
                    style={{ color: data.textColor }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQV2;
