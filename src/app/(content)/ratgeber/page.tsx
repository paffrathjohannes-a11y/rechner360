import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';
import { RECHNER_CATEGORIES, getCategoryForRechner } from '@/lib/utils/constants';
import { getIcon, getColors } from '@/lib/utils/icons';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

export const metadata: Metadata = {
  title: 'Ratgeber — Finanztipps, Anleitungen & Guides 2026',
  description:
    'Alle Ratgeber von rechner360 auf einen Blick: Steuern, Baufinanzierung, Elterngeld, Rente, Versicherungen und mehr — verständlich erklärt, aktuell für 2026.',
  alternates: { canonical: '/ratgeber' },
};

function estimateReadingTime(article: (typeof RATGEBER_ARTIKEL)[number]): number {
  const words = article.sections.reduce((sum, s) => sum + s.content.split(/\s+/).length, 0) + article.intro.split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

type Category = (typeof RECHNER_CATEGORIES)[number];

interface GroupedArticles {
  category: Category;
  articles: (typeof RATGEBER_ARTIKEL)[number][];
}

export default function RatgeberPage() {
  // Sort: newest first
  const sortedAll = [...RATGEBER_ARTIKEL].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  const [featured, ...rest] = sortedAll;

  // Gruppiere nach Kategorie über relatedRechner
  const groups: GroupedArticles[] = RECHNER_CATEGORIES.map((cat) => ({
    category: cat,
    articles: rest.filter((a) => getCategoryForRechner(a.relatedRechner)?.id === cat.id),
  })).filter((g) => g.articles.length > 0);

  // Ungelistete Artikel ohne kategoriemäßigen relatedRechner
  const uncategorized = rest.filter((a) => !getCategoryForRechner(a.relatedRechner));

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section>
        <Badge variant="default" className="mb-4">
          <Sparkles className="mr-1 h-3 w-3" />
          {RATGEBER_ARTIKEL.length} Ratgeber · Aktuell für 2026
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
          Ratgeber & <span className="text-primary-600">Finanztipps</span>
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-relaxed">
          Verständliche Anleitungen zu Steuern, Baufinanzierung, Elterngeld, Rente, Versicherungen und mehr.
          Alle Artikel sind auf dem Stand 2026 und von Redakteuren geprüft.
        </p>

        {/* Kategorie-Anker-Chips */}
        {groups.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {groups.map((g) => {
              const CatIcon = getIcon(g.category.icon);
              const colors = getColors(g.category.color);
              return (
                <a
                  key={g.category.id}
                  href={`#ratgeber-${g.category.id}`}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5',
                    'text-sm text-text-secondary hover:text-text hover:border-primary-300 dark:hover:border-primary-700',
                    'transition-colors',
                  )}
                >
                  <CatIcon className={cn('h-3.5 w-3.5', colors.icon)} />
                  {g.category.title}
                  <span className="text-xs text-text-muted">({g.articles.length})</span>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* Featured Artikel */}
      {featured && (
        <section>
          <Link
            href={`/ratgeber/${featured.slug}`}
            className={cn(
              'group flex flex-col gap-4 rounded-2xl border p-6 sm:p-8',
              'border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50/50 to-surface dark:from-primary-950/20 dark:to-surface',
              'ring-1 ring-primary-100 dark:ring-primary-900/30',
              'shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5',
            )}
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-600 text-white font-medium px-2.5 py-0.5">
                <Sparkles className="h-3 w-3" />
                Neu
              </span>
              <span className="text-text-muted">
                {formatDate(featured.publishDate)} · {estimateReadingTime(featured)} Min. Lesezeit
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-text group-hover:text-primary-600 transition-colors">
              {featured.title}
            </h2>

            <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
              {featured.intro}
            </p>

            <div className="flex items-center gap-1.5 text-sm font-medium text-primary-600 pt-1">
              <span className="group-hover:underline">Artikel lesen</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </section>
      )}

      {/* Gruppen nach Kategorie */}
      {groups.map((group) => {
        const CatIcon = getIcon(group.category.icon);
        const colors = getColors(group.category.color);
        return (
          <section key={group.category.id} id={`ratgeber-${group.category.id}`} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-5">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', colors.bg)}>
                <CatIcon className={cn('h-5 w-5', colors.icon)} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">{group.category.title}</h2>
                <p className="text-sm text-text-secondary">{group.articles.length} Ratgeber</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.articles.map((artikel) => (
                <ArticleCard key={artikel.slug} article={artikel} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Weitere (uncategorized) */}
      {uncategorized.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30">
              <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text">Weitere Ratgeber</h2>
              <p className="text-sm text-text-secondary">{uncategorized.length} Artikel</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uncategorized.map((artikel) => (
              <ArticleCard key={artikel.slug} article={artikel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ArticleCard({ article }: { article: (typeof RATGEBER_ARTIKEL)[number] }) {
  const readingTime = estimateReadingTime(article);
  return (
    <Link
      href={`/ratgeber/${article.slug}`}
      className={cn(
        'group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5',
        'shadow-xs hover:shadow-md transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-primary-300 dark:hover:border-primary-700',
      )}
    >
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Clock className="h-3.5 w-3.5" />
        <span>{readingTime} Min.</span>
        <span className="text-text-muted/50">·</span>
        <span>
          {new Date(article.publishDate).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' })}
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
}
