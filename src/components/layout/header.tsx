'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { MegaMenu } from './mega-menu';
import { MobileNav } from './mobile-nav';
import { CalculatorSearch } from '@/components/search/calculator-search';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  const closeMegaImmediate = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setMegaOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-text hover:text-primary-600 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Calculator className="h-4.5 w-4.5" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            rechner<span className="text-primary-600">360</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg cursor-pointer',
                'transition-colors duration-150',
                megaOpen
                  ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-text-secondary hover:text-text hover:bg-surface-raised',
              )}
            >
              Alle Rechner
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', megaOpen && 'rotate-180')} />
            </button>
          </div>

          {/* Search */}
          <CalculatorSearch variant="header" />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-raised transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Desktop Mega Menu */}
      {megaOpen && (
        <div
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          <MegaMenu onClose={closeMegaImmediate} />
        </div>
      )}

      {/* Mobile Nav */}
      {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
