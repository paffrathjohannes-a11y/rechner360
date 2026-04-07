'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';
import { RECHNER } from '@/lib/utils/constants';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils/cn';

// Top 5 im Desktop-Nav direkt sichtbar, Rest im Dropdown
const TOP_NAV = RECHNER.filter((r) => r.popular).slice(0, 5);
const MORE_NAV = RECHNER.filter((r) => !TOP_NAV.includes(r));

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

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
        <div className="hidden lg:flex items-center gap-1">
          {TOP_NAV.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className={cn(
                'px-3 py-2 text-sm font-medium text-text-secondary rounded-lg',
                'hover:text-text hover:bg-surface-raised transition-colors duration-150',
              )}
            >
              {r.shortTitle}
            </Link>
          ))}
          {MORE_NAV.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary rounded-lg',
                  'hover:text-text hover:bg-surface-raised transition-colors duration-150 cursor-pointer',
                )}
              >
                Mehr
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-border bg-surface shadow-lg animate-result-in z-50">
                  <div className="py-2">
                    {MORE_NAV.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/${r.slug}`}
                        className="block px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-surface-raised transition-colors"
                      >
                        {r.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text hover:bg-surface-raised transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Men\u00fc schlie\u00dfen' : 'Men\u00fc \u00f6ffnen'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-surface animate-result-in">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {RECHNER.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-secondary rounded-lg',
                  'hover:text-text hover:bg-surface-raised transition-colors',
                )}
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
