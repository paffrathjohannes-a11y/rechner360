import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { AbfindungsForm } from './abfindungs-form';

const FAQS = [
  { question: 'Was ist die Fünftelregelung?', answer: 'Die Fünftelregelung (§ 34 EStG) ist eine steuerliche Vergünstigung für außerordentliche Einkünfte wie Abfindungen. Dabei wird die Steuer so berechnet, als würde die Abfindung auf 5 Jahre verteilt. Das glättet die Progression und senkt die Steuerlast oft erheblich.' },
  { question: 'Wie viel Steuer zahlt man auf eine Abfindung?', answer: 'Der effektive Steuersatz auf eine Abfindung hängt vom regulären Einkommen und der Höhe der Abfindung ab. Bei einem Jahresgehalt von 40.000 € und 20.000 € Abfindung liegt der effektive Steuersatz dank Fünftelregelung typischerweise bei 15-25%.' },
  { question: 'Muss der Arbeitgeber die Fünftelregelung anwenden?', answer: 'Seit 2025 wendet der Arbeitgeber die Fünftelregelung nicht mehr im Lohnsteuerabzug an. Die Vergünstigung wird erst über die Einkommensteuererklärung gewährt. Der Arbeitgeber führt zunächst die volle Steuer ab.' },
  { question: 'Ist eine Abfindung sozialversicherungspflichtig?', answer: 'Nein, auf Abfindungen fallen keine Sozialversicherungsbeiträge an. Es wird nur Lohnsteuer (ggf. mit Fünftelregelung), Solidaritätszuschlag und ggf. Kirchensteuer fällig.' },
];

export const metadata: Metadata = {
  title: 'Abfindungsrechner 2026 — Netto-Abfindung mit F\u00fcnftelregelung',
  description: 'Berechnen Sie Ihre Netto-Abfindung mit der F\u00fcnftelregelung. Steuerersparnis, effektiver Steuersatz und Vergleich.',
  keywords: ['Abfindungsrechner', 'Abfindung Steuer', 'F\u00fcnftelregelung', 'Netto Abfindung', 'Abfindung berechnen'],
  alternates: { canonical: '/abfindungsrechner' },
};

export default function AbfindungsrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Abfindungsrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Abfindungsrechner 2026</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie Ihre Netto-Abfindung mit der Fünftelregelung (§ 34 EStG).</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Abfindungsrechner 2026" url="/abfindungsrechner" description="Netto-Abfindung mit F\u00fcnftelregelung berechnen." />
      <AbfindungsForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="abfindungsrechner" className="mt-8" />
    </div>
  );
}
