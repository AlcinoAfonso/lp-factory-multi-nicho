import { cn } from '@/lib/utils';
import { StepsData } from '@/types/lp-config';
import { Button } from '@/components/ui/Button';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';

interface StepsProps {
  data: StepsData;
}

function Steps({ data }: StepsProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section id={data.id} className={sectionDefaults.steps.classes} style={sectionStyle}>
      <div className={sectionDefaults.steps.container}>
        <div className={sectionDefaults.steps.titleContainer}>
          <h2
            className={cn(typography.sectionTitle.classes)}
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
        </div>

        <div className={sectionDefaults.steps.layout}>
          {data.steps.map((step, index) => (
            <div key={index} className={sectionDefaults.steps.stepContainer}>
              <h3
                className={cn(typography.sectionSubtitle.classes)}
                style={{ color: data.textColor }}
              >
                {step.title}
              </h3>
              <p
                className={cn(typography.bodyText.classes)}
                style={{ color: data.textColor }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className={sectionDefaults.steps.buttonContainer}>
          <Button {...data.button} />
        </div>
      </div>
    </section>
  );
}

export default Steps;
