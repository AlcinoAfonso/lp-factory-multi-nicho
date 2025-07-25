'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FAQData } from '@/types/lp-config';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  data: FAQData;
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
    <section id={data.id} className={sectionDefaults.faq.classes} style={sectionStyle}>
      <div className={sectionDefaults.faq.container}>
        <div className={sectionDefaults.faq.titleContainer}>
          <h2
            className={cn(typography.sectionTitle.classes)}
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
        </div>

        <div className={sectionDefaults.faq.accordionContainer}>
          {data.items.map((item, index) => (
            <div key={index} className={sectionDefaults.faq.accordionItem}>
              <button
                onClick={() => toggleAccordion(index)}
                className={sectionDefaults.faq.accordionTrigger}
                style={{ color: data.textColor }}
              >
                <span className={cn(typography.sectionSubtitle.classes, 'mb-0')}>
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
                <div className={sectionDefaults.faq.accordionContent}>
                  <p
                    className={cn(typography.bodyText.classes, 'mb-0')}
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
