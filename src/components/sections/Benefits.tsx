import { cn } from '@/lib/utils';
import { BenefitsData } from '@/types/lp-config';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';

interface BenefitsProps {
  data: BenefitsData;
}

function Benefits({ data }: BenefitsProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section id={data.id} className={sectionDefaults.benefits.classes} style={sectionStyle}>
      <div className={sectionDefaults.benefits.container}>
        {/* Título centralizado */}
        <div className={sectionDefaults.benefits.titleContainer}>
          <h2
            className={cn(typography.sectionTitle.classes)}
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
        </div>

        {/* Grid de benefícios */}
        <div className={sectionDefaults.benefits.layout}>
          {[0, 1].map((col) => (
            <div key={col} className={sectionDefaults.benefits.column}>
              {data.items.slice(col * 3, col * 3 + 3).map((item, index) => (
                <div key={index} className={sectionDefaults.benefits.cardContainer}>
                  <div className={sectionDefaults.benefits.iconContainer}>{item.icon}</div>
                  <h3
                    className={cn(typography.sectionSubtitle.classes)}
                    style={{ color: data.textColor }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(typography.bodyText.classes)}
                    style={{ color: data.textColor }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
