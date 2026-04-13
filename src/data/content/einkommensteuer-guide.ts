import type { FAQ } from '@/types/content';

export const EINKOMMENSTEUER_FAQS: FAQ[] = [
  {
    question: 'Wie hoch ist der Grundfreibetrag 2026?',
    answer: 'Der Grundfreibetrag beträgt 2026 voraussichtlich 12.348 € für Ledige (Steuerklasse I) und 24.696 € für Verheiratete (Steuerklasse III). Bis zu diesem Betrag fällt keine Einkommensteuer an.',
  },
  {
    question: 'Wie wird die Einkommensteuer berechnet?',
    answer: 'Die Einkommensteuer wird nach §32a EStG in 5 Zonen berechnet: Bis zum Grundfreibetrag (12.348 €) steuerfrei, dann progressiv steigend von 14 % Eingangssteuersatz bis zum Spitzensteuersatz von 42 % (ab ca. 68.480 €). Ab 277.826 € gilt der Reichensteuersatz von 45 %.',
  },
  {
    question: 'Was ist der Solidaritätszuschlag 2026?',
    answer: 'Der Solidaritätszuschlag beträgt 5,5 % der Einkommensteuer, wird aber erst ab einer bestimmten Freigrenze erhoben. Für Steuerklasse I liegt diese bei ca. 18.130 € Einkommensteuer pro Jahr. Die meisten Arbeitnehmer zahlen daher keinen Soli mehr.',
  },
  {
    question: 'Was ist der Unterschied zwischen Grenz- und Durchschnittssteuersatz?',
    answer: 'Der Grenzsteuersatz gibt an, wie viel Steuer auf den nächsten verdienten Euro anfällt. Der Durchschnittssteuersatz zeigt die tatsächliche Steuerbelastung bezogen auf das gesamte Einkommen. Beispiel: Bei 50.000 € zvE liegt der Grenzsteuersatz bei ca. 38 %, der Durchschnittssteuersatz aber nur bei ca. 23 %.',
  },
  {
    question: 'Welche Steuerklasse ist die richtige?',
    answer: 'Steuerklasse I für Ledige, II für Alleinerziehende, III und V für Verheiratete mit unterschiedlichem Einkommen (III für den Höherverdienenden), IV für Verheiratete mit ähnlichem Einkommen, VI für Zweitjobs. Die Steuerklasse beeinflusst den monatlichen Lohnsteuerabzug, nicht die jährliche Steuerlast.',
  },
  {
    question: 'Wie wirken sich Kinderfreibeträge auf die Einkommensteuer aus?',
    answer: 'Pro Kind steht ein Kinderfreibetrag von 6.828 € (2026) zur Verfügung, der vom zu versteuernden Einkommen abgezogen wird. Das Finanzamt prüft automatisch, ob Kindergeld oder Kinderfreibetrag günstiger ist (Günstigerprüfung).',
  },
  {
    question: 'Muss ich Kirchensteuer zahlen?',
    answer: 'Kirchensteuer zahlen nur Mitglieder einer steuererhebenden Religionsgemeinschaft (katholisch, evangelisch, etc.). Der Satz beträgt 8 % der Einkommensteuer in Bayern und Baden-Württemberg, 9 % in allen anderen Bundesländern.',
  },
];
