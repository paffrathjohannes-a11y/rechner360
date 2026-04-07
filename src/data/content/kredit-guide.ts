import type { FAQ } from '@/types/content';

export const KREDIT_FAQS: FAQ[] = [
  {
    question: 'Wie berechnet sich die monatliche Kreditrate?',
    answer: 'Die monatliche Rate eines Annuitätendarlehens setzt sich aus Zins- und Tilgungsanteil zusammen. Zu Beginn ist der Zinsanteil hoch und der Tilgungsanteil niedrig. Mit jeder Rate sinkt der Zinsanteil und der Tilgungsanteil steigt.',
  },
  {
    question: 'Was ist der Unterschied zwischen Sollzins und Effektivzins?',
    answer: 'Der Sollzins ist der reine Zinssatz des Kredits. Der Effektivzins enthält zusätzlich alle Nebenkosten (Bearbeitungsgebühren, Kontogebühren etc.) und ist daher immer höher. Für Vergleiche sollten Sie immer den Effektivzins heranziehen.',
  },
  {
    question: 'Wie viel Kredit kann ich mir leisten?',
    answer: 'Als Faustregel sollte die monatliche Kreditrate nicht mehr als 35-40% Ihres Nettoeinkommens betragen. Bei 2.500 € netto wären das maximal 875-1.000 € monatliche Rate für alle Kredite zusammen.',
  },
  {
    question: 'Lohnt sich eine Sondertilgung?',
    answer: 'Ja, Sondertilgungen reduzieren die Restschuld und damit die Gesamtzinskosten erheblich. Bei einem 20.000 € Kredit mit 5% Zinsen spart eine jährliche Sondertilgung von 2.000 € mehrere hundert Euro Zinsen.',
  },
  {
    question: 'Was passiert bei vorzeitiger Kündigung?',
    answer: 'Bei vorzeitiger Rückzahlung kann die Bank eine Vorfälligkeitsentschädigung verlangen. Diese ist gesetzlich auf 1% der Restschuld begrenzt (bei Restlaufzeit über 12 Monate) bzw. 0,5% (bei Restlaufzeit unter 12 Monaten).',
  },
];
