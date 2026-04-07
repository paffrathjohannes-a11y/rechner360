import type { FAQ } from '@/types/content';

export const KREDIT_FAQS: FAQ[] = [
  {
    question: 'Wie berechnet sich die monatliche Kreditrate?',
    answer: 'Die monatliche Rate eines Annuit&auml;tendarlehens setzt sich aus Zins- und Tilgungsanteil zusammen. Zu Beginn ist der Zinsanteil hoch und der Tilgungsanteil niedrig. Mit jeder Rate sinkt der Zinsanteil und der Tilgungsanteil steigt.',
  },
  {
    question: 'Was ist der Unterschied zwischen Sollzins und Effektivzins?',
    answer: 'Der Sollzins ist der reine Zinssatz des Kredits. Der Effektivzins enth&auml;lt zus&auml;tzlich alle Nebenkosten (Bearbeitungsgeb&uuml;hren, Kontogebühren etc.) und ist daher immer h&ouml;her. F&uuml;r Vergleiche sollten Sie immer den Effektivzins heranziehen.',
  },
  {
    question: 'Wie viel Kredit kann ich mir leisten?',
    answer: 'Als Faustregel sollte die monatliche Kreditrate nicht mehr als 35-40% Ihres Nettoeinkommens betragen. Bei 2.500 &euro; netto w&auml;ren das maximal 875-1.000 &euro; monatliche Rate f&uuml;r alle Kredite zusammen.',
  },
  {
    question: 'Lohnt sich eine Sondertilgung?',
    answer: 'Ja, Sondertilgungen reduzieren die Restschuld und damit die Gesamtzinskosten erheblich. Bei einem 20.000 &euro; Kredit mit 5% Zinsen spart eine j&auml;hrliche Sondertilgung von 2.000 &euro; mehrere hundert Euro Zinsen.',
  },
  {
    question: 'Was passiert bei vorzeitiger K&uuml;ndigung?',
    answer: 'Bei vorzeitiger R&uuml;ckzahlung kann die Bank eine Vorf&auml;lligkeitsentsch&auml;digung verlangen. Diese ist gesetzlich auf 1% der Restschuld begrenzt (bei Restlaufzeit &uuml;ber 12 Monate) bzw. 0,5% (bei Restlaufzeit unter 12 Monaten).',
  },
];
