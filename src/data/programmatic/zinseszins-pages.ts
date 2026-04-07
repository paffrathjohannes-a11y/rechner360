/**
 * Programmatic SEO Pages für den Zinseszinsrechner — mit unique Content
 */

const SPARRATEN = [50, 100, 150, 200, 250, 300, 400, 500, 750, 1000];

export interface ZinseszinsPageDef {
  slug: string;
  sparrate: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: { question: string; answer: string }[];
}

function calcEndkapital(rate: number, rendite: number, jahre: number): number {
  const r = rendite / 100 / 12;
  return Math.round(rate * ((Math.pow(1 + r, jahre * 12) - 1) / r));
}

function getIntro(sr: number): string {
  const v10 = calcEndkapital(sr, 7, 10).toLocaleString('de-DE');
  const v30 = calcEndkapital(sr, 7, 30).toLocaleString('de-DE');
  const eingezahlt30 = (sr * 12 * 30).toLocaleString('de-DE');

  if (sr <= 100) return `Schon ${sr} € im Monat können durch den Zinseszinseffekt ein beachtliches Vermögen aufbauen. Bei 7 % Rendite (historischer Aktienmarkt-Durchschnitt) werden aus ${sr} € monatlich nach 10 Jahren ca. ${v10} € und nach 30 Jahren ca. ${v30} € — bei nur ${eingezahlt30} € Einzahlung.`;
  if (sr <= 300) return `Mit ${sr} € monatlich gehören Sie zu den Sparern, die sich langfristig ein solides Vermögen aufbauen. Der Zinseszinseffekt macht den Unterschied: Nach 30 Jahren bei 7 % Rendite hätten Sie ca. ${v30} €, obwohl Sie nur ${eingezahlt30} € eingezahlt haben. Die Differenz sind reine Zinsen und Zinseszinsen.`;
  return `${sr} € monatlich ist eine ambitionierte Sparrate, die sich enorm auszahlt. Nach 30 Jahren bei 7 % Rendite erreichen Sie ca. ${v30} € — aus ${eingezahlt30} € Einzahlung. Das ist mehr als das ${Math.round(calcEndkapital(sr, 7, 30) / (sr * 12 * 30))}fache Ihrer Einzahlung durch den Zinseszinseffekt.`;
}

function getFaqs(sr: number): { question: string; answer: string }[] {
  const v20_5 = calcEndkapital(sr, 5, 20).toLocaleString('de-DE');
  const v20_7 = calcEndkapital(sr, 7, 20).toLocaleString('de-DE');
  const v20_9 = calcEndkapital(sr, 9, 20).toLocaleString('de-DE');

  return [
    {
      question: `Wie viel Vermögen baut man mit ${sr} € monatlich auf?`,
      answer: `Bei ${sr} € monatlich über 20 Jahre: ca. ${v20_5} € (bei 5 % Rendite), ca. ${v20_7} € (bei 7 %) oder ca. ${v20_9} € (bei 9 %). Die Rendite hängt stark von der Anlageform ab — ein weltweit gestreuter ETF erzielte historisch 7–9 % pro Jahr.`,
    },
    {
      question: `Wo investiert man ${sr} € monatlich am besten?`,
      answer: sr <= 100
        ? `Für ${sr} € monatlich eignen sich kostenlose ETF-Sparpläne bei Neo-Brokern wie Trade Republic oder Scalable Capital. Schon ab 1 € können Sie in einen MSCI World ETF investieren — breit gestreut über 1.500 Unternehmen weltweit.`
        : `Mit ${sr} € monatlich können Sie breit diversifizieren: z.B. 70 % in einen MSCI World ETF und 30 % in einen Emerging Markets ETF. Neo-Broker bieten kostenlose Sparpläne ab 1 €. Wichtig: Regelmäßig investieren und nicht bei Kursrückgängen verkaufen.`,
    },
  ];
}

export const ZINSESZINS_PAGES: ZinseszinsPageDef[] = SPARRATEN.map((sr) => ({
  slug: `${sr}-euro-monatlich`,
  sparrate: sr,
  title: `${sr} € monatlich sparen — was kommt raus?`,
  metaTitle: `${sr} € monatlich sparen — Vermögen nach 10, 20, 30 Jahren`,
  metaDescription: `${sr} € monatlich sparen — wie viel Vermögen nach 10, 20 oder 30 Jahren? ✓ Mit Zinseszins ✓ Verschiedene Renditen ✓ Kostenlos`,
  h1: `${sr} € monatlich sparen — Vermögensentwicklung`,
  intro: getIntro(sr),
  faqs: getFaqs(sr),
}));
