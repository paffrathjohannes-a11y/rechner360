import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { TilgungsrechnerForm } from './tilgungsrechner-form';
import { TILGUNGS_FAQS } from '@/data/content/tilgungs-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { ZinsTicker } from '@/components/calculator/zins-ticker';
import { getCurrentRates } from '@/lib/rates/fetch-rates';

export const metadata: Metadata = {
  title: 'Tilgungsrechner 2026 — Baufinanzierung & Tilgungsplan',
  description:
    'Erstellen Sie einen detaillierten Tilgungsplan für Ihre Baufinanzierung. Restschuld, Laufzeit und Zinsen auf einen Blick.',
  alternates: { canonical: '/tilgungsrechner' },
};

export default async function TilgungsrechnerPage() {
  const rates = await getCurrentRates();

  return (
    <CalculatorPageLayout
      slug="tilgungsrechner"
      title="Tilgungsrechner 2026"
      subtitle="Erstellen Sie einen detaillierten Tilgungsplan für Ihre Baufinanzierung."
      jsonLd={{ name: 'Tilgungsrechner 2026', url: '/tilgungsrechner', description: 'Kostenloser Tilgungsrechner 2026. Detaillierter Tilgungsplan mit Restschuld und Gesamtkosten.' }}
      faqs={TILGUNGS_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.tilgungsrechner.headline} offers={affiliateOffersBySlug.tilgungsrechner.offers} />}
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Baufinanzierung verstehen — so lesen Sie den Tilgungsplan</h2>
          <p className="text-text-secondary leading-relaxed">
            Eine Baufinanzierung läuft in Deutschland typischerweise als <strong>Annuitätendarlehen</strong> mit einer festen
            Zinsbindung von 10, 15 oder 20 Jahren. Während der Sollzinsbindung bleibt die Rate konstant — danach wird
            die verbleibende Restschuld neu finanziert (Anschlussfinanzierung). Der Tilgungsplan zeigt Monat für Monat
            genau, welcher Anteil Ihrer Rate in die Zinsen und welcher in die Tilgung fließt.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Die optimale Tilgungsrate 2026</h3>
          <p className="text-text-secondary leading-relaxed">
            In Niedrigzinsphasen der letzten Jahre galten 2 % Tilgung als Untergrenze — bei aktuellen Zinsen zwischen 3,5 %
            und 4,5 % ist das zu wenig. Als Faustregel gilt: <strong>Tilgung + Zinssatz ≥ 5,5 %</strong>. Wer heute bei 4 %
            Zinsen nur 2 % tilgt, benötigt über 40 Jahre bis zur Schuldenfreiheit. Mit 3 % Tilgung sinkt die Laufzeit
            auf etwa 25 Jahre, mit 4 % auf unter 20.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Zinsbindung: 10, 15 oder 20 Jahre?</h3>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>10 Jahre:</strong> Kürzester Zinsaufschlag, aber höchstes Zinsänderungsrisiko bei Anschlussfinanzierung. Lohnt, wenn Sie erwarten, dass die Zinsen fallen.</li>
            <li><strong>15 Jahre:</strong> Moderater Zinsaufschlag, oft bester Kompromiss. Nach 10 Jahren haben Sie nach § 489 BGB ein Sonderkündigungsrecht.</li>
            <li><strong>20 Jahre:</strong> Maximale Planungssicherheit, aber höchste Sollzinsen. Sinnvoll in Niedrigzinsphasen.</li>
          </ul>
          <h3 className="text-lg font-semibold text-text pt-2">Sondertilgung und Tilgungswechsel</h3>
          <p className="text-text-secondary leading-relaxed">
            Die meisten Baufinanzierer bieten jährliche Sondertilgungen von 5 % der ursprünglichen Darlehenssumme
            kostenlos an. Zusätzlich können Sie den Tilgungssatz meist 1–2 Mal während der Zinsbindung ändern — ein
            starkes Werkzeug, wenn sich Ihr Einkommen ändert oder das Weihnachtsgeld sichtbar wird.
          </p>
        </section>
      }
    >
      <ZinsTicker rates={rates} variant="baufi" className="mb-4" />
      <TilgungsrechnerForm />
    </CalculatorPageLayout>
  );
}
