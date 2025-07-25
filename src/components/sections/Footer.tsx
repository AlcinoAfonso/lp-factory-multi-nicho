import { cn } from '@/lib/utils';
import { FooterData } from '@/types/lp-config';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';
import { Instagram } from 'lucide-react';

interface FooterProps {
  data: FooterData;
}

function Footer({ data }: FooterProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <footer className={sectionDefaults.footer.classes} style={sectionStyle}>
      <div className={sectionDefaults.footer.container}>
        <div className={sectionDefaults.footer.layout}>
          <div className={sectionDefaults.footer.leftContainer}>
            <a
              href={data.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: data.textColor }}
            >
              <Instagram className="w-5 h-5" />
              <span>{data.instagram.text}</span>
            </a>
            <small
              className={cn(typography.footnote.classes)}
              style={{ color: data.textColor }}
            >
              {data.copyright}
            </small>
          </div>

          <div className={sectionDefaults.footer.rightContainer}>
            <a
              href={data.legalLink.href}
              className={cn(typography.footnote.classes, 'hover:underline')}
              style={{ color: data.textColor }}
            >
              {data.legalLink.text}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
