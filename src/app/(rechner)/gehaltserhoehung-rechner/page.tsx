import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { GehaltserhoehungForm } from './gehaltserhoehung-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

const FAQS = [
  { question: 'Wie viel kommt von einer Gehaltserhöhung netto an?', answer: 'Typischerweise kommen nur 45-60% einer Brutto-Gehaltserhöhung netto an. Der Rest geht für Steuern und Sozialversicherung drauf. Je höher Ihr Einkommen, desto weniger bleibt netto — wegen der Steuerprogression.' },
  { question: 'Warum ist die Netto-Erhöhung so viel kleiner als die Brutto-Erhöhung?', answer: 'Deutschland hat ein progressives Steuersystem: Jeder zusätzliche Euro wird höher besteuert als der vorherige. Dazu kommen Sozialversicherungsbeiträge (ca. 20% AN-Anteil). Bei einem Gehalt um 4.000-5.000 € brutto liegt der Grenzsteuersatz oft schon bei 35-42%.' },
  { question: 'Lohnt sich eine Gehaltserhöhung steuerlich überhaupt?', answer: 'Ja, immer! Es gibt keine Situation, in der Sie nach einer Erhöhung weniger netto haben als vorher. Das ist ein verbreiteter Irrglaube. Die Progression bedeutet nur, dass die zusätzlichen Euro höher besteuert werden — nicht das gesamte Gehalt.' },
  { question: 'Was bringt mehr: Gehaltserhöhung oder Firmenwagen?', answer: 'Das hängt vom Einzelfall ab. Ein Firmenwagen spart Ihnen die Anschaffungs- und Betriebskosten, wird aber als geldwerter Vorteil versteuert. Bei einem E-Auto (0,25%-Regel) ist der steuerliche Vorteil besonders groß. Nutzen Sie unseren BNR mit Firmenwagen-Option für den Vergleich.' },
  { question: 'Wie viel Gehaltserhöhung ist realistisch?', answer: 'Bei einem Jobwechsel sind 10-20% üblich. Intern liegen Gehaltserhöhungen typischerweise bei 3-7% pro Jahr. Bei einer Beförderung oder deutlich erweitertem Aufgabenbereich sind 10-15% realistisch.' },
  { question: 'Wann ist der beste Zeitpunkt für eine Gehaltsverhandlung?', answer: 'Ideal ist nach einem erfolgreichen Projektabschluss, zum Jahresgespräch oder nach der Probezeit. Vermeiden Sie Zeiten wirtschaftlicher Unsicherheit im Unternehmen. Bereiten Sie konkrete Argumente (Leistungen, Marktvergleich) vor.' },
  { question: 'Sind Alternativen zur Gehaltserhöhung möglich?', answer: 'Ja: Jobticket (steuerfrei), Essensgutscheine (bis 7,23 €/Tag steuerfrei), betriebliche Altersvorsorge, Weiterbildungsbudget, zusätzliche Urlaubstage oder Homeoffice-Pauschale. Diese Sachleistungen sind oft steuerlich günstiger als eine Bruttoerhöhung.' },
];

export const metadata: Metadata = {
  title: 'Gehaltserhöhung Rechner — Was bleibt netto?',
  description: 'Wie viel kommt von einer Gehaltserhöhung netto an? Berechnen Sie den Netto-Unterschied vor und nach der Erhöhung.',
  keywords: ['Gehaltserhöhung Rechner', 'Gehaltserhöhung netto', 'Was bleibt von Gehaltserhöhung', 'Netto Erhöhung berechnen'],
  alternates: { canonical: '/gehaltserhoehung-rechner' },
};

export default function GehaltserhoehungRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="gehaltserhoehung-rechner"
      title="Gehaltserhöhung Rechner"
      subtitle="Berechnen Sie, wie viel von einer Gehaltserhöhung netto übrig bleibt."
      jsonLd={{ name: 'Gehaltserhöhung Rechner', url: '/gehaltserhoehung-rechner', description: 'Gehaltserhöhung: Wie viel bleibt netto?' }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['gehaltserhoehung-rechner'].headline} offers={affiliateOffersBySlug['gehaltserhoehung-rechner'].offers} />}
    >
      <GehaltserhoehungForm />
    </CalculatorPageLayout>
  );
}
