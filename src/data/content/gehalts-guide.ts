import type { FAQ } from '@/types/content';

export const GEHALTS_FAQS: FAQ[] = [
  {
    question: 'Warum ist das Netto in Steuerklasse 3 höher als in Steuerklasse 1?',
    answer: 'In Steuerklasse III wird das Einkommen nach der Splittingtabelle besteuert, was effektiv den doppelten Grundfreibetrag gewährt. Dadurch ist die Lohnsteuer deutlich niedriger. Steuerklasse III ist für verheiratete Paare gedacht, bei denen ein Partner das höhere Einkommen hat.',
  },
  {
    question: 'Was sind die Arbeitgeberkosten zusätzlich zum Bruttogehalt?',
    answer: 'Der Arbeitgeber zahlt zusätzlich zum Bruttogehalt seinen Anteil an Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung sowie Umlagen (U1, U2, Insolvenzgeldumlage). Das sind ca. 20-22% on top. Bei 4.000 € brutto kostet der Mitarbeiter den AG ca. 4.800-4.900 €.',
  },
  {
    question: 'Steuerklasse 1 und 4 ergeben das gleiche Netto — warum?',
    answer: 'Beide Steuerklassen verwenden die Grundtabelle für die Besteuerung. Der einzige Unterschied ist, dass SK IV für Verheiratete gedacht ist und optional den Faktor-Verfahren nutzen kann (SK IV mit Faktor).',
  },
  {
    question: 'Wie wirkt sich ein Kinderfreibetrag auf das Netto aus?',
    answer: 'Der Kinderfreibetrag wirkt sich nicht direkt auf die Lohnsteuer aus, sondern auf den Solidaritätszuschlag und die Kirchensteuer. Das Finanzamt prüft am Jahresende, ob Kindergeld oder Kinderfreibetrag günstiger ist (Günstigerprüfung).',
  },
  {
    question: 'Was ist der Midijob-Bereich?',
    answer: 'Der Übergangsbereich (Midijob) liegt 2026 bei 538,01 bis 2.000 € monatlich. In diesem Bereich zahlen Arbeitnehmer reduzierte Sozialversicherungsbeiträge, erwerben aber volle Rentenansprüche.',
  },
];
