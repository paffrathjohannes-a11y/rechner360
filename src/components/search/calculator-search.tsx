'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { RECHNER, RECHNER_CATEGORIES } from '@/lib/utils/constants';
import { getIcon, getColors } from '@/lib/utils/icons';
import { cn } from '@/lib/utils/cn';

interface CalculatorSearchProps {
  variant: 'hero' | 'header' | 'mobile';
  onSelect?: () => void;
}

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  categoryTitle: string;
  icon: string;
  color: string;
  score: number;
}

function searchCalculators(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const tokens = query.toLowerCase().trim().split(/\s+/);

  const results: SearchResult[] = [];

  for (const r of RECHNER) {
    const cat = RECHNER_CATEGORIES.find((c) => c.id === r.category);
    const searchStr = `${r.title} ${r.shortTitle} ${r.description} ${cat?.title || ''}`.toLowerCase();

    const allMatch = tokens.every((t) => searchStr.includes(t));
    if (!allMatch) continue;

    const titleLower = r.title.toLowerCase();
    let score = 0;
    if (titleLower === query.toLowerCase()) score = 100;
    else if (titleLower.includes(query.toLowerCase())) score = 80;
    else if (tokens.every((t) => titleLower.includes(t))) score = 60;
    else score = 40;

    if (r.popular) score += 10;

    results.push({
      slug: r.slug,
      title: r.title,
      category: r.category,
      categoryTitle: cat?.title || '',
      icon: r.icon,
      color: r.color,
      score,
    });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

export function CalculatorSearch({ variant, onSelect }: CalculatorSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const updateResults = useCallback((q: string) => {
    const r = searchCalculators(q);
    setResults(r);
    setIsOpen(r.length > 0);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleNavigate(slug: string) {
    setIsOpen(false);
    setQuery('');
    onSelect?.();
    router.push(`/${slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleNavigate(results[activeIndex].slug);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  const isHero = variant === 'hero';
  const isMobile = variant === 'mobile';

  return (
    <div ref={containerRef} className={cn('relative', isHero && 'mx-auto max-w-lg')}>
      <div
        className={cn(
          'relative flex items-center gap-2 border border-border bg-surface transition-all duration-200',
          isHero && 'rounded-full px-5 py-3.5 shadow-sm focus-within:shadow-md focus-within:border-primary-300 dark:focus-within:border-primary-700',
          variant === 'header' && 'rounded-lg px-3 py-2 w-48 focus-within:w-72 duration-300',
          isMobile && 'rounded-xl px-4 py-3',
        )}
      >
        <Search className={cn('shrink-0 text-text-muted', isHero ? 'h-5 w-5' : 'h-4 w-4')} />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            updateResults(e.target.value);
          }}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder="Rechner suchen..."
          aria-label="Rechner suchen"
          role="searchbox"
          className={cn(
            'flex-1 bg-transparent outline-none text-text placeholder:text-text-muted',
            isHero ? 'text-base' : 'text-sm',
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
            className="shrink-0 text-text-muted hover:text-text transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg animate-result-in overflow-hidden',
            isHero && 'left-0 right-0',
            variant === 'header' && 'right-0 w-72',
          )}
        >
          <ul role="listbox">
            {results.map((r, i) => {
              const Icon = getIcon(r.icon);
              const colors = getColors(r.color);
              return (
                <li key={r.slug} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(r.slug)}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer',
                      i === activeIndex
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : 'hover:bg-surface-raised',
                    )}
                  >
                    <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', colors.bg)}>
                      <Icon className={cn('h-4.5 w-4.5', colors.icon)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{r.title}</p>
                      <p className="text-xs text-text-muted truncate">{r.categoryTitle}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
