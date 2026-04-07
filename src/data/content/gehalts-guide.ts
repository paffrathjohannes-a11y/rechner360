import type { FAQ } from '@/types/content';

export const GEHALTS_FAQS: FAQ[] = [
  {
    question: 'Warum ist das Netto in Steuerklasse 3 h&ouml;her als in Steuerklasse 1?',
    answer: 'In Steuerklasse III wird das Einkommen nach der Splittingtabelle besteuert, was effektiv den doppelten Grundfreibetrag gew&auml;hrt. Dadurch ist die Lohnsteuer deutlich niedriger. Steuerklasse III ist f&uuml;r verheiratete Paare gedacht, bei denen ein Partner das h&ouml;here Einkommen hat.',
  },
  {
    question: 'Was sind die Arbeitgeberkosten zus&auml;tzlich zum Bruttogehalt?',
    answer: 'Der Arbeitgeber zahlt zus&auml;tzlich zum Bruttogehalt seinen Anteil an Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung sowie Umlagen (U1, U2, Insolvenzgeldumlage). Das sind ca. 20-22% on top. Bei 4.000 &euro; brutto kostet der Mitarbeiter den AG ca. 4.800-4.900 &euro;.',
  },
  {
    question: 'Steuerklasse 1 und 4 ergeben das gleiche Netto &mdash; warum?',
    answer: 'Beide Steuerklassen verwenden die Grundtabelle f&uuml;r die Besteuerung. Der einzige Unterschied ist, dass SK IV f&uuml;r Verheiratete gedacht ist und optional den Faktor-Verfahren nutzen kann (SK IV mit Faktor).',
  },
  {
    question: 'Wie wirkt sich ein Kinderfreibetrag auf das Netto aus?',
    answer: 'Der Kinderfreibetrag wirkt sich nicht direkt auf die Lohnsteuer aus, sondern auf den Solidarit&auml;tszuschlag und die Kirchensteuer. Das Finanzamt pr&uuml;ft am Jahresende, ob Kindergeld oder Kinderfreibetrag g&uuml;nstiger ist (G&uuml;nstigerpr&uuml;fung).',
  },
  {
    question: 'Was ist der Midijob-Bereich?',
    answer: 'Der &Uuml;bergangsbereich (Midijob) liegt 2026 bei 538,01 bis 2.000 &euro; monatlich. In diesem Bereich zahlen Arbeitnehmer reduzierte Sozialversicherungsbeitr&auml;ge, erwerben aber volle Rentenansprüche.',
  },
];
