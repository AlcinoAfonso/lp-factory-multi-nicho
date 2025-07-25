import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';

interface FooterPropsV2 {
  data: {
    id: string;
    type: 'footer';
    backgroundColor?: string;
    textColor?: string;
    instagram_url?: string;
    instagram?: {
      url: string;
      text: string;
    };
    copyright?: string;
    termo_uso?: {
      url: string;
      texto: string;
    };
    legalLink?: {
      text: string;
      href: string;
    };
  };
}

function FooterV2({ data }: FooterPropsV2) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  };

  // Compatibilidade entre formatos
  const instagram = data.instagram || (data.instagram_url ? {
    url: data.instagram_url,
    text: '@empresa'
  } : null);
  
  const legalLink = data.legalLink || (data.termo_uso ? {
    text: data.termo_uso.texto,
    href: data.termo_uso.url
  } : null);

  return (
    <footer className="py-8 border-t" style={sectionStyle}>
      <div className="container-lp">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                style={{ color: data.textColor }}
              >
                <Instagram className="w-5 h-5" />
                <span>{instagram.text}</span>
              </a>
            )}
            <small
              className="text-xs font-normal leading-[1.5] tracking-normal font-inter"
              style={{ color: data.textColor }}
            >
              {data.copyright}
            </small>
          </div>

          <div className="text-center md:text-right">
            {legalLink && (
              <a
                href={legalLink.href}
                className="text-xs font-normal leading-[1.5] tracking-normal font-inter hover:underline"
                style={{ color: data.textColor }}
              >
                {legalLink.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterV2;
