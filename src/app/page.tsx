import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TrustSignals } from '@/components/content/trust-signals';
import { OrganizationJsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { CategorySection } from '@/components/home/category-section';
import { CalculatorSearch } from '@/components/search/calculator-search';
import { RECHNER_CATEGORIES, getRechnerByCategory } from '@/lib/utils/constants';
import { NativeAdSlot } from '@/components/ads/native-ad-slot';
import { UsageCounter } from '@/components/home/usage-counter';
import { HeroCalculator } from '@/components/home/hero-calculator';
import { cn } from '@/lib/utils/cn';

const quickCalcs = [
  { label: '3.000 \u20AC brutto', href: '/brutto-netto-rechner/3000-euro-steuerklasse-1' },
  { label: '4.000 \u20AC brutto', href: '/brutto-netto-rechner/4000-euro-steuerklasse-1' },
  { label: '5.000 \u20AC brutto', href: '/brutto-netto-rechner/5000-euro-steuerklasse-1' },
  { label: '50.000 \u20AC Kredit', href: '/kreditrechner/50000-euro-kredit' },
  { label: '300.000 \u20AC Baufi', href: '/tilgungsrechner/300000-euro-baufinanzierung' },
];

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-50/50 to-surface dark:from-primary-950/20 dark:to-surface">
          <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-hero-in stagger-1">
                <Badge variant="default" className="mb-4">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Aktualisiert für 2026
                </Badge>
              </div>

              <h1 className="animate-hero-in stagger-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
                Alle Rechner.{' '}
                <span className="text-primary-600">Kostenlos.</span>{' '}
                <span className="text-accent-600">Präzise.</span>
              </h1>

              <p className="animate-hero-in stagger-3 mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Brutto-Netto, Gehalt, Kredit und mehr — berechnen Sie alles in Sekunden.
                Aktuell nach den offiziellen Steuerformeln 2026, völlig kostenlos und ohne Registrierung.
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

              {/* Quick Calc Chips */}
              <div className="animate-hero-in stagger-5 mt-6 flex flex-wrap justify-center gap-2">
                {quickCalcs.map((qc) => (
                  <Link
                    key={qc.href}
                    href={qc.href}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2',
                      'text-sm text-text-secondary font-medium',
                      'hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 hover:shadow-sm hover:scale-[1.03]',
                      'dark:hover:border-primary-700 dark:hover:bg-primary-900/20',
                      'active:scale-[0.97] transition-all duration-150',
                    )}
                  >
                    {qc.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Sections */}
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8 space-y-16">
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

        {/* Native Ad — between categories and trust signals */}
        <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
          <NativeAdSlot format="horizontal" />
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
