'use client';

import { useState } from 'react';

interface HeaderProps {
  data: {
    id: string;
    type: 'header';
    backgroundColor?: string;
    textColor?: string;
    logo: {
      type: 'text' | 'image';
      text?: string;
      subtitle?: string;
      src?: string;
      alt?: string;
    };
    navigation: Array<{
      label: string;
      href: string;
    }>;
    phone?: {
      display: string;
      link: string;
    };
  };
}

function Header({ data }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const containerStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  };

  return (
    <header
      className="sticky top-0 z-50 py-4 shadow-sm"
      style={containerStyle}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          {data.logo.type === 'text' ? (
            <div>
              <div className="text-xl font-bold" style={{ color: data.textColor }}>
                {data.logo.text}
              </div>
              {data.logo.subtitle && (
                <div className="text-xs uppercase tracking-wide opacity-80" style={{ color: data.textColor }}>
                  {data.logo.subtitle}
                </div>
              )}
            </div>
          ) : (
            <img
              src={data.logo.src}
              alt={data.logo.alt}
              className="h-12 md:h-14 w-auto"
            />
          )}
        </div>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center gap-6">
            {data.navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="font-medium hover:opacity-70 transition-opacity"
                style={{ color: data.textColor }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {data.phone && (
            <a
              href={data.phone.link}
              className="font-bold hover:opacity-70 transition-opacity hidden md:inline-block"
              style={{ color: data.textColor }}
            >
              {data.phone.display}
            </a>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2"
            style={{ color: data.textColor }}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: data.textColor + '20', ...containerStyle }}>
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {data.navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-2 text-center"
                style={{ color: data.textColor }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {data.phone && (
              <a
                href={data.phone.link}
                className="block py-2 text-center font-bold"
                style={{ color: data.textColor }}
              >
                {data.phone.display}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
