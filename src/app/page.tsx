import { TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TrustSignals } from '@/components/content/trust-signals';
import { OrganizationJsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { CategorySection } from '@/components/home/category-section';
import { CalculatorSearch } from '@/components/search/calculator-search';
import { RECHNER_CATEGORIES, getRechnerByCategory } from '@/lib/utils/constants';
import { UsageCounter } from '@/components/home/usage-counter';
import { HeroCalculator } from '@/components/home/hero-calculator';


export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-50/50 to-surface dark:from-primary-950/20 dark:to-surface">
          <div className="mx-auto max-w-[var(--container-max)] px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-hero-in stagger-1">
                <Badge variant="default" className="mb-4">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Aktualisiert für 2026
                </Badge>
              </div>

              <h1 className="animate-hero-in stagger-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
                26 Rechner.{' '}
                <span className="text-primary-600">Keine Daten.</span>{' '}
                <span className="text-accent-600">Keine Registrierung.</span>
              </h1>

              <p className="animate-hero-in stagger-3 mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Brutto-Netto, Kredit, PKV, Kfz und mehr — alles in Sekunden berechnet.
                Komplett kostenlos, ohne Account, und alle Berechnungen laufen nur in Ihrem Browser.
              </p>

              {/* Search */}
              <div className="animate-hero-in stagger-4 mt-8">
                <CalculatorSearch variant="hero" />
              </div>

              {/* Hero Calculator — Brutto-Netto sofort nutzbar */}
              <div className="animate-hero-in stagger-5 mt-8">
                <HeroCalculator />
              </div>

              {/* Usage Counter */}
              <div className="animate-hero-in stagger-5 mt-6">
                <UsageCounter />
              </div>

            </div>
          </div>
        </section>

        {/* Category Sections */}
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-10 sm:px-6 lg:px-8 space-y-12">
          {RECHNER_CATEGORIES.map((cat) => (
            <CategorySection
              key={cat.id}
              id={cat.id}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
              color={cat.color}
              calculators={getRechnerByCategory(cat.id)}
            />
          ))}
        </div>

        {/* Trust Signals */}
        <section className="mx-auto max-w-[var(--container-max)] px-4 pb-16 sm:px-6 lg:px-8">
          <TrustSignals />
        </section>
      </main>

      <Footer />
    </>
  );
}
