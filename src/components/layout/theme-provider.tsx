'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  themes: string[];
  systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

const STORAGE_KEY = 'theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  [key: string]: unknown;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    try {
      return (localStorage.getItem(STORAGE_KEY) as Theme) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme());

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  const applyTheme = useCallback(
    (resolved: 'light' | 'dark') => {
      const d = document.documentElement;
      const disable = disableTransitionOnChange ? disableAnimation() : null;

      if (attribute === 'class') {
        d.classList.remove('light', 'dark');
        d.classList.add(resolved);
      } else {
        d.setAttribute(attribute, resolved);
      }

      d.style.colorScheme = resolved;
      disable?.();
    },
    [attribute, disableTransitionOnChange]
  );

  const setTheme = useCallback(
    (value: Theme) => {
      setThemeState(value);
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {}
    },
    []
  );

  // Apply theme on mount and when it changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;
    const mq = window.matchMedia(MEDIA_QUERY);
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [enableSystem]);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setThemeState((e.newValue as Theme) || defaultTheme);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [defaultTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      themes: enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'],
      systemTheme,
    }),
    [theme, setTheme, resolvedTheme, enableSystem, systemTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: 'system' as Theme, setTheme: () => {}, resolvedTheme: 'light' as const, themes: ['light', 'dark', 'system'], systemTheme: 'light' as const };
  }
  return context;
}

function disableAnimation() {
  const style = document.createElement('style');
  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
    )
  );
  document.head.appendChild(style);
  return () => {
    window.getComputedStyle(document.body);
    setTimeout(() => document.head.removeChild(style), 1);
  };
}
