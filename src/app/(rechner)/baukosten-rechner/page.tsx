import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { BaukostenForm } from './baukosten-form';

const FAQS = [
  { question: 'Was kostet ein Haus bauen 2026?', answer: 'Die reinen Baukosten liegen 2026 bei ca. 1.800-3.500 &euro;/m&sup2; je nach Ausstattung und Bauweise. F&uuml;r ein Einfamilienhaus mit 140 m&sup2; in mittlerer Ausstattung sind das ca. 308.000 &euro; Baukosten. Mit Grundst&uuml;ck, Nebenkosten und Au&szlig;enanlagen rechnet man mit 450.000-600.000 &euro; Gesamtkosten.' },
  { question: 'Was ist g&uuml;nstiger: Massivhaus oder Fertighaus?', answer: 'Fertighaus ist im Schnitt 10-15% g&uuml;nstiger als Massivbau. Daf&uuml;r bietet ein Massivhaus h&ouml;heren Wiederverkaufswert, besseren Schallschutz und l&auml;ngere Lebensdauer. Die Bauzeit ist beim Fertighaus deutlich k&uuml;rzer (Aufbau in 1-2 Tagen vs. Monate).' },
  { question: 'Was sind Baunebenkosten?', answer: 'Baunebenkosten umfassen Architektenhonorar (ca. 10-15%), Statik, Baugenehmigung, Vermessung, Baustrom/-wasser, Versicherungen und Gutachten. Sie machen ca. 15-20% der reinen Baukosten aus und werden oft untersch&auml;tzt.' },
  { question: 'Lohnt sich ein Keller?', answer: 'Ein Keller kostet ca. 40.000-60.000 &euro; zus&auml;tzlich, schafft aber 40-60 m&sup2; zus&auml;tzliche Nutzfl&auml;che. Pro m&sup2; ist Kellerfl&auml;che damit deutlich g&uuml;nstiger als Wohnfl&auml;che. Ohne Keller braucht man ggf. einen gr&ouml;&szlig;eren Hauswirtschaftsraum und externen Stauraum.' },
  { question: 'Wie berechnet man die Baukosten pro Quadratmeter?', answer: 'Die Baukosten pro m&sup2; beziehen sich auf die Wohnfl&auml;che und umfassen die Kostengruppen 300 (Baukonstruktion) und 400 (Technische Anlagen) nach DIN 276. Grundst&uuml;ck, Au&szlig;enanlagen und Baunebenkosten kommen extra dazu.' },
];

export const metadata: Metadata = {
  title: 'Baukosten Rechner 2026 — Hausbau Kosten berechnen',
  description: 'Berechnen Sie die Baukosten f\u00fcr Ihr Haus. Kosten pro m\u00b2, Massiv vs. Fertighaus, Keller, Garage und Baunebenkosten.',
  keywords: ['Baukosten Rechner', 'Hausbau Kosten', 'Baukosten pro qm', 'Was kostet Haus bauen', 'Baukosten 2026'],
  alternates: { canonical: '/baukosten-rechner' },
};

export default function BaukostenRechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Baukosten Rechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Baukosten Rechner 2026</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie die Baukosten f&uuml;r Ihr Haus &mdash; nach Ausstattung, Bauweise und Region.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Baukosten Rechner 2026" url="/baukosten-rechner" description="Hausbaukosten berechnen: pro m\u00b2, Massiv vs. Fertighaus, mit Keller und Nebenkosten." />
      <BaukostenForm />

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-text">Baukosten pro m&sup2; nach Ausstattung (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-surface-sunken">
                <th className="px-4 py-2 text-left text-text font-medium">Ausstattung</th>
                <th className="px-4 py-2 text-right text-text font-medium">Massivhaus</th>
                <th className="px-4 py-2 text-right text-text font-medium">Fertighaus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-t border-border"><td className="px-4 py-2">Einfach</td><td className="px-4 py-2 text-right font-currency">1.800 &euro;/m&sup2;</td><td className="px-4 py-2 text-right font-currency">1.600 &euro;/m&sup2;</td></tr>
              <tr className="border-t border-border bg-accent-50/20 dark:bg-accent-900/5"><td className="px-4 py-2 font-medium">Mittel (Standard)</td><td className="px-4 py-2 text-right font-currency font-medium">2.200 &euro;/m&sup2;</td><td className="px-4 py-2 text-right font-currency font-medium">2.000 &euro;/m&sup2;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Gehoben</td><td className="px-4 py-2 text-right font-currency">2.800 &euro;/m&sup2;</td><td className="px-4 py-2 text-right font-currency">2.500 &euro;/m&sup2;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Luxus</td><td className="px-4 py-2 text-right font-currency">3.500 &euro;/m&sup2;</td><td className="px-4 py-2 text-right font-currency">3.200 &euro;/m&sup2;</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-text-muted">
          Durchschnittswerte f&uuml;r Deutschland 2025/2026 inkl. KG 300+400 nach DIN 276.
          Regionale Abweichungen: l&auml;ndliche Gebiete ca. -15%, Gro&szlig;st&auml;dte ca. +25%.
        </p>
      </section>

      <FAQSection faqs={FAQS} className="mt-8" />
      <RelatedCalculators currentSlug="baukosten-rechner" className="mt-8" />
    </div>
  );
}
