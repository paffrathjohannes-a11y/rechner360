/**
 * Programmatic SEO Pages für den Tilgungsrechner — mit unique Content
 */

const BETRAEGE = [150000, 200000, 250000, 300000, 350000, 400000, 500000];

export interface TilgungsPageDef {
  slug: string;
  betrag: number;
  tilgung: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: { question: string; answer: string }[];
}

function getIntro(betrag: number, betragStr: string): string {
  if (betrag <= 200000) return `Eine Baufinanzierung über ${betragStr} € ist typisch für Eigentumswohnungen in mittelgroßen Städten oder Einfamilienhäuser in ländlichen Regionen. Bei aktuellen Bauzinsen um 3,5 % und 2 % Tilgung zahlen Sie ca. ${Math.round(betrag * 0.055 / 12).toLocaleString('de-DE')} € monatlich. Erstellen Sie hier Ihren individuellen Tilgungsplan.`;
  if (betrag <= 350000) return `${betragStr} € — das ist die typische Größenordnung für ein Einfamilienhaus oder eine größere Wohnung in Ballungsräumen. In dieser Preisklasse macht bereits 0,3 % Zinsdifferenz über 20 Jahre mehr als ${Math.round(betrag * 0.003 * 15).toLocaleString('de-DE')} € Unterschied. Berechnen Sie hier Ihren optimalen Tilgungsplan.`;
  return `Bei ${betragStr} € Finanzierungsvolumen sprechen wir von einer gehobenen Immobilienfinanzierung. Hier sind eine lange Zinsbindung (15–20 Jahre) und Sondertilgungsoptionen besonders wichtig. Schon 1 % mehr Tilgung verkürzt die Laufzeit um Jahre und spart fünfstellige Zinsbeträge.`;
}

function getFaqs(betrag: number, betragStr: string): { question: string; answer: string }[] {
  const rate2 = Math.round(betrag * (0.035 + 0.02) / 12);
  const rate3 = Math.round(betrag * (0.035 + 0.03) / 12);

  return [
    {
      question: `Wie hoch ist die Rate bei ${betragStr} € Baufinanzierung?`,
      answer: `Bei 3,5 % Zinsen und 2 % Tilgung beträgt die monatliche Rate ca. ${rate2.toLocaleString('de-DE')} €. Mit 3 % Tilgung steigt sie auf ca. ${rate3.toLocaleString('de-DE')} €, dafür sind Sie rund 7 Jahre früher schuldenfrei und sparen erheblich Zinsen.`,
    },
    {
      question: `Wie viel Eigenkapital brauche ich für ${betragStr} €?`,
      answer: `Empfohlen sind mindestens 20 % Eigenkapital (${Math.round(betrag * 0.2).toLocaleString('de-DE')} €) plus Kaufnebenkosten (ca. ${Math.round(betrag * 0.12).toLocaleString('de-DE')} €). Mit weniger Eigenkapital steigt der Zinssatz deutlich. Eine 100%-Finanzierung ist möglich, aber teurer.`,
    },
  ];
}

export function generateTilgungsPages(): TilgungsPageDef[] {
  return BETRAEGE.map((betrag) => {
    const betragStr = betrag.toLocaleString('de-DE');
    return {
      slug: `${betrag}-euro-baufinanzierung`,
      betrag,
      tilgung: 2,
      title: `${betragStr} € Baufinanzierung — Tilgungsplan`,
      metaTitle: `${betragStr} € Baufinanzierung — Tilgungsplan & Rate 2026`,
      metaDescription: `Tilgungsplan für ${betragStr} € Baufinanzierung. ✓ Monatliche Rate ✓ Restschuld ✓ Laufzeit ✓ Kostenlos berechnen`,
      h1: `${betragStr} € Baufinanzierung — Tilgungsplan berechnen`,
      intro: getIntro(betrag, betragStr),
      faqs: getFaqs(betrag, betragStr),
    };
  });
}

export const TILGUNGS_PAGES = generateTilgungsPages();
