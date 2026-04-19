import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';
import { cn } from '@/lib/utils/cn';

// Top 6 kuratierte Ratgeber — Themen mit hoher Relevanz und Traffic-Potenzial
const FEATURED_SLUGS = [
  'steuererklaerung-tipps-2026',
  'baufinanzierung-tipps',
  'private-altersvorsorge',
  'gehaltserhoehung-verhandeln',
  'pkv-gkv-vergleich',
  'etf-sparplan-anfaenger',
] as const;

function estimateReadingTime(article: (typeof RATGEBER_ARTIKEL)[number]): number {
  const words = article.sections.reduce((sum, s) => sum + s.content.split(/\s+/).length, 0) + article.intro.split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export function FeaturedRatgeber() {
  const featured = FEATURED_SLUGS
    .map((slug) => RATGEBER_ARTIKEL.find((a) => a.slug === slug))
    .filter((a): a is (typeof RATGEBER_ARTIKEL)[number] => Boolean(a));

  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="ratgeber-heading">
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30">
            <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 id="ratgeber-heading" className="text-xl font-semibold text-text">Ratgeber & Finanztipps</h2>
            <p className="text-sm text-text-secondary">
              Verständlich erklärt — Steuern, Vorsorge, Immobilien und mehr.
            </p>
          </div>
        </div>
        <Link
          href="/ratgeber"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Alle Ratgeber ({RATGEBER_ARTIKEL.length})
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((article) => {
          const readingTime = estimateReadingTime(article);
          return (
            <Link
              key={article.slug}
              href={`/ratgeber/${article.slug}`}
              className={cn(
                'group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5',
                'shadow-xs hover:shadow-md transition-all duration-200',
                'hover:-translate-y-0.5 hover:border-primary-300 dark:hover:border-primary-700',
              )}
            >
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Clock className="h-3.5 w-3.5" />
                <span>{readingTime} Min. Lesezeit</span>
                <span className="text-text-muted/50">·</span>
                <span>
                  {new Date(article.publishDate).toLocaleDateString('de-DE', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h3 className="text-base font-semibold text-text group-hover:text-primary-600 transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
                {article.intro}
              </p>

              <div className="flex items-center gap-1.5 text-sm font-medium text-primary-600 pt-1">
                <span className="group-hover:underline">Weiterlesen</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
