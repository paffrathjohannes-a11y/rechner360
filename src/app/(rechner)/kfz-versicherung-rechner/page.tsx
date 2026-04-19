import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { KfzForm } from './kfz-form';
import { KFZ_FAQS } from '@/data/content/kfz-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { KFZ_PAGES } from '@/data/programmatic/kfz-pages';

export const metadata: Metadata = {
  title: 'Kfz-Versicherung Rechner 2026 — Beitrag berechnen & vergleichen',
  description: 'Kfz-Versicherung berechnen: Haftpflicht, Teilkasko, Vollkasko im Vergleich. Mit SF-Klasse, Fahrzeugtyp und Spartipps. Kostenlos 2026.',
  keywords: ['Kfz Versicherung Rechner', 'Autoversicherung berechnen', 'Kfz Versicherung Vergleich', 'Kfz Haftpflicht Kosten', 'Autoversicherung 2026'],
  alternates: { canonical: '/kfz-versicherung-rechner' },
  openGraph: {
    title: 'Kfz-Versicherung Rechner 2026 — Beitrag berechnen | rechner360.de',
    description: 'Kfz-Versicherung berechnen und vergleichen. Haftpflicht, Teilkasko oder Vollkasko?',
    url: '/kfz-versicherung-rechner',
    type: 'website',
  },
};

export default function KfzVersicherungRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="kfz-versicherung-rechner"
      title="Kfz-Versicherung Rechner 2026"
      subtitle="Berechnen Sie Ihre Kfz-Versicherung — Haftpflicht, Teilkasko oder Vollkasko im Vergleich."
      jsonLd={{
        name: 'Kfz-Versicherung Rechner 2026',
        url: '/kfz-versicherung-rechner',
        description: 'Kostenloser Kfz-Versicherung Rechner 2026. Haftpflicht, Teilkasko und Vollkasko vergleichen.',
      }}
      faqs={KFZ_FAQS}
      affiliateSection={affiliateOffersBySlug['kfz-versicherung-rechner'] ? <AffiliateBox headline={affiliateOffersBySlug['kfz-versicherung-rechner'].headline} offers={affiliateOffersBySlug['kfz-versicherung-rechner'].offers} /> : undefined}
      programmaticVariants={{ pages: KFZ_PAGES }}
    >
      <KfzForm />
    </CalculatorPageLayout>
  );
}
