/**
 * Programmatic SEO Pages für den Kreditrechner — mit unique Content
 */

const BETRAEGE = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];

export interface KreditPageDef {
  slug: string;
  betrag: number;
  zinssatz: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: { question: string; answer: string }[];
}

function getIntro(betrag: number, betragStr: string): string {
  if (betrag <= 5000) return `Ein Kleinkredit über ${betragStr} € eignet sich ideal für kleinere Anschaffungen wie Elektronik, Möbel oder eine Autoreparatur. Die Laufzeiten sind kurz (12–36 Monate), die Zinsen oft günstig. Vergleichen Sie hier die monatliche Rate und Gesamtkosten.`;
  if (betrag <= 15000) return `Ein ${betragStr}-€-Kredit ist eine der häufigsten Kreditgrößen in Deutschland — beliebt für Gebrauchtwagen, Küchen oder Umzüge. Bei guter Bonität erhalten Sie Zinsen ab 3–5 %. Berechnen Sie Ihre persönliche Rate und vergleichen Sie Anbieter.`;
  if (betrag <= 30000) return `Mit ${betragStr} € finanzieren viele Deutsche einen Neuwagen, eine größere Renovierung oder eine Umschuldung. In dieser Größenordnung lohnt sich der Zinsvergleich besonders — 0,5 % Unterschied spart bereits mehrere hundert Euro. Berechnen Sie hier Ihre optimale Rate.`;
  if (betrag <= 50000) return `Ein Kredit über ${betragStr} € zählt zu den größeren Ratenkrediten. Häufige Verwendungszwecke: Fahrzeugfinanzierung, umfangreiche Modernisierung oder Ablösung teurer Altkredite. Achten Sie auf Sondertilgungsoptionen und vergleichen Sie die Gesamtkosten.`;
  return `Bei einem Kreditvolumen von ${betragStr} € sprechen wir von einer erheblichen Finanzierung — hier gelten oft andere Konditionen als bei Kleinkrediten. Viele Banken bieten ab 50.000 € Sonderkonditionen an. Ein sorgfältiger Vergleich kann Tausende Euro Zinsen sparen.`;
}

function getFaqs(betrag: number, betragStr: string): { question: string; answer: string }[] {
  const rate36 = Math.round(betrag * (0.055 / 12) * Math.pow(1 + 0.055 / 12, 36) / (Math.pow(1 + 0.055 / 12, 36) - 1));
  const rate60 = Math.round(betrag * (0.055 / 12) * Math.pow(1 + 0.055 / 12, 60) / (Math.pow(1 + 0.055 / 12, 60) - 1));

  return [
    {
      question: `Wie hoch ist die Rate bei einem ${betragStr}-€-Kredit?`,
      answer: `Bei 5,5 % Zinsen zahlen Sie ca. ${rate36.toLocaleString('de-DE')} € pro Monat (3 Jahre Laufzeit) oder ca. ${rate60.toLocaleString('de-DE')} € pro Monat (5 Jahre). Je kürzer die Laufzeit, desto weniger Zinsen zahlen Sie insgesamt — aber die monatliche Belastung steigt.`,
    },
    {
      question: `Welches Einkommen brauche ich für einen ${betragStr}-€-Kredit?`,
      answer: betrag <= 10000
        ? `Für einen ${betragStr}-€-Kredit reicht in der Regel ein Nettoeinkommen ab 1.200–1.500 € monatlich, sofern keine weiteren Verbindlichkeiten bestehen. Die Kreditrate sollte maximal 35 % Ihres Nettos betragen.`
        : betrag <= 30000
          ? `Für ${betragStr} € sollten Sie mindestens 2.000–2.500 € netto verdienen. Banken prüfen, ob die Rate (bei 5 Jahren ca. ${rate60.toLocaleString('de-DE')} €) in Ihr Budget passt. Ein zweiter Kreditnehmer verbessert die Chancen und den Zinssatz.`
          : `Bei ${betragStr} € erwarten Banken ein solides Einkommen ab 3.000–4.000 € netto. Wichtig: Bestehende Kreditraten und Miete werden vom verfügbaren Einkommen abgezogen. Ein Haushaltsrechnung vorab hilft bei der Einschätzung.`,
    },
  ];
}

export function generateKreditPages(): KreditPageDef[] {
  return BETRAEGE.map((betrag) => {
    const betragStr = betrag.toLocaleString('de-DE');
    return {
      slug: `${betrag}-euro-kredit`,
      betrag,
      zinssatz: 5.5,
      title: `${betragStr} € Kredit — Rate & Kosten berechnen`,
      metaTitle: `${betragStr} € Kredit — Monatliche Rate berechnen 2026`,
      metaDescription: `Was kostet ein ${betragStr} € Kredit? ✓ Monatliche Rate ✓ Gesamtkosten ✓ Tilgungsplan ✓ Kostenlos berechnen`,
      h1: `${betragStr} € Kredit — monatliche Rate & Gesamtkosten`,
      intro: getIntro(betrag, betragStr),
      faqs: getFaqs(betrag, betragStr),
    };
  });
}

export const KREDIT_PAGES = generateKreditPages();
