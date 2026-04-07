import type { FAQ } from '@/types/content';

export const BRUTTO_NETTO_FAQS: FAQ[] = [
  {
    question: 'Wie berechnet sich das Nettogehalt vom Bruttogehalt?',
    answer: 'Vom Bruttogehalt werden Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer sowie die Sozialversicherungsbeiträge (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) abgezogen. Der verbleibende Betrag ist Ihr Nettogehalt.',
  },
  {
    question: 'Welche Steuerklasse ist die beste?',
    answer: 'Die Steuerklasse hängt von Ihrem Familienstand ab. Ledige haben Steuerklasse I, Alleinerziehende II. Verheiratete können zwischen III/V und IV/IV wählen. Die Kombination III/V lohnt sich, wenn ein Partner deutlich mehr verdient.',
  },
  {
    question: 'Was ist der KV-Zusatzbeitrag?',
    answer: 'Der Zusatzbeitrag ist ein kassenindividueller Beitrag, den jede Krankenkasse zusätzlich zum allgemeinen Beitragssatz von 14,6% erhebt. 2026 liegt der Durchschnitt bei 2,9%. Er wird je zur Hälfte von Arbeitnehmer und Arbeitgeber getragen.',
  },
  {
    question: 'Wie wirkt sich die Kirchensteuer auf das Netto aus?',
    answer: 'Die Kirchensteuer beträgt 8% (Bayern und Baden-Württemberg) oder 9% (alle anderen Bundesländer) der Lohnsteuer. Bei einem Gehalt von 3.000 € brutto in Steuerklasse I sind das ca. 25-35 € monatlich.',
  },
  {
    question: 'Stimmen die Berechnungen mit dem BMF-Rechner überein?',
    answer: 'Ja, unsere Berechnungen basieren auf dem offiziellen Programmablaufplan (PAP) 2026 des Bundesministeriums der Finanzen. Die Lohnsteuerberechnung entspricht exakt dem BMF-Algorithmus.',
  },
  {
    question: 'Was ist die Beitragsbemessungsgrenze?',
    answer: 'Die Beitragsbemessungsgrenze ist die Einkommensobergrenze, bis zu der Sozialversicherungsbeiträge erhoben werden. 2026 liegt sie bei 5.812,50 €/Monat für KV/PV und 8.450 €/Monat für RV/ALV.',
  },
  {
    question: 'Werden meine Daten gespeichert?',
    answer: 'Nein. Alle Berechnungen laufen ausschließlich in Ihrem Browser (clientseitig). Es werden keine Eingabedaten an unsere Server übermittelt oder gespeichert.',
  },
];
