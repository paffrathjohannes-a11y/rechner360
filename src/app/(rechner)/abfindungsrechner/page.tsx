import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AbfindungsForm } from './abfindungs-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

const FAQS = [
  { question: 'Was ist die Fünftelregelung?', answer: 'Die Fünftelregelung (§ 34 EStG) ist eine steuerliche Vergünstigung für außerordentliche Einkünfte wie Abfindungen. Dabei wird die Steuer so berechnet, als würde die Abfindung auf 5 Jahre verteilt. Das glättet die Progression und senkt die Steuerlast oft erheblich.' },
  { question: 'Wie viel Steuer zahlt man auf eine Abfindung?', answer: 'Der effektive Steuersatz auf eine Abfindung hängt vom regulären Einkommen und der Höhe der Abfindung ab. Bei einem Jahresgehalt von 40.000 € und 20.000 € Abfindung liegt der effektive Steuersatz dank Fünftelregelung typischerweise bei 15-25%.' },
  { question: 'Muss der Arbeitgeber die Fünftelregelung anwenden?', answer: 'Seit 2025 wendet der Arbeitgeber die Fünftelregelung nicht mehr im Lohnsteuerabzug an. Die Vergünstigung wird erst über die Einkommensteuererklärung gewährt. Der Arbeitgeber führt zunächst die volle Steuer ab.' },
  { question: 'Ist eine Abfindung sozialversicherungspflichtig?', answer: 'Nein, auf Abfindungen fallen keine Sozialversicherungsbeiträge an. Es wird nur Lohnsteuer (ggf. mit Fünftelregelung), Solidaritätszuschlag und ggf. Kirchensteuer fällig.' },
  { question: 'Wie hoch ist die übliche Abfindung?', answer: 'Die Faustformel lautet: 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr. Bei 10 Jahren und 4.000 € Bruttogehalt wären das 20.000 €. Gesetzlich gibt es aber keinen festen Anspruch — die Höhe ist Verhandlungssache.' },
  { question: 'Hat man einen Anspruch auf Abfindung?', answer: 'Einen generellen gesetzlichen Anspruch gibt es nicht. Ausnahmen: Abfindungsangebot im Kündigungsschutzprozess (§ 1a KSchG), Sozialplan, Aufhebungsvertrag oder gerichtlicher Vergleich. In der Praxis werden die meisten Abfindungen verhandelt.' },
  { question: 'Wirkt sich eine Abfindung auf das Arbeitslosengeld aus?', answer: 'Eine Abfindung führt nicht automatisch zu einer Sperrzeit beim Arbeitslosengeld. Kritisch wird es, wenn die Kündigungsfrist nicht eingehalten wird — dann kann die Agentur für Arbeit das ALG I um die verkürzte Frist ruhen lassen.' },
];

export const metadata: Metadata = {
  title: 'Abfindungsrechner 2026 — Netto-Abfindung mit Fünftelregelung',
  description: 'Berechnen Sie Ihre Netto-Abfindung mit der Fünftelregelung. Steuerersparnis, effektiver Steuersatz und Vergleich.',
  keywords: ['Abfindungsrechner', 'Abfindung Steuer', 'Fünftelregelung', 'Netto Abfindung', 'Abfindung berechnen'],
  alternates: { canonical: '/abfindungsrechner' },
};

export default function AbfindungsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="abfindungsrechner"
      title="Abfindungsrechner 2026"
      subtitle="Berechnen Sie Ihre Netto-Abfindung mit der Fünftelregelung (§ 34 EStG)."
      jsonLd={{
        name: 'Abfindungsrechner 2026',
        url: '/abfindungsrechner',
        description: 'Netto-Abfindung mit Fünftelregelung berechnen.',
      }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.abfindungsrechner.headline} offers={affiliateOffersBySlug.abfindungsrechner.offers} />}
    >
      <AbfindungsForm />
    </CalculatorPageLayout>
  );
}
