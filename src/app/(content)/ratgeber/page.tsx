import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';
import { cn } from '@/lib/utils/cn';

export const metadata: Metadata = {
  title: 'Ratgeber \u2014 Finanztipps & Anleitungen',
  description: 'Ratgeber zu Steuern, Finanzen und mehr. Steuerklasse wechseln, Baufinanzierung Tipps, Elterngeld beantragen.',
  alternates: { canonical: '/ratgeber' },
};

export default function RatgeberPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Ratgeber</h1>
        <p className="mt-2 text-text-secondary text-lg">Anleitungen und Tipps zu Steuern, Finanzen und mehr.</p>
      </div>

      <div className="space-y-4">
        {RATGEBER_ARTIKEL.map((artikel) => (
          <Link
            key={artikel.slug}
            href={`/ratgeber/${artikel.slug}`}
            className={cn(
              'block rounded-xl border border-border p-6',
              'hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md',
              'transition-all duration-150 group',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-text group-hover:text-primary-600 transition-colors">{artikel.title}</h2>
                <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{artikel.intro.slice(0, 200)}...</p>
                <p className="mt-2 text-xs text-text-muted">{new Date(artikel.publishDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-text-muted group-hover:text-primary-600 transition-colors shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
