import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { GehaltsrechnerForm } from './gehaltsrechner-form';
import { GEHALTS_FAQS } from '@/data/content/gehalts-guide';

export const metadata: Metadata = {
  title: 'Gehaltsrechner 2026 — Netto-Vergleich aller Steuerklassen',
  description:
    'Vergleichen Sie Ihr Gehalt über alle Steuerklassen und berechnen Sie die Arbeitgeberkosten. Aktuell für 2026.',
  alternates: { canonical: '/gehaltsrechner' },
};

export default function GehaltsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="gehaltsrechner"
      title="Gehaltsrechner 2026"
      subtitle="Vergleichen Sie Ihr Nettogehalt über alle Steuerklassen auf einen Blick."
      jsonLd={{ name: 'Gehaltsrechner 2026', url: '/gehaltsrechner', description: 'Kostenloser Gehaltsrechner 2026 mit Steuerklassen-Vergleich und Arbeitgeberkosten.' }}
      faqs={GEHALTS_FAQS}
    >
      <GehaltsrechnerForm />
    </CalculatorPageLayout>
  );
}
