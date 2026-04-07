import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { NebenkostenForm } from './nebenkosten-form';

const FAQS = [
  { question: 'Wie hoch sind die Kaufnebenkosten?', answer: 'Die Kaufnebenkosten betragen je nach Bundesland und Maklerkosten zwischen 7% und 15% des Kaufpreises. Die größten Posten sind Grunderwerbsteuer (3,5-6,5%), Notar (ca. 1,5%) und ggf. Makler (ca. 3-3,57%).' },
  { question: 'Welches Bundesland hat die niedrigste Grunderwerbsteuer?', answer: 'Bayern hat mit 3,5% die niedrigste Grunderwerbsteuer in Deutschland. Am höchsten ist sie in Brandenburg, NRW, Saarland und Schleswig-Holstein mit jeweils 6,5%.' },
  { question: 'Kann man Kaufnebenkosten finanzieren?', answer: 'Banken erwarten in der Regel, dass die Kaufnebenkosten aus Eigenkapital finanziert werden. Eine Finanzierung der Nebenkosten (110%-Finanzierung) ist möglich, führt aber zu deutlich höheren Zinsen und wird von vielen Banken abgelehnt.' },
  { question: 'Wer zahlt den Makler?', answer: 'Seit Dezember 2020 gilt das Bestellerprinzip beim Kauf: Die Maklerkosten werden in der Regel hälftig zwischen Käufer und Verkäufer geteilt. Der hier berechnete Betrag ist der Käuferanteil.' },
];

export const metadata: Metadata = {
  title: 'Nebenkostenrechner 2026 — Kaufnebenkosten Immobilie',
  description: 'Berechnen Sie die Kaufnebenkosten beim Immobilienkauf. Grunderwerbsteuer, Notar, Grundbuch und Maklerkosten nach Bundesland.',
  keywords: ['Nebenkostenrechner', 'Kaufnebenkosten', 'Grunderwerbsteuer', 'Immobilie kaufen Nebenkosten'],
  alternates: { canonical: '/nebenkostenrechner' },
};

export default function NebenkostenrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Nebenkostenrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Nebenkostenrechner 2026</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie die Kaufnebenkosten beim Immobilienkauf nach Bundesland.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Nebenkostenrechner 2026" url="/nebenkostenrechner" description="Kaufnebenkosten berechnen: Grunderwerbsteuer, Notar, Grundbuch, Makler." />
      <NebenkostenForm />

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-text">Grunderwerbsteuer nach Bundesland</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead><tr className="bg-surface-sunken"><th className="px-4 py-2 text-left text-text font-medium">Bundesland</th><th className="px-4 py-2 text-right text-text font-medium">Steuersatz</th></tr></thead>
            <tbody className="text-text-secondary">
              <tr className="border-t border-border bg-accent-50/20 dark:bg-accent-900/5"><td className="px-4 py-2 font-medium text-accent-600">Bayern</td><td className="px-4 py-2 text-right font-currency font-medium text-accent-600">3,5%</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Baden-Württemberg, Bremen, Niedersachsen, Rheinland-Pfalz, Sachsen-Anhalt, Thüringen</td><td className="px-4 py-2 text-right font-currency">5,0%</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Hamburg, Sachsen</td><td className="px-4 py-2 text-right font-currency">5,5%</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Berlin, Hessen, Mecklenburg-Vorpommern</td><td className="px-4 py-2 text-right font-currency">6,0%</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Brandenburg, NRW, Saarland, Schleswig-Holstein</td><td className="px-4 py-2 text-right font-currency">6,5%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <FAQSection faqs={FAQS} className="mt-8" />
      <RelatedCalculators currentSlug="nebenkostenrechner" className="mt-8" />
    </div>
  );
}
