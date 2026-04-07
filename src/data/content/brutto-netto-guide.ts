import type { FAQ } from '@/types/content';

export const BRUTTO_NETTO_FAQS: FAQ[] = [
  {
    question: 'Wie berechnet sich das Nettogehalt vom Bruttogehalt?',
    answer: 'Vom Bruttogehalt werden Lohnsteuer, Solidarit&auml;tszuschlag, ggf. Kirchensteuer sowie die Sozialversicherungsbeitr&auml;ge (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) abgezogen. Der verbleibende Betrag ist Ihr Nettogehalt.',
  },
  {
    question: 'Welche Steuerklasse ist die beste?',
    answer: 'Die Steuerklasse h&auml;ngt von Ihrem Familienstand ab. Ledige haben Steuerklasse I, Alleinerziehende II. Verheiratete k&ouml;nnen zwischen III/V und IV/IV w&auml;hlen. Die Kombination III/V lohnt sich, wenn ein Partner deutlich mehr verdient.',
  },
  {
    question: 'Was ist der KV-Zusatzbeitrag?',
    answer: 'Der Zusatzbeitrag ist ein kassenindividueller Beitrag, den jede Krankenkasse zus&auml;tzlich zum allgemeinen Beitragssatz von 14,6% erhebt. 2026 liegt der Durchschnitt bei 2,9%. Er wird je zur H&auml;lfte von Arbeitnehmer und Arbeitgeber getragen.',
  },
  {
    question: 'Wie wirkt sich die Kirchensteuer auf das Netto aus?',
    answer: 'Die Kirchensteuer betr&auml;gt 8% (Bayern und Baden-W&uuml;rttemberg) oder 9% (alle anderen Bundesl&auml;nder) der Lohnsteuer. Bei einem Gehalt von 3.000 &euro; brutto in Steuerklasse I sind das ca. 25-35 &euro; monatlich.',
  },
  {
    question: 'Stimmen die Berechnungen mit dem BMF-Rechner &uuml;berein?',
    answer: 'Ja, unsere Berechnungen basieren auf dem offiziellen Programmablaufplan (PAP) 2026 des Bundesministeriums der Finanzen. Die Lohnsteuerberechnung entspricht exakt dem BMF-Algorithmus.',
  },
  {
    question: 'Was ist die Beitragsbemessungsgrenze?',
    answer: 'Die Beitragsbemessungsgrenze ist die Einkommensobergrenze, bis zu der Sozialversicherungsbeitr&auml;ge erhoben werden. 2026 liegt sie bei 5.812,50 &euro;/Monat f&uuml;r KV/PV und 8.450 &euro;/Monat f&uuml;r RV/ALV.',
  },
  {
    question: 'Werden meine Daten gespeichert?',
    answer: 'Nein. Alle Berechnungen laufen ausschlie&szlig;lich in Ihrem Browser (clientseitig). Es werden keine Eingabedaten an unsere Server &uuml;bermittelt oder gespeichert.',
  },
];
