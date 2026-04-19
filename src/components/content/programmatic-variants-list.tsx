import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

/**
 * Gemeinsame Mindestform einer programmatischen Variante.
 * Alle *PAGES Arrays in src/data/programmatic/ liefern zumindest diese Felder.
 */
export interface ProgrammaticVariantEntry {
  slug: string;
  title?: string;
  h1?: string;
  metaTitle?: string;
  indexable?: boolean;
}

interface ProgrammaticVariantsListProps {
  /** URL-Prefix ohne trailing slash, z.B. "/brutto-netto-rechner". */
  basePath: string;
  /** Varianten-Array (z.B. BRUTTO_NETTO_PAGES). */
  pages: ReadonlyArray<ProgrammaticVariantEntry>;
  /** Überschrift. Default: "Alle Varianten". */
  headline?: string;
  /** Optional: Intro-Text unter der Überschrift. */
  intro?: string;
  /** Optional: zusätzliche Klassen. */
  className?: string;
}

/**
 * Gibt alle indexierbaren Varianten einer Hub-Seite als Link-Liste aus.
 * Ziel: Google findet beim Crawl der Hub-Seite alle Varianten und stuft sie
 * höher ein als "nur in Sitemap". Behebt den "Gefunden — zurzeit nicht
 * indexiert"-Status, den GSC aktuell für viele Varianten meldet.
 *
 * Bewusst ALLE Links ausgeben (nicht nur die ersten 10) — das ist SEO-Standard
 * für Hub-Seiten mit programmatischen Unterseiten.
 */
export function ProgrammaticVariantsList({
  basePath,
  pages,
  headline = 'Alle Varianten',
  intro,
  className,
}: ProgrammaticVariantsListProps) {
  const indexableOnly = pages.filter((p) => p.indexable !== false);
  if (indexableOnly.length === 0) return null;

  return (
    <section className={cn('space-y-4', className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-text">{headline}</h2>
        {intro ? (
          <p className="text-text-secondary leading-relaxed">{intro}</p>
        ) : (
          <p className="text-text-secondary leading-relaxed">
            {indexableOnly.length} spezifische Varianten — direkt verlinkt, damit du
            die Berechnung für deine Situation findest.
          </p>
        )}
      </div>

      <ul
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2',
          'text-sm text-text-secondary',
        )}
      >
        {indexableOnly.map((p) => (
          <li key={p.slug}>
            <Link
              href={`${basePath}/${p.slug}`}
              className="hover:underline hover:text-primary-600 transition-colors"
            >
              {p.h1 || p.title || p.metaTitle || p.slug}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
