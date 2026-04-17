import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { KreditrechnerForm } from './kreditrechner-form';
import { KREDIT_FAQS } from '@/data/content/kredit-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { ZinsTicker } from '@/components/calculator/zins-ticker';
import { getCurrentRates } from '@/lib/rates/fetch-rates';

export const metadata: Metadata = {
  title: 'Kreditrechner 2026 — Monatliche Rate & Gesamtkosten',
  description:
    'Kreditrate, Gesamtkosten und Zinsen 2026 in Sekunden berechnen. Mit Sondertilgung, tagesaktuellen EZB-Zinsen und kompletter Tilgungsübersicht.',
  alternates: { canonical: '/kreditrechner' },
};

// ISR: Seite täglich neu generieren, ECB-Raten werden gecached.
// Ohne dieses Flag würde Next.js die Route wegen `await getCurrentRates()` als
// voll-dynamisch behandeln (kein HTML-Cache, schlechter LCP).
export const revalidate = 86400;

export default async function KreditrechnerPage() {
  const rates = await getCurrentRates();

  return (
    <CalculatorPageLayout
      slug="kreditrechner"
      title="Kreditrechner 2026"
      subtitle="Berechnen Sie monatliche Rate, Gesamtkosten und Zinsen für Ihren Kredit."
      jsonLd={{ name: 'Kreditrechner 2026', url: '/kreditrechner', description: 'Kostenloser Kreditrechner 2026. Monatliche Rate, Gesamtkosten und detaillierter Tilgungsplan.' }}
      faqs={KREDIT_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.kreditrechner.headline} offers={affiliateOffersBySlug.kreditrechner.offers} />}
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">So funktioniert der Kreditrechner 2026</h2>
          <p className="text-text-secondary leading-relaxed">
            Der Kreditrechner nutzt die klassische <strong>Annuitätenformel</strong>: Die monatliche Rate bleibt über die gesamte
            Laufzeit konstant, setzt sich aber aus einem schrumpfenden Zinsanteil und einem wachsenden Tilgungsanteil zusammen.
            In den ersten Jahren zahlen Sie mehr Zinsen als Tilgung, zum Ende drehen sich die Verhältnisse um. Der
            Tilgungsplan zeigt jede einzelne Rate transparent auf.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Die drei Stellschrauben — und was sie bedeuten</h3>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>Kreditbetrag:</strong> Was Sie brauchen. Nur so viel aufnehmen, wie nötig — jeder Euro mehr kostet Zinsen.</li>
            <li><strong>Laufzeit:</strong> Je kürzer, desto weniger Zinsen, aber desto höher die monatliche Rate. 60 Monate sind ein häufiger Kompromiss.</li>
            <li><strong>Zinssatz:</strong> Hängt von Bonität, Verwendungszweck und aktuellem EZB-Leitzins ab. Ein guter Bonitätsscore kann 2–4 Prozentpunkte sparen.</li>
          </ul>
          <h3 className="text-lg font-semibold text-text pt-2">Sondertilgung und ihre Wirkung</h3>
          <p className="text-text-secondary leading-relaxed">
            Bei Verbraucherkrediten ab 75.000 € sind Sondertilgungen gesetzlich jederzeit möglich (§ 500 BGB).
            Bei kleineren Krediten bieten viele Banken jährliche Sondertilgungen von 5–10 % des Kreditbetrags kostenlos an.
            Eine Sonderzahlung am Anfang der Laufzeit spart deutlich mehr Zinsen als eine gleich hohe Zahlung am Ende —
            weil der gesparte Zinsbetrag über die gesamte Restlaufzeit kumuliert.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Effektiver Jahreszins vs. Sollzins</h3>
          <p className="text-text-secondary leading-relaxed">
            Gesetzlich bewerben Banken den <strong>effektiven Jahreszins</strong> — er enthält neben dem reinen Sollzins auch
            Bearbeitungsgebühren, Restschuldversicherungen und andere Nebenkosten. Vergleichen Sie immer den Effektivzins,
            nicht den Sollzins. Der Rechner oben arbeitet mit Sollzins; für einen echten Anbietervergleich nutzen Sie
            den Effektivzins aus dem Kreditangebot.
          </p>
        </section>
      }
    >
      <ZinsTicker rates={rates} variant="kredit" className="mb-4" />
      <KreditrechnerForm />
    </CalculatorPageLayout>
  );
}
