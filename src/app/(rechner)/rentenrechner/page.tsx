import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { RentenForm } from './renten-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { RENTEN_PAGES } from '@/data/programmatic/renten-pages';

const FAQS = [
  { question: 'Wie berechnet sich die gesetzliche Rente?', answer: 'Die Monatsrente ergibt sich aus: Entgeltpunkte × Zugangsfaktor × aktueller Rentenwert. Pro Jahr, in dem Sie das Durchschnittseinkommen verdienen, erhalten Sie 1 Entgeltpunkt. Der aktuelle Rentenwert liegt 2026 bei ca. 39,32 € (West).' },
  { question: 'Was sind Entgeltpunkte?', answer: 'Entgeltpunkte spiegeln Ihr Einkommen im Verhältnis zum Durchschnitt wider. Wer genau das Durchschnittseinkommen (ca. 45.358 €/Jahr) verdient, bekommt 1 Punkt pro Jahr. Wer doppelt so viel verdient, bekommt 2 Punkte. Maximum: ca. 2,1 Punkte (Beitragsbemessungsgrenze).' },
  { question: 'Was ist die Rentenlücke?', answer: 'Die Rentenlücke ist die Differenz zwischen Ihrem aktuellen Nettoeinkommen und der zu erwartenden Rente. Sie zeigt, wie viel Sie privat vorsorgen müssen, um Ihren Lebensstandard im Alter zu halten. Typisch liegt die Rentenlücke bei 30-50% des letzten Nettos.' },
  { question: 'Was kostet Frührente?', answer: 'Für jeden Monat vor dem Regelalter (67) wird die Rente um 0,3% gekürzt (Zugangsfaktor). Bei 2 Jahren Frührente (ab 65) sind das 7,2% weniger Rente — dauerhaft. Früheste Rente mit Abschlag: 63 Jahre (für langjährig Versicherte mit 35 Beitragsjahren).' },
  { question: 'Wie viel Rente bekomme ich mit 45 Beitragsjahren?', answer: 'Mit 45 Beitragsjahren und Durchschnittseinkommen sammeln Sie 45 Entgeltpunkte. Bei einem Rentenwert von 39,32 € ergibt das ca. 1.769 € brutto/Monat. Davon gehen noch Kranken- und Pflegeversicherungsbeiträge (ca. 11%) ab.' },
  { question: 'Muss ich auf meine Rente Steuern zahlen?', answer: 'Ja, Renten sind steuerpflichtig. Der steuerpflichtige Anteil hängt vom Rentenbeginn ab: 2026 sind 86% der Rente steuerpflichtig. Bis 2058 steigt der Anteil auf 100%. Ob tatsächlich Steuer anfällt, hängt vom Grundfreibetrag ab.' },
  { question: 'Lohnt sich freiwilliges Einzahlen in die Rentenversicherung?', answer: 'Freiwillige Beiträge können sich lohnen, besonders für Selbstständige oder zum Ausgleich von Abschlägen bei Frührente. Die Rendite liegt bei ca. 3-4% — steuerbegünstigt. Ob es sich individuell lohnt, hängt von der Lebenserwartung und alternativen Anlagen ab.' },
];

export const metadata: Metadata = {
  title: 'Rentenrechner 2026 — Gesetzliche Rente berechnen',
  description: 'Berechnen Sie Ihre voraussichtliche gesetzliche Rente. Mit Entgeltpunkten, Zugangsfaktor und Rentenlücke.',
  keywords: ['Rentenrechner', 'Rente berechnen', 'Gesetzliche Rente', 'Entgeltpunkte', 'Rentenlücke'],
  alternates: { canonical: '/rentenrechner' },
};

export default function RentenrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="rentenrechner"
      title="Rentenrechner 2026"
      subtitle="Berechnen Sie Ihre voraussichtliche gesetzliche Rente und die Rentenlücke."
      jsonLd={{
        name: 'Rentenrechner 2026',
        url: '/rentenrechner',
        description: 'Gesetzliche Rente berechnen mit Entgeltpunkten und Rentenlücke.',
      }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.rentenrechner.headline} offers={affiliateOffersBySlug.rentenrechner.offers} />}
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Gesetzliche Rente 2026 — Formel und Stellschrauben</h2>
          <p className="text-text-secondary leading-relaxed">
            Die deutsche Rentenformel ist überraschend transparent: <strong>Monatsrente = Entgeltpunkte × Zugangsfaktor × Rentenwert</strong>.
            Jeder dieser drei Faktoren ist beeinflussbar. Der Rentenwert ist politisch gesetzt (2026: 39,32 €), die
            Entgeltpunkte sammeln Sie über Ihre Einzahlungen, der Zugangsfaktor hängt vom Renteneintrittsalter ab.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Entgeltpunkte verstehen</h3>
          <p className="text-text-secondary leading-relaxed">
            Entgeltpunkte messen Ihr Einkommen relativ zum Durchschnittslohn aller Versicherten. Wer 2026 genau das
            vorläufige Durchschnittsentgelt von 51.944 € verdient, bekommt einen Punkt. Wer doppelt so viel verdient,
            zwei Punkte — aber nur bis zur Beitragsbemessungsgrenze von 101.400 €. Alles darüber bringt keine
            zusätzlichen Punkte. Nach 45 Jahren mit Durchschnittsverdienst summieren sich 45 Punkte zu einer Bruttorente
            von rund 1.770 € monatlich.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Zugangsfaktor: Abschlag oder Bonus</h3>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>Regelaltersgrenze:</strong> Für Jahrgang 1964 und jünger gilt das Renteneintrittsalter 67.</li>
            <li><strong>Früher Rente (Abschlag):</strong> Pro Monat vor 67 minus 0,3 %. Zwei Jahre früher kostet damit 7,2 % der Rente — lebenslang.</li>
            <li><strong>Später Rente (Bonus):</strong> Pro Monat nach 67 plus 0,5 %. Ein Jahr länger ergibt +6 %. Für Vermögende oft rentabler als jeder Kapitalmarkt.</li>
          </ul>
          <h3 className="text-lg font-semibold text-text pt-2">Die Rentenlücke realistisch einschätzen</h3>
          <p className="text-text-secondary leading-relaxed">
            Die gesetzliche Rente ersetzt aktuell ca. 48 % des vorherigen Nettoeinkommens (Rentenniveau). Von dieser
            Bruttorente werden zusätzlich Kranken- und Pflegeversicherung sowie Steuern abgezogen — netto bleiben oft
            nur 40–45 %. Wer im Alter seinen Lebensstandard halten will, braucht typischerweise 70–80 % des letzten
            Nettos — also eine private Ergänzung von 25–35 %. Je früher Sie mit Vorsorge beginnen, desto stärker wirkt
            der Zinseszinseffekt.
          </p>
        </section>
      }
      programmaticVariants={{ pages: RENTEN_PAGES }}
    >
      <RentenForm />
    </CalculatorPageLayout>
  );
}
