export interface ComponentVariant {
  name: string;
  className: string;
  styles?: React.CSSProperties;
}

export const heroVariants: ComponentVariant[] = [
  {
    name: 'default',
    className: 'hero-default',
  },
  {
    name: 'centered',
    className: 'hero-centered',
  },
  {
    name: 'reversed',
    className: 'hero-reversed',
  },
  {
    name: 'fullwidth',
    className: 'hero-fullwidth',
  },
];

export const buttonVariants: ComponentVariant[] = [
  {
    name: 'primary',
    className: 'btn-primary',
  },
  {
    name: 'secondary',
    className: 'btn-secondary',
  },
  {
    name: 'outline',
    className: 'btn-outline',
  },
  {
    name: 'ghost',
    className: 'btn-ghost',
  },
  {
    name: 'gradient',
    className: 'btn-gradient',
  },
];

export const sectionVariants: ComponentVariant[] = [
  {
    name: 'default',
    className: 'section-default',
  },
  {
    name: 'wave',
    className: 'section-wave',
  },
  {
    name: 'angle',
    className: 'section-angle',
  },
  {
    name: 'curve',
    className: 'section-curve',
  },
];
