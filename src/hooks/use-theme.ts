import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const DEFAULT_THEME: Theme = 'dark';
const THEME_STORAGE_KEY = 'site-theme';
const THEME_COLOR_BY_MODE: Record<Theme, string> = {
  dark: '#080706',
  light: '#f4efe4',
};

const isTheme = (value: string | null | undefined): value is Theme =>
  value === 'dark' || value === 'light';

const readStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

const readThemeFromDocument = (): Theme | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const currentTheme = document.documentElement.dataset.theme;
  return isTheme(currentTheme) ? currentTheme : null;
};

const getSystemTheme = (): Theme | null => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const resolveInitialTheme = (): Theme =>
  readThemeFromDocument() ?? readStoredTheme() ?? getSystemTheme() ?? DEFAULT_THEME;

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  themeColorMeta?.setAttribute('content', THEME_COLOR_BY_MODE[theme]);
};

const storeTheme = (theme: Theme) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) {
        return;
      }

      setTheme(event.matches ? 'light' : 'dark');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
      storeTheme(nextTheme);
      return nextTheme;
    });
  };

  return { theme, toggleTheme };
};
