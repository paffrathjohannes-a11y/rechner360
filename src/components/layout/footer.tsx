import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { RECHNER_CATEGORIES, getRechnerByCategory, SITE_NAME } from '@/lib/utils/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand + Legal */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-text">
                rechner<span className="text-primary-600">360</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Kostenlose Online-Rechner für Finanzen, Steuern und mehr.
              Präzise, aktuell und DSGVO-konform.
            </p>
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Rechtliches</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/ueber-uns" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">
                    Über uns
                  </Link>
                </li>
                <li>
                  <Link href="/ratgeber" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">
                    Ratgeber
                  </Link>
                </li>
                <li>
                  <Link href="/impressum" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">
                    Datenschutzerklärung
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Category Columns */}
          {RECHNER_CATEGORIES.map((cat) => {
            const calculators = getRechnerByCategory(cat.id);
            return (
              <div key={cat.id}>
                <h3 className="text-sm font-semibold text-text mb-3">{cat.title}</h3>
                <ul className="space-y-2">
                  {calculators.map((r) => (
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
            );
          })}
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} {SITE_NAME}. Alle Angaben ohne Gewähr.
            Die Berechnungen ersetzen keine professionelle Steuer- oder Finanzberatung.
          </p>
          <p className="text-xs text-text-muted">
            Stand: {currentYear} · Letzte Aktualisierung der Steuerformeln {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
