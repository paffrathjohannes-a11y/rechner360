import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RECHNER_CATEGORIES, getRechnerByCategory } from '@/lib/utils/constants';

export const metadata: Metadata = {
  title: 'Themen-Übersicht — alle Rechner-Kategorien auf rechner360',
  description:
    'Themen-Hub: Gehalt & Steuern, Immobilien & Finanzen, Vorsorge & Soziales, Alltag & Tools. Pro Kategorie eine Pillar-Page mit Rechnern, Begriffen und FAQs.',
  alternates: { canonical: '/themen' },
};

export default function ThemenOverviewPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Themen-Übersicht</h1>
        <p className="text-lg text-text-secondary">
          Vier Themenbereiche, jede mit eigener Pillar-Seite zur Vertiefung — von den
          offiziellen Steuerformeln bis zur Düsseldorfer Tabelle.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RECHNER_CATEGORIES.map((cat) => {
          const count = getRechnerByCategory(cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/themen/${cat.id}`}
              className="group block rounded-xl border border-border bg-surface p-6 hover:border-accent-500/30 hover:bg-surface-raised transition-all"
            >
              <h2 className="text-xl font-semibold text-text group-hover:text-accent-600 transition-colors">
                {cat.title}
              </h2>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">{cat.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-text-muted">{count} Rechner</span>
                <span className="inline-flex items-center gap-1 text-sm text-accent-600">
                  Zum Themen-Hub <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
