import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { RECHNER } from '@/lib/utils/constants';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-md space-y-6">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              <Calculator className="h-8 w-8" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text">Seite nicht gefunden</h1>
            <p className="mt-2 text-text-secondary">
              Die angeforderte Seite existiert nicht oder wurde verschoben.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="primary">Zur Startseite</Button>
            </Link>
            <Link href="/brutto-netto-rechner">
              <Button variant="secondary">Brutto Netto Rechner</Button>
            </Link>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-text-muted mb-3">Beliebte Rechner:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {RECHNER.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="text-sm text-primary-600 hover:underline"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
