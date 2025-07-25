export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string;
    container: string;
  };
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'Default',
    colors: {
      primary: '#ff6600',
      secondary: '#333333',
      background: '#ffffff',
      text: '#1a1a1a',
      accent: '#007bff',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    spacing: {
      section: '3rem',
      container: '75rem',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#ff6600',
      secondary: '#ffffff',
      background: '#1a1a1a',
      text: '#ffffff',
      accent: '#00d4ff',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    spacing: {
      section: '3rem',
      container: '75rem',
    },
  },
  corporate: {
    name: 'Corporate',
    colors: {
      primary: '#0066cc',
      secondary: '#004499',
      background: '#f8f9fa',
      text: '#212529',
      accent: '#28a745',
    },
    fonts: {
      heading: 'Roboto, sans-serif',
      body: 'Open Sans, sans-serif',
    },
    spacing: {
      section: '4rem',
      container: '80rem',
    },
  },
  startup: {
    name: 'Startup',
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      background: '#fafaf9',
      text: '#18181b',
      accent: '#10b981',
    },
    fonts: {
      heading: 'Cal Sans, Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    spacing: {
      section: '5rem',
      container: '70rem',
    },
  },
};
