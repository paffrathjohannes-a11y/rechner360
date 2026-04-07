import Link from 'next/link';
import { Calculator, Wallet, Landmark, Home, HeartPulse, Baby, ShieldCheck, Percent, Building, TrendingDown, Banknote, HardHat, Users, Scale, Flame, MapPin, Milestone, ArrowRight, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TrustSignals } from '@/components/content/trust-signals';
import { OrganizationJsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { RECHNER } from '@/lib/utils/constants';
import { cn } from '@/lib/utils/cn';

const iconMap: Record<string, typeof Calculator> = {
  calculator: Calculator,
  wallet: Wallet,
  landmark: Landmark,
  home: Home,
  'heart-pulse': HeartPulse,
  'baby': Baby,
  'shield-check': ShieldCheck,
  'percent': Percent,
  'building': Building,
  'trending-down': TrendingDown,
  'banknote': Banknote,
  'hard-hat': HardHat,
  'users': Users,
  'scale': Scale,
  'flame': Flame,
  'trending-up': TrendingUp,
  'map-pin': MapPin,
  'milestone': Milestone,
  'receipt': Receipt,
  'briefcase': Briefcase,
};

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  primary: {
    bg: 'bg-primary-50 dark:bg-primary-900/20',
    icon: 'text-primary-600 dark:text-primary-400',
    border: 'hover:border-primary-300 dark:hover:border-primary-700',
  },
  accent: {
    bg: 'bg-accent-50 dark:bg-accent-900/20',
    icon: 'text-accent-600 dark:text-accent-400',
    border: 'hover:border-accent-300 dark:hover:border-accent-700',
  },
};

const quickCalcs = [
  { label: '3.000 € brutto', href: '/brutto-netto-rechner/3000-euro-steuerklasse-1' },
  { label: '4.000 € brutto', href: '/brutto-netto-rechner/4000-euro-steuerklasse-1' },
  { label: '5.000 € brutto', href: '/brutto-netto-rechner/5000-euro-steuerklasse-1' },
  { label: '50.000 € Kredit', href: '/kreditrechner/50000-euro-kredit' },
  { label: '300.000 € Baufi', href: '/tilgungsrechner/300000-euro-baufinanzierung' },
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
              <Badge variant="default" className="mb-4">
                <TrendingUp className="mr-1 h-3 w-3" />
                Aktualisiert für 2026
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
                Alle Rechner.{' '}
                <span className="text-primary-600">Kostenlos.</span>{' '}
                <span className="text-accent-600">Präzise.</span>
              </h1>

              <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Brutto-Netto, Gehalt, Kredit und mehr — berechnen Sie alles in Sekunden.
                Aktuell nach den offiziellen Steuerformeln 2026, völlig kostenlos und ohne Registrierung.
              </p>

              {/* Quick Calc Chips */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {quickCalcs.map((qc) => (
                  <Link
                    key={qc.href}
                    href={qc.href}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2',
                      'text-sm text-text-secondary font-medium',
                      'hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50',
                      'dark:hover:border-primary-700 dark:hover:bg-primary-900/20',
                      'transition-all duration-150',
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

        {/* Popular Calculators */}
        <section className="mx-auto max-w-[var(--container-max)] px-4 pt-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RECHNER.filter((r) => r.popular).map((r) => {
              const Icon = iconMap[r.icon] || Calculator;
              const colors = colorMap[r.color] || colorMap.primary;

              return (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className={cn(
                    'group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6',
                    'shadow-xs hover:shadow-md transition-all duration-200',
                    'hover:-translate-y-0.5',
                    colors.border,
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', colors.bg)}>
                      <Icon className={cn('h-6 w-6', colors.icon)} />
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-muted group-hover:text-primary-600 transition-colors" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-text">{r.title}</h2>
                    <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                      {r.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-2">
                    <span className="text-sm font-medium text-primary-600 group-hover:underline">
                      Jetzt berechnen
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* More Calculators — compact */}
        {RECHNER.filter((r) => !r.popular).length > 0 && (
          <section className="mx-auto max-w-[var(--container-max)] px-4 pt-8 pb-16 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-text mb-4">Weitere Rechner</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {RECHNER.filter((r) => !r.popular).map((r) => {
                const Icon = iconMap[r.icon] || Calculator;
                return (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl border border-border bg-surface p-4',
                      'hover:border-primary-300 dark:hover:border-primary-700 hover:bg-surface-raised',
                      'transition-all duration-150',
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-sunken text-text-muted">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{r.title}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary-600 transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Trust Signals */}
        <section className="mx-auto max-w-[var(--container-max)] px-4 pb-16 sm:px-6 lg:px-8">
          <TrustSignals />
        </section>
      </main>

      <Footer />
    </>
  );
}
