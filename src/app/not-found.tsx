import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Home, Search, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { CalculatorSearch } from '@/components/search/calculator-search';
import { RECHNER, RECHNER_CATEGORIES, getRechnerByCategory } from '@/lib/utils/constants';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  description:
    'Die angeforderte Seite existiert nicht. Durchsuchen Sie unsere 28 Online-Rechner oder wählen Sie einen beliebten Rechner aus.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/404' },
};

// Top-Rechner in einer festen Reihenfolge — die acht mit höchstem Traffic-Potenzial.
const TOP_SLUGS = [
  'brutto-netto-rechner',
  'gehaltsrechner',
  'kreditrechner',
  'tilgungsrechner',
  'rentenrechner',
  'kalorienrechner',
  'bmi-rechner',
  'einkommensteuer-rechner',
] as const;

export default function NotFound() {
  type RechnerItem = (typeof RECHNER)[number];
  const topRechner = TOP_SLUGS
    .map((slug) => RECHNER.find((r) => r.slug === slug))
    .filter((r): r is RechnerItem => Boolean(r));

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Hero */}
          <section className="text-center space-y-5">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <Calculator className="h-8 w-8" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary-600 tracking-wider uppercase">404 — Nicht gefunden</p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
                Diese Seite haben wir leider nicht
              </h1>
              <p className="text-text-secondary max-w-xl mx-auto">
                Die URL ist möglicherweise veraltet oder enthält einen Tippfehler.
                Nutzen Sie die Suche oder wählen Sie unten einen beliebten Rechner.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/">
                <Button variant="primary" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                  Zur Startseite
                </Button>
              </Link>
            </div>
          </section>

          {/* Suchfeld */}
          <section aria-labelledby="search-heading" className="space-y-3">
            <h2 id="search-heading" className="flex items-center gap-2 text-sm font-semibold text-text-secondary uppercase tracking-wider">
              <Search className="w-4 h-4" aria-hidden="true" />
              Rechner suchen
            </h2>
            <CalculatorSearch variant="mobile" />
          </section>

          {/* Top-Rechner */}
          <section aria-labelledby="top-heading" className="space-y-4">
            <h2 id="top-heading" className="flex items-center gap-2 text-sm font-semibold text-text-secondary uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              Beliebte Rechner
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {topRechner.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="block rounded-xl border border-border bg-surface p-4 hover:border-primary-300 hover:bg-surface-raised transition-all text-sm font-medium text-text"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Alle Kategorien */}
          <section aria-labelledby="categories-heading" className="space-y-5 pt-4 border-t border-border">
            <h2 id="categories-heading" className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Alle Kategorien
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {RECHNER_CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-2">
                  <h3 className="text-base font-semibold text-text">{cat.title}</h3>
                  <ul className="space-y-1.5">
                    {getRechnerByCategory(cat.id).map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/${r.slug}`}
                          className="text-sm text-text-secondary hover:text-primary-600 transition-colors"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
