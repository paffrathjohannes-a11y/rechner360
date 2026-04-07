import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { AbfindungsForm } from './abfindungs-form';

const FAQS = [
  { question: 'Was ist die F&uuml;nftelregelung?', answer: 'Die F&uuml;nftelregelung (&sect; 34 EStG) ist eine steuerliche Verg&uuml;nstigung f&uuml;r au&szlig;erordentliche Eink&uuml;nfte wie Abfindungen. Dabei wird die Steuer so berechnet, als w&uuml;rde die Abfindung auf 5 Jahre verteilt. Das gl&auml;ttet die Progression und senkt die Steuerlast oft erheblich.' },
  { question: 'Wie viel Steuer zahlt man auf eine Abfindung?', answer: 'Der effektive Steuersatz auf eine Abfindung h&auml;ngt vom regul&auml;ren Einkommen und der H&ouml;he der Abfindung ab. Bei einem Jahresgehalt von 40.000 &euro; und 20.000 &euro; Abfindung liegt der effektive Steuersatz dank F&uuml;nftelregelung typischerweise bei 15-25%.' },
  { question: 'Muss der Arbeitgeber die F&uuml;nftelregelung anwenden?', answer: 'Seit 2025 wendet der Arbeitgeber die F&uuml;nftelregelung nicht mehr im Lohnsteuerabzug an. Die Verg&uuml;nstigung wird erst &uuml;ber die Einkommensteuererkl&auml;rung gew&auml;hrt. Der Arbeitgeber f&uuml;hrt zun&auml;chst die volle Steuer ab.' },
  { question: 'Ist eine Abfindung sozialversicherungspflichtig?', answer: 'Nein, auf Abfindungen fallen keine Sozialversicherungsbeitr&auml;ge an. Es wird nur Lohnsteuer (ggf. mit F&uuml;nftelregelung), Solidarit&auml;tszuschlag und ggf. Kirchensteuer f&auml;llig.' },
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
        <p className="text-text-secondary text-lg">Berechnen Sie Ihre Netto-Abfindung mit der F&uuml;nftelregelung (&sect; 34 EStG).</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Abfindungsrechner 2026" url="/abfindungsrechner" description="Netto-Abfindung mit F\u00fcnftelregelung berechnen." />
      <AbfindungsForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="abfindungsrechner" className="mt-8" />
    </div>
  );
}
