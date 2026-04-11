import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { MwstForm } from './mwst-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

const FAQS = [
  { question: 'Wie berechne ich die MwSt?', answer: 'Netto zu Brutto: Netto × 1,19 (bei 19%) oder × 1,07 (bei 7%). Brutto zu Netto: Brutto ÷ 1,19 bzw. ÷ 1,07. Die Mehrwertsteuer ist die Differenz zwischen Brutto und Netto.' },
  { question: 'Wann gilt 7% und wann 19%?', answer: 'Der ermäßigte Satz von 7% gilt für Lebensmittel, Bücher, Zeitungen, öffentlichen Nahverkehr, Hotelübernachtungen und kulturelle Veranstaltungen. Für alle anderen Waren und Dienstleistungen gilt der Regelsatz von 19%.' },
  { question: 'Was ist der Unterschied zwischen MwSt und USt?', answer: 'Es gibt keinen Unterschied — Mehrwertsteuer (MwSt) und Umsatzsteuer (USt) bezeichnen dieselbe Steuer. Offiziell heißt sie Umsatzsteuer, umgangssprachlich wird häufig Mehrwertsteuer verwendet.' },
  { question: 'Wie rechne ich die MwSt aus einem Bruttobetrag heraus?', answer: 'Bei 19%: MwSt-Betrag = Brutto ÷ 1,19 × 0,19. Bei 7%: MwSt-Betrag = Brutto ÷ 1,07 × 0,07. Beispiel: Bei 119 € brutto beträgt die MwSt 19 € und der Nettobetrag 100 €.' },
  { question: 'Muss ich als Kleinunternehmer MwSt berechnen?', answer: 'Nein. Kleinunternehmer nach § 19 UStG sind von der Umsatzsteuer befreit, wenn der Vorjahresumsatz unter 25.000 € und der voraussichtliche Jahresumsatz unter 100.000 € liegt (Stand 2026). Sie dürfen keine MwSt auf Rechnungen ausweisen.' },
  { question: 'Welche Länder haben welchen MwSt-Satz?', answer: 'Deutschland: 19% (ermäßigt 7%). Österreich: 20% (ermäßigt 10%). Schweiz: 8,1% (ermäßigt 2,6%). Die EU-Mitgliedstaaten haben Regelsätze zwischen 17% (Luxemburg) und 27% (Ungarn).' },
  { question: 'Was ist Vorsteuer und wie funktioniert der Vorsteuerabzug?', answer: 'Vorsteuer ist die MwSt, die ein Unternehmen beim Einkauf bezahlt. Unternehmen können diese vom Finanzamt zurückfordern (Vorsteuerabzug). Die Differenz zwischen eingenommener Umsatzsteuer und gezahlter Vorsteuer wird ans Finanzamt abgeführt.' },
];

export const metadata: Metadata = {
  title: 'MwSt Rechner — Mehrwertsteuer berechnen (19% / 7%)',
  description: 'Mehrwertsteuer berechnen: Netto zu Brutto und Brutto zu Netto. Mit 19% oder 7% MwSt. Kostenlos und sofort.',
  keywords: ['MwSt Rechner', 'Mehrwertsteuer Rechner', 'Netto Brutto', 'Umsatzsteuer berechnen', 'MwSt 19%'],
  alternates: { canonical: '/mwst-rechner' },
};

export default function MwstRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="mwst-rechner"
      title="MwSt Rechner"
      subtitle="Mehrwertsteuer berechnen — Netto zu Brutto und zurück. 19% oder 7%."
      jsonLd={{ name: 'MwSt Rechner', url: '/mwst-rechner', description: 'Mehrwertsteuer berechnen: Netto ↔ Brutto.' }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['mwst-rechner'].headline} offers={affiliateOffersBySlug['mwst-rechner'].offers} />}
    >
      <MwstForm />
    </CalculatorPageLayout>
  );
}
