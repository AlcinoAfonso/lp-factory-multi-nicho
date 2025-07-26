import React from 'react';

interface FooterProps {
  data: {
    id: string;
    type: 'footer';
    backgroundColor?: string;
    textColor?: string;
    instagram: {
      url: string;
      text: string;
    };
    copyright: string;
    legalLink: {
      text: string;
      href: string;
    };
  };
}

function Footer({ data }: FooterProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <footer className="py-8 border-t" style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href={data.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: data.textColor }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
              <span>{data.instagram.text}</span>
            </a>
            <small
              className="text-xs"
              style={{ color: data.textColor }}
            >
              {data.copyright}
            </small>
          </div>

          <div className="text-center md:text-right">
            <a
              href={data.legalLink.href}
              className="text-xs hover:underline"
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
