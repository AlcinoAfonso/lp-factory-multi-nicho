import Link from 'next/link';
import Image from 'next/image';
import { HeaderData, isTextLogo } from '@/types/lp-config';

interface HeaderLightProps {
  data: HeaderData;
}

export function HeaderLight({ data }: HeaderLightProps) {
  return (
    <header
      className="header-light"
      style={{
        '--bg': data.backgroundColor || '#ffffff',
        '--color': data.textColor || '#1a1a1a',
      } as React.CSSProperties}
    >
      <div className="container header-container">
        <div className="header-logo">
          <Link href="/">
            {isTextLogo(data.logo) ? (
              <div className="logo-text">
                <span className="logo-main">{data.logo.text}</span>
                {data.logo.subtitle && (
                  <span className="logo-subtitle">{data.logo.subtitle}</span>
                )}
              </div>
            ) : (
              <Image
                src={data.logo.src}
                alt={data.logo.alt}
                width={180}
                height={50}
                className="logo-image"
                priority
              />
            )}
          </Link>
        </div>

        <nav className="header-nav">
          {data.navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
          {data.phone && (
            <a
              href={data.phone.link}
              className="nav-link nav-phone"
            >
              {data.phone.display}
            </a>
          )}
        </nav>

        <button className="mobile-menu-btn" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
