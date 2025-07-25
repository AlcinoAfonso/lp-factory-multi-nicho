import { cn } from '@/lib/utils';
import { ButtonData } from '@/types/lp-config';
import { typography } from '@/config/typography';

export function Button({ text, href, variant = 'primary' }: ButtonData) {
  const customStyles =
    variant === 'primary' && href.includes('wa.me')
      ? { backgroundColor: '#FF6600', color: '#333333' }
      : {};

  return (
    <a
      href={href}
      className={cn(typography.button.base, typography.button.variants[variant])}
      style={customStyles}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {text}
    </a>
  );
}
