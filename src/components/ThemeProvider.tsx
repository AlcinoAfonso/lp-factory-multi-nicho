'use client';

import { createContext, useContext, useEffect } from 'react';
import { Theme, themes } from '@/config/themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'default',
}: {
  children: React.ReactNode;
  defaultTheme?: string;
}) {
  const theme = themes[defaultTheme] || themes.default;

  useEffect(() => {
    // Aplicar variáveis CSS do tema
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    root.style.setProperty('--spacing-section', theme.spacing.section);
    root.style.setProperty('--spacing-container', theme.spacing.container);
  }, [theme]);

  const setTheme = (themeName: string) => {
    // Para implementar troca dinâmica de tema
    console.log('Theme change to:', themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
