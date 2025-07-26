'use client';

import { useState } from 'react';

interface FAQProps {
  data: {
    id: string;
    type: 'faq';
    backgroundColor?: string;
    textColor?: string;
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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

        <div className="max-w-3xl mx-auto space-y-4">
          {data.items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                style={{ color: data.textColor }}
              >
                <span className="text-lg font-semibold mb-0">
                  {item.question}
                </span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p
                    className="text-base mb-0"
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

export default FAQ;
